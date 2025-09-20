# GEMINI RAG CODE
import warnings
import os
import traceback
from dotenv import load_dotenv
from google.cloud import aiplatform
from google.cloud.aiplatform.gapic import PredictionServiceClient
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain_core.embeddings import Embeddings
from langchain_core.language_models import BaseLLM
from langchain_core.prompts import PromptTemplate

# Suppress warnings
warnings.filterwarnings("ignore", category=UserWarning)

# Load environment variables from .env file
load_dotenv()

# ENV variables
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GOOGLE_APPLICATION_CREDENTIALS = r"C:\Users\Prakriti\Desktop\Projects\AI--Legal-Summarizer-Assistant\backend\leetcode-tracker-471216-f42fbb083f3d (1).json"
GEMINI_ENDPOINT_ID = os.getenv("GEMINI_ENDPOINT_ID")

GCP_PROJECT_ID = "leetcode-tracker-471216"


# Set Google Cloud Authentication
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = GOOGLE_APPLICATION_CREDENTIALS

# Initialize Google Cloud AI Platform
def initialize_gemini_client():
    aiplatform.init(project=GCP_PROJECT_ID, location="us-central1")

# Custom Embeddings class for LangChain
class GeminiEmbeddings(Embeddings):
    def embed_documents(self, texts):
        endpoint = f"projects/{GCP_PROJECT_ID}/locations/us-central1/endpoints/{GEMINI_ENDPOINT_ID}"
        instances = [{"content": text} for text in texts]
        client = PredictionServiceClient()
        response = client.predict(endpoint=endpoint, instances=instances)
        # You may need to adjust this based on the real structure of the response
        return [pred["embedding"] for pred in response.predictions]

    def embed_query(self, text):
        return self.embed_documents([text])[0]

# Custom LLM class for LangChain
class GeminiLLM(BaseLLM):
    def _call(self, prompt: str, stop=None):
        endpoint = f"projects/{GCP_PROJECT_ID}/locations/us-central1/endpoints/{GEMINI_ENDPOINT_ID}"
        instances = [{"content": prompt}]
        client = PredictionServiceClient()
        response = client.predict(endpoint=endpoint, instances=instances)
        # Adjust according to actual response
        return response.predictions[0]["content"]

    @property
    def _llm_type(self) -> str:
        return "gemini-llm"

# Main RAG processing function
def process_pdf_and_summarize(pdf_path: str):
    try:
        print("[DEBUG] Loading PDF")
        loader = PyPDFLoader(pdf_path)
        documents = loader.load()

        print(f"[DEBUG] Loaded {len(documents)} documents")

        print("[DEBUG] Splitting text")
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        chunks = text_splitter.split_documents(documents)

        print(f"[DEBUG] Split into {len(chunks)} chunks")

        print("[DEBUG] Initializing Google Gemini Client")
        initialize_gemini_client()

        print("[DEBUG] Creating embeddings using Gemini")
        embeddings = GeminiEmbeddings()

        print("[DEBUG] Creating FAISS vectorstore")
        vectorstore = FAISS.from_documents(chunks, embedding=embeddings)

        print("[DEBUG] Initializing Retriever and LLM")
        retriever = vectorstore.as_retriever(search_type="similarity", k=5)
        llm = GeminiLLM()

        print("[DEBUG] Setting up RetrievalQA chain")
        prompt_template = PromptTemplate.from_template(
            """
You are a legal expert AI. Based on the context below, answer the following legal analysis request.

Context:
{context}

Question:
{question}
"""
        )

        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            retriever=retriever,
            return_source_documents=True,
            chain_type_kwargs={"prompt": prompt_template}
        )

        query = """You are a legal expert AI. Read the court case and provide:
1. A brief summary in plain English.
2. Key legal issues raised.
3. Referenced legal sections or precedents."""

        print("[DEBUG] Running query")
        response = qa_chain.invoke({"question": query})

        print("[DEBUG] Formatting response")
        summary = response["result"]
        sources = [
            {
                "page": doc.metadata.get("page", "N/A") if doc.metadata else "N/A",
                "text": doc.page_content.strip()[:500]
            }
            for doc in response["source_documents"]
        ]

        return summary, sources

    except Exception as e:
        print("[ERROR] Exception during summarization:")
        traceback.print_exc()
        raise e
