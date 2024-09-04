from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from .course import *
from .quiz import *
from .auth import *
from db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    streak = Column(Integer, default=0)
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": 1,
                "email": "abdulazeez@x.com",
                "password": "weakpassword",
                "username": "jack",
            }
        }

    