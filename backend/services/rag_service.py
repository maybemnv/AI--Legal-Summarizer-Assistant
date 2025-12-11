import traceback
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain_core.prompts import PromptTemplate

from backend.services.llm_service import GeminiLLM
from backend.services.embedding_service import CohereEmbeddings

def process_pdf_and_summarize(pdf_path: str, query: str):
    """
    Processes a PDF file and generates a summary using RAG.
    
    Args:
        pdf_path (str): Path to the PDF file.
        query (str): The query or prompt for summarization.
        
    Returns:
        dict: Result containing the summary and source documents, or an error.
    """
    try:
        print("[DEBUG] Loading PDF")
        loader = PyPDFLoader(pdf_path)
        documents = loader.load()

        print(f"[DEBUG] Loaded {len(documents)} documents")

        print("[DEBUG] Splitting text")
        # Optimized chunk size for legal docs as per project requirements
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        chunks = text_splitter.split_documents(documents)

        print(f"[DEBUG] Split into {len(chunks)} chunks")

        print("[DEBUG] Creating embeddings using Cohere")
        embeddings = CohereEmbeddings(model_name="embed-english-v3.0")

        print("[DEBUG] Creating FAISS vectorstore")
        vectorstore = FAISS.from_documents(chunks, embedding=embeddings)

        print("[DEBUG] Initializing Retriever and LLM")
        retriever = vectorstore.as_retriever(search_type="similarity", k=5)
        llm = GeminiLLM()

        print("[DEBUG] Setting up RetrievalQA chain")
        prompt_template = """
You are a legal expert AI. Based on the context below, answer the following legal analysis request.

Context:
{context}

Question: {question}

Provide a detailed legal analysis and summary:
"""

        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=retriever,
            return_source_documents=True,
            verbose=True,
            chain_type_kwargs={
                "prompt": PromptTemplate(
                    template=prompt_template,
                    input_variables=["context", "question"],
                ),
            },
        )

        print("[DEBUG] Running query")
        result = qa_chain.invoke({"query": query})

        return {
            "result": result["result"],
            "source_documents": [
                {
                    "page_content": doc.page_content,
                    "metadata": doc.metadata
                } for doc in result["source_documents"]
            ]
        }

    except Exception as e:
        print(f"[ERROR] {str(e)}")
        print(traceback.format_exc())
        return {"error": str(e), "traceback": traceback.format_exc()}
