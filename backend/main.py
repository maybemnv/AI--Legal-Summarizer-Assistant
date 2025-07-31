# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from summarizer import router

# app = FastAPI()

# # Let frontend call this backend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:8080"],  # You can restrict this to http://localhost:5173 later
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# app.include_router(router, prefix="/api")









# from fastapi import FastAPI, UploadFile, File
# from fastapi.middleware.cors import CORSMiddleware
# from summarizer import process_pdf_and_summarize
# import tempfile

# app = FastAPI()

# # Allow frontend access
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:8080"],  # Use specific origin in production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.post("/summarize")
# async def summarize_pdf(file: UploadFile = File(...)):
#     with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
#         tmp.write(await file.read())
#         tmp_path = tmp.name

#     summary, sources = process_pdf_and_summarize(tmp_path)
#     return {
#         "summary": summary,
#         "sources": sources
#     }










# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from summarizer import router as summarizer_router

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:8080"],  # ✅ Your frontend URL
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # ✅ Include the summarizer router
# app.include_router(summarizer_router)

# from fastapi import FastAPI, UploadFile, File
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:8080"],  # Set this properly in production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.post("/summarize")
# async def summarize(file: UploadFile = File(...)):
#     # your code here
#     return {"summary": "dummy summary", "sources": []}






# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from summarizer import router as summarizer_router

# app = FastAPI()

# # Enable CORS for frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:8080"],  # Frontend port
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # ✅ Use the real summarization route
# app.include_router(summarizer_router)







# main.py
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from summarizer import router  # ✅ Import your router

# app = FastAPI()

# # CORS setup
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:8080"],  # Match your frontend port
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # ✅ Register the summarizer route
# app.include_router(router)









# from fastapi import FastAPI, UploadFile, File
# from fastapi.middleware.cors import CORSMiddleware
# from summarizer import summarize_document  # This is your summarization logic

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[" http://localhost:8080/"],  # or put your frontend origin like "http://localhost:5173"
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.post("/upload")
# async def upload(file: UploadFile = File(...)):
#     file_bytes = await file.read()
#     summary_result = summarize_document(file_bytes, file.filename)
#     return summary_result



# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from .summarizer import router as summarizer_router

# app = FastAPI()

# # CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:8080"],  # ✅ no trailing slash!
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Include the summarizer route
# app.include_router(summarizer_router)


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from summarizer import router as summarizer_router  # ✅ correct import
from .summarizer import router as summarizer_router

app = FastAPI()

# CORS setup to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Your frontend port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the summarizer endpoint (POST /summarize)
app.include_router(summarizer_router)
