# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.openapi.utils import get_openapi

# import sys
# import os

# # Add the project root to sys.path if needed
# current_dir = os.path.dirname(os.path.abspath(__file__))
# project_root = os.path.abspath(os.path.join(current_dir, ".."))

# if project_root not in sys.path:
#     sys.path.insert(0, project_root)

# try:
#     from backend.summarizer import router as summarizer_router
#     from backend.auth import router as auth_router
# except ModuleNotFoundError:
#     from summarizer import router as summarizer_router
#     from auth import router as auth_router

# app = FastAPI()

# @app.get("/")
# def read_root():
#     return {"message": "API is running"}

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:8080"],  # Adjust to match your frontend port if different
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# app.include_router(summarizer_router)
# app.include_router(auth_router)

# def custom_openapi():
#     if app.openapi_schema:
#         return app.openapi_schema
#     openapi_schema = get_openapi(
#         title="Your API Title",
#         version="1.0.0",
#         description="API with JWT auth",
#         routes=app.routes,
#     )
#     openapi_schema["components"]["securitySchemes"] = {
#         "BearerAuth": {
#             "type": "http",
#             "scheme": "bearer",
#             "bearerFormat": "JWT",
#         }
#     }
#     for path in openapi_schema["paths"].values():
#         for operation in path.values():
#             operation["security"] = [{"BearerAuth": []}]
#     app.openapi_schema = openapi_schema
#     return app.openapi_schema

# app.openapi = custom_openapi






# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.openapi.utils import get_openapi
# import os
# import sys
# import uvicorn

# # Add the project root to sys.path if needed
# current_dir = os.path.dirname(os.path.abspath(__file__))
# project_root = os.path.abspath(os.path.join(current_dir, ".."))

# if project_root not in sys.path:
#     sys.path.insert(0, project_root)

# # Import routers
# try:
#     from backend.summarizer import router as summarizer_router
#     from backend.auth import router as auth_router
# except ModuleNotFoundError:
#     from summarizer import router as summarizer_router
#     from auth import router as auth_router

# # Create FastAPI app
# app = FastAPI()

# @app.get("/")
# def read_root():
#     return {"message": "API is running"}

# # ✅ Add health check support for Render (prevents 405 HEAD log spam)
# @app.head("/")
# def health_check():
#     return

# # CORS setup
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:8080"],  # Adjust for production if needed
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Include routers
# app.include_router(summarizer_router)
# app.include_router(auth_router)

# # OpenAPI customization (JWT auth)
# def custom_openapi():
#     if app.openapi_schema:
#         return app.openapi_schema
#     openapi_schema = get_openapi(
#         title="Your API Title",
#         version="1.0.0",
#         description="API with JWT auth",
#         routes=app.routes,
#     )
#     openapi_schema["components"]["securitySchemes"] = {
#         "BearerAuth": {
#             "type": "http",
#             "scheme": "bearer",
#             "bearerFormat": "JWT",
#         }
#     }
#     for path in openapi_schema["paths"].values():
#         for operation in path.values():
#             operation["security"] = [{"BearerAuth": []}]
#     app.openapi_schema = openapi_schema
#     return app.openapi_schema

# app.openapi = custom_openapi

# # ✅ Run app using dynamic port for Render
# if __name__ == "__main__":
#     port = int(os.environ.get("PORT", 8000))  # Render sets $PORT, default 8000 locally
#     uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)








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
    from summarizer import router as summarizer_router
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
    allow_origins=["http://localhost:8080"],  # Adjust this for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers after app initialization
app.include_router(summarizer_router)
app.include_router(auth_router)

# OpenAPI customization (if needed)
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Your API Title",
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

# Run the app with dynamic port for Render or local dev
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))  # Render sets $PORT, default 8000 locally
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
