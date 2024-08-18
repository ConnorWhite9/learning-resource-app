from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from server.db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": 1,
                "email": "abdulazeez@x.com",
                "password": "weakpassword"
            }
        }

    tokens = relationship("Token", back_populates="owner")
    