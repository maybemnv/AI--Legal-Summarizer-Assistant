# GEMINI RAG CODE - Fixed Implementation
import warnings
import os
import traceback
from dotenv import load_dotenv
from typing import List, Dict, Any, Tuple
import google.generativeai as genai
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain.chains import RetrievalQA
from langchain_core.prompts import PromptTemplate

# Suppress warnings
warnings.filterwarnings("ignore", category=UserWarning)

# Load environment variables from .env file
load_dotenv()

# ENV variables - Using Gemini API Key instead of complex endpoints
GEMINI_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable is required")

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)


# Main RAG processing function with proper Gemini API integration
def process_pdf_and_summarize(pdf_path: str) -> Tuple[str, List[Dict[str, Any]]]:
    try:
        print("[DEBUG] Loading PDF")
        loader = PyPDFLoader(pdf_path)
        documents = loader.load()

        if not documents:
            raise ValueError("No text extracted from PDF. Please check the file.")

        print(f"[DEBUG] Loaded {len(documents)} pages")

        # Legal document-aware text splitting - OPTIMIZED FOR FREE TIER
        print("[DEBUG] Splitting text with legal document awareness")
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=2000,  # Larger chunks to reduce API calls
            chunk_overlap=200,  # Smaller overlap
            separators=["\n\n", "\n", ".", ",", " ", ""]
        )
        chunks = text_splitter.split_documents(documents)

        if not chunks:
            raise ValueError("Failed to split document into chunks")

        # QUOTA OPTIMIZATION: Limit chunks for free tier
        max_chunks = 8  # Reduce from 15+ to 8 chunks max
        if len(chunks) > max_chunks:
            print(f"[INFO] Reducing chunks from {len(chunks)} to {max_chunks} for quota limits")
            chunks = chunks[:max_chunks]

        print(f"[DEBUG] Using {len(chunks)} chunks (optimized for free tier)")

        print("[DEBUG] Creating Gemini embeddings")
        try:
            embeddings = GoogleGenerativeAIEmbeddings(
                model="models/embedding-001",
                google_api_key=GEMINI_API_KEY
            )
        except Exception as e:
            print(f"[ERROR] Failed to initialize embeddings: {e}")
            raise

        print("[DEBUG] Creating FAISS vectorstore")
        try:
            vectorstore = FAISS.from_documents(chunks, embeddings)
        except Exception as e:
            print(f"[ERROR] Failed to create vectorstore: {e}")
            raise

        print("[DEBUG] Initializing Retriever and Gemini LLM")
        retriever = vectorstore.as_retriever(
            search_type="similarity_score_threshold",
            search_kwargs={"k": 5, "score_threshold": 0.1}
        )
        
        # Use ChatGoogleGenerativeAI for proper Gemini integration
        llm = ChatGoogleGenerativeAI(
            model="gemini-pro",
            google_api_key=GEMINI_API_KEY,
            temperature=0.1
        )

        print("[DEBUG] Setting up enhanced RetrievalQA chain")
        prompt_template = PromptTemplate.from_template(
            """
You are a senior legal analyst AI. Based on the provided legal document context, create a comprehensive analysis.

IMPORTANT: Structure your response in clear sections using markdown formatting:

# 📋 Case Summary
[Provide 3-5 bullet points summarizing the case background, parties involved, and outcome]

# ⚖️ Key Legal Issues
[List the main legal questions/disputes raised in the case]

# 📚 Legal References
[List any statutes, regulations, precedent cases, or legal principles cited]

# 🔍 Analysis
[Brief analysis of the legal reasoning and implications]

# ⚠️ Important Notes
[Any limitations, ambiguities, or additional context needed]

Context from legal document:
{context}

Question: {question}

Provide a thorough but concise analysis based only on the information available in the context.
"""
        )

        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            retriever=retriever,
            return_source_documents=True,
            chain_type_kwargs={"prompt": prompt_template}
        )

        query = (
            "Analyze this legal document and provide a structured summary as specified. "
            "Focus on factual information present in the document and avoid speculation."
        )

        print("[DEBUG] Running enhanced legal analysis query")
        response = qa_chain.invoke({"question": query})

        if not response or "result" not in response:
            raise RuntimeError("No response received from Gemini")

        print("[DEBUG] Processing Gemini response")
        summary = response["result"]
        source_docs = response.get("source_documents", [])

        # Enhanced source processing with better metadata
        sources = []
        for i, doc in enumerate(source_docs):
            page_num = "N/A"
            if doc.metadata and "page" in doc.metadata:
                # Convert 0-based page index to 1-based
                page_num = doc.metadata["page"] + 1 if isinstance(doc.metadata["page"], int) else doc.metadata["page"]
            
            sources.append({
                "page": page_num,
                "text": doc.page_content.strip()[:600] if doc.page_content else "",
                "relevance_rank": i + 1
            })

        print(f"[DEBUG] Successfully processed {len(sources)} source references")
        return summary, sources

    except Exception as e:
        print(f"[ERROR] Exception during RAG processing: {str(e)}")
        traceback.print_exc()
        
        # Return a fallback response instead of crashing
        fallback_summary = (
            "# ⚠️ Processing Error\n\n"
            "Unable to process the document due to a technical issue. "
            "Please try again or contact support if the problem persists.\n\n"
            f"Error details: {str(e)}"
        )
        return fallback_summary, []
