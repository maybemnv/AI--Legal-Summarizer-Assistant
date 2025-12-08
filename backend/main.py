from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
import os
import sys
import uvicorn

# Add the project root to sys.path if needed
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(current_dir, ".."))

if project_root not in sys.path:
    sys.path.insert(0, project_root)

# Import routers
try:
    from backend.summarizer import router as summarizer_router
    from backend.auth import router as auth_router
except ModuleNotFoundError:
    from backend.summarizer import router as summarizer_router
    from auth import router as auth_router

# Create FastAPI app instance
app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "API is running"}

# Health check route
@app.head("/")
def health_check():
    return

# CORS middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React default port
        "http://localhost:8080",  # Vite default port
        "http://localhost:5173",  # Vite alternative port
        "https://ai-legal-summarizer-assistant-x0g7.onrender.com"  # Production URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers after app initialization
app.include_router(summarizer_router)
app.include_router(auth_router, prefix="/api")


# OpenAPI customization (if needed)
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="LegalizeAI",
        version="1.0.0",
        description="API with JWT auth",
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
    # Get port from environment variable (for Render) or default to 8000
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
