from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from .course import *
from .quiz import *
from .auth import *
from db.database import Base
from datetime import datetime, timezone

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

class Streak(Base):
    __tablename__ = "streak"

    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    current = Column(Integer, default=0)
    lastActivity = Column(DateTime, default=datetime.datetime.now(timezone.utc))
    longest = Column(Integer)




    user = relationship("User", backref=backref("streak", lazy="dynamic"))