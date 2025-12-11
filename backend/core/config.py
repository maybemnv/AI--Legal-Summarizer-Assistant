import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "LegalDocs AI"
    VERSION: str = "1.0.0"
    
    # Database
    DATABASE_URL: str = "sqlite:///./users.db"
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "default-secret-key-change-in-production")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # AI API Keys
    COHERE_API_KEY: str = os.getenv("COHERE_API_KEY")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY")
    
    if not COHERE_API_KEY:
        print("WARNING: COHERE_API_KEY not found in environment variables")
        
    if not GEMINI_API_KEY:
        print("WARNING: GEMINI_API_KEY not found in environment variables")

settings = Settings()
