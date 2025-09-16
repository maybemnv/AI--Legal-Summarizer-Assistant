import google.generativeai as genai
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import warnings
warnings.filterwarnings("ignore", category=UserWarning)
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
# Configure Gemini API
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY environment variable is not set")

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-2.5-flash')

def process_pdf_and_summarize(pdf_path: str):
    # Step 1: Load & split
    loader = PyPDFLoader(pdf_path)
    documents = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=8000, chunk_overlap=1000)  # Larger chunks for Gemini
    chunks = text_splitter.split_documents(documents)
    
    # Combine all text chunks
    full_text = "\n\n".join([chunk.page_content for chunk in chunks])

    # Step 2: Generate summary using Gemini
    prompt = """You are a legal expert AI. Please analyze this court case and provide:
    1. A brief summary in plain English (2-3 paragraphs).
    2. Key legal issues raised (bullet points).
    3. Referenced legal sections or precedents (if any).
    
    Here's the court case:
    {text}"""
    
    # Format the prompt with the document text
    formatted_prompt = prompt.format(text=full_text)
    
    # Generate response using Gemini
    response = model.generate_content(formatted_prompt)
    
    # Extract summary from response
    summary = response.text
    
    # Return formatted result with source chunks
    sources = [
        {
            "page": chunk.metadata.get("page", "N/A"),
            "text": chunk.page_content.strip()[:500]
        }
        for chunk in chunks
    ]
    
    return summary, sources
