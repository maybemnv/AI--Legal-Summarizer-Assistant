import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "LegalDocs AI"
    VERSION: str = "1.0.0"
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    if not DATABASE_URL:
        raise ValueError("DATABASE_URL not found in environment variables")
        
    # Supabase
    SUPABASE_URL: str = os.getenv("SUPABASE_URL")
    SUPABASE_KEY: str = os.getenv("SUPABASE_ANON_KEY")
    SUPABASE_JWT_SECRET: str = os.getenv("SUPABASE_JWT_SECRET") # User might need to add this if we do local verification, or we fetch it? Actually we usually verify against the JWT secret.
    # The user didn't mention adding SUPABASE_JWT_SECRET in their "DONE" message, but I asked for it in the plan.
    # If they missed it, I'll rely on the simple check or ask them. 
    # Actually, for Supabase, the JWT secret is needed to verify the signature locally with python-jose.
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "default-secret-key-change-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # AI API Keys
    COHERE_API_KEY: str = os.getenv("COHERE_API_KEY")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY")
    
    if not COHERE_API_KEY:
        print("WARNING: COHERE_API_KEY not found in environment variables")
        
    if not GEMINI_API_KEY:
        print("WARNING: GEMINI_API_KEY not found in environment variables")

settings = Settings()
