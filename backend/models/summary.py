from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from backend.core.database import Base
import uuid

class Summary(Base):
    __tablename__ = "summaries"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), nullable=False) # We trust the JWT user_id, no foreign key to local users table for now
    file_name = Column(String, nullable=False)
    file_size = Column(String, nullable=True)
    file_type = Column(String, nullable=True)
    summary_text = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
