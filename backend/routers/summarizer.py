import os
import tempfile
import logging
from fastapi import APIRouter, UploadFile, File, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from backend.core.database import get_db
from backend.models.summary import Summary

from backend.services.rag_service import process_pdf_and_summarize
from backend.routers.auth import get_current_user

router = APIRouter(tags=["summarizer"])

logging.basicConfig(level=logging.INFO)

@router.post("/summarize")
async def summarize_pdf(
    file: UploadFile = File(...), 
    user: object = Depends(get_current_user),
    db: Session = Depends(get_db) # Inject DB session
):
    logging.info("Summarize endpoint hit")
    try:
        user_id = user.id # Extract Supabase User ID
        print(f"[INFO] Authenticated user_id: {user_id}")
        
        file_content = await file.read() # Read once
        file_size = len(file_content)
        
        suffix = os.path.splitext(file.filename)[-1]
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp:
            temp.write(file_content)
            temp_path = temp.name

        print(f"[INFO] Saved temp file at: {temp_path}")
        
        # Using a default query for summarization
        result = process_pdf_and_summarize(
            pdf_path=temp_path,
            query="Provide a detailed summary of the key legal points in this document"
        )

        os.remove(temp_path)
        print("[INFO] Removed temp file")

        if "error" in result:
            return JSONResponse(status_code=500, content={"error": result["error"]})
        
        summary_text = result.get("result", "")
        
        # Save to Database
        try:
            new_summary = Summary(
                user_id=user_id,
                file_name=file.filename,
                file_size=str(file_size), # Store as string or whatever
                file_type=suffix,
                summary_text=summary_text
            )
            db.add(new_summary)
            db.commit()
            db.refresh(new_summary)
            print(f"[INFO] Saved summary to DB with ID: {new_summary.id}")
        except Exception as db_err:
            print(f"[ERROR] Failed to save summary to DB: {db_err}")
            # We don't fail the request if DB save fails, but we might want to log it.
            
        return JSONResponse(content={
            "summary": summary_text,
            "sources": result.get("source_documents", []),
            "id": str(new_summary.id) if 'new_summary' in locals() else None
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"[ERROR] {e}")
        return JSONResponse(status_code=500, content={"error": str(e)})
