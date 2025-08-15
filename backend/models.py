# from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
# from sqlalchemy.orm import relationship
# from datetime import datetime
# from database import Base

# class User(Base):
#     __tablename__ = "users"
#     id = Column(Integer, primary_key=True, index=True)
#     email = Column(String, unique=True, index=True)
#     hashed_password = Column(String)

#     summaries = relationship("Summary", back_populates="owner")

# class Summary(Base):
#     __tablename__ = "summaries"
#     id = Column(Integer, primary_key=True, index=True)
#     filename = Column(String)
#     summary_text = Column(String)
#     created_at = Column(DateTime, default=datetime.utcnow)
#     owner_id = Column(Integer, ForeignKey("users.id"))

#     owner = relationship("User", back_populates="summaries")


from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./users.db"

Base = declarative_base()
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)

# Create tables
Base.metadata.create_all(bind=engine)
