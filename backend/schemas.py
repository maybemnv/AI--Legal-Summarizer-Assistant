from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class UserCreate(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class SummaryCreate(BaseModel):
    filename: str
    summary_text: str

class SummaryResponse(BaseModel):
    id: int
    filename: str
    summary_text: str
    created_at: datetime

    class Config:
        orm_mode = True
