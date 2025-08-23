import warnings
warnings.filterwarnings("ignore", category=UserWarning)

from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline
from langchain_huggingface import HuggingFacePipeline
from langchain.chains import RetrievalQA

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

        print("[DEBUG] Loading embeddings")
        embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

        print("[DEBUG] Creating FAISS vectorstore")
        vectorstore = FAISS.from_documents(chunks, embedding_model)

        print("[DEBUG] Loading summarization model")
        model_id = "sshleifer/distilbart-cnn-12-6"
        tokenizer = AutoTokenizer.from_pretrained(model_id)
        model = AutoModelForSeq2SeqLM.from_pretrained(model_id)

        print("[DEBUG] Setting up pipeline")
        pipe = pipeline("text2text-generation", model=model, tokenizer=tokenizer, max_new_tokens=512)
        llm = HuggingFacePipeline(pipeline=pipe)

        print("[DEBUG] Creating retriever and QA chain")
        retriever = vectorstore.as_retriever(search_type="similarity", k=5)
        qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever, return_source_documents=True)

        query = """You are a legal expert AI. Read the court case and provide:
        1. A brief summary in plain English.
        2. Key legal issues raised.
        3. Referenced legal sections or precedents."""

        print("[DEBUG] Running query")
        response = qa_chain.invoke({"query": query})

        print("[DEBUG] Formatting response")
        summary = response["result"]
        sources = [
            {
                "page": doc.metadata.get("page", "N/A"),
                "text": doc.page_content.strip()[:500]
            }
            for doc in response["source_documents"]
        ]

        return summary, sources

    except Exception as e:
        print("[ERROR] Exception during summarization:")
        import traceback
        traceback.print_exc()
        raise e



# import os
# import tempfile
# import logging
# import gc

# from fastapi import APIRouter, UploadFile, File, Depends
# from fastapi.responses import JSONResponse

# from backend.auth import get_current_user

# from langchain_community.document_loaders import PyPDFLoader
# from langchain.text_splitter import RecursiveCharacterTextSplitter
# from langchain_community.vectorstores import FAISS
# from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline
# from langchain_huggingface import HuggingFaceEmbeddings, HuggingFacePipeline
# from langchain.chains import RetrievalQA

# logging.basicConfig(level=logging.INFO)

# router = APIRouter()

# # === Load models once globally ===
# logging.info("[INIT] Loading embeddings and summarization model once...")

# embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# model_id = "sshleifer/distilbart-cnn-12-6"
# tokenizer = AutoTokenizer.from_pretrained(model_id)
# model = AutoModelForSeq2SeqLM.from_pretrained(model_id)

# pipe = pipeline("text2text-generation", model=model, tokenizer=tokenizer, max_new_tokens=512)
# llm = HuggingFacePipeline(pipeline=pipe)

# # === Summarization logic ===
# def process_pdf_and_summarize(pdf_path: str):
#     try:
#         logging.info("[INFO] Loading PDF")
#         loader = PyPDFLoader(pdf_path)
#         documents = loader.load()

#         logging.info(f"[INFO] Loaded {len(documents)} documents")

#         logging.info("[INFO] Splitting text")
#         text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
#         chunks = text_splitter.split_documents(documents)

#         # Optional: Limit number of chunks to reduce memory use (tune if needed)
#         chunks = chunks[:40]

#         logging.info(f"[INFO] Split into {len(chunks)} chunks")

#         logging.info("[INFO] Creating FAISS vectorstore")
#         vectorstore = FAISS.from_documents(chunks, embedding_model)

#         logging.info("[INFO] Creating retriever and QA chain")
#         retriever = vectorstore.as_retriever(search_type="similarity", k=5)
#         qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever, return_source_documents=True)

#         query = """You are a legal expert AI. Read the court case and provide:
#         1. A brief summary in plain English.
#         2. Key legal issues raised.
#         3. Referenced legal sections or precedents."""

#         logging.info("[INFO] Running summarization query")
#         response = qa_chain.invoke({"query": query})

#         # Extract results
#         summary = response["result"]
#         sources = [
#             {
#                 "page": doc.metadata.get("page", "N/A"),
#                 "text": doc.page_content.strip()[:500]
#             }
#             for doc in response["source_documents"]
#         ]

#         # Cleanup to free memory
#         del documents, chunks, vectorstore, retriever, qa_chain, response
#         gc.collect()

#         return summary, sources

#     except Exception as e:
#         logging.error("[ERROR] Exception during summarization")
#         import traceback
#         traceback.print_exc()
#         raise e


# # === FastAPI Endpoint ===
# @router.post("/summarize")
# async def summarize_pdf(file: UploadFile = File(...), user: str = Depends(get_current_user)):
#     logging.info("✅ Summarize endpoint hit")
#     try:
#         logging.info(f"[INFO] Authenticated user: {user}")
#         logging.info(f"[INFO] Received file: {file.filename}")

#         suffix = os.path.splitext(file.filename)[-1]
#         with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp:
#             content = await file.read()
#             temp.write(content)
#             temp_path = temp.name

#         logging.info(f"[INFO] Saved temporary file: {temp_path}")

#         summary, sources = process_pdf_and_summarize(temp_path)

#         os.remove(temp_path)
#         logging.info("[INFO] Removed temporary file")

#         return JSONResponse(content={
#             "summary": summary,
#             "sources": sources
#         })

#     except Exception as e:
#         logging.error(f"[ERROR] {e}")
#         return JSONResponse(status_code=500, content={"error": str(e)})




