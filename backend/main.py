import os
import sys
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi

# Add project root to sys.path
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(current_dir, ".."))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

from backend.core.config import settings
from backend.core.database import engine, Base
from backend.routers import auth, summarizer

# Initialize Database
# Import models here to ensure they are registered with Base.metadata
from backend.models import user as user_model
Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME, version=settings.VERSION)

# Health check logic
@app.get("/")
def read_root():
    return {"message": "LegalDocs AI API is running"}

@app.head("/")
def health_check():
    return

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
# Note via existing frontend code: auth is expected at /api/auth/* ?
# Checking existing auth.py: router was included with prefix="/api" and router had no prefix?
# Wait, let's double check existing main.py
# Old main.py: app.include_router(auth_router, prefix="/api") 
# Old auth.py: routes were /signup, /login.
# So final URL was /api/signup, /api/login? 
# OR /api/auth/signup?
# Let's check old auth.py again. 
# Old auth.py: @router.post("/signup") -> /api/signup
# My new auth.py: prefix="/auth". 
# If I mount at "/api", it becomes /api/auth/signup.
# I need to match the EXACT previous API signature to not break frontend.
# Let's check `client/shared/api.ts` or similar to see what frontend expects.
# I will check frontend code in next step to be 100% sure. 
# For now I will assume /api/signup based on "prefix=/api" and "router.post(/signup)".
# My new router has prefix="/auth". I should probably REMOVE that if the old one didn't have it.
# CHECKING FRONTEND IS CRITICAL.

app.include_router(summarizer.router) # Old: app.include_router(summarizer_router) -> /summarize
app.include_router(auth.router, prefix="/api") 

# OpenAPI customization
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        description="LegalDocs AI API",
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
        }
    }
    for path in openapi_schema["paths"].values():
        for operation in path.values():
            operation["security"] = [{"BearerAuth": []}]
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("backend.main:app", host="0.0.0.0", port=port, reload=False)
