from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship, backref
from db.database import Base


#Create models for user information on different language paths
class Course:
    __tablename__ = "courses"

    level = Column(Integer)
    name = Column(String, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)


    owner = relationship("User", back_populates="tokens")
    
