# from fastapi import APIRouter, UploadFile, File
# from fastapi.responses import JSONResponse
# import tempfile
# import os
# from model_pipeline import process_pdf_and_summarize

# router = APIRouter()

# @router.post("/summarize")
# async def summarize_pdf(file: UploadFile = File(...)):
#     try:
#         suffix = os.path.splitext(file.filename)[-1]
#         with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp:
#             temp.write(await file.read())
#             temp_path = temp.name

#         summary, sources = process_pdf_and_summarize(temp_path)
#         os.remove(temp_path)

#         return JSONResponse(content={
#             "summary": summary,
#             "sources": sources
#         })

#     except Exception as e:
#         return JSONResponse(status_code=500, content={"error": str(e)})

from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
import tempfile
import os
from model_pipeline import process_pdf_and_summarize

router = APIRouter()

@router.post("/summarize")
async def summarize_pdf(file: UploadFile = File(...)):
    try:
        suffix = os.path.splitext(file.filename)[-1]
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp:
            temp.write(await file.read())
            temp_path = temp.name

        summary, sources = process_pdf_and_summarize(temp_path)
        os.remove(temp_path)

        return JSONResponse(content={
            "summary": summary,
            "sources": sources
        })

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
