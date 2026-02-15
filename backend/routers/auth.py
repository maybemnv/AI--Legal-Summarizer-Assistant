from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from supabase import Client

from backend.core.clients import supabase

router = APIRouter(tags=["authentication"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token") # Client handles login, so tokenUrl is just for docs

def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # Verify token with Supabase
        user_response = supabase.auth.get_user(token)
        if not user_response or not user_response.user:
            raise credentials_exception
        return user_response.user
    except Exception as e:
        print(f"Auth Error: {e}")
        raise credentials_exception

# Deprecated/Removed endpoints
# @router.post("/signup") ...
# @router.post("/login") ...

