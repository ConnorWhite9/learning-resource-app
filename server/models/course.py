from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship, backref
from db.database import Base


#Create models for user information on different language paths
class Course(Base):
    __tablename__ = "courses"

    name = Column(String, primary_key=True)

    class Config:
        json_schema_extra = {
            "example": {
                "level": 1,
                "name": "Python",
                "user_id": 50
            }
        }
    
class Enroll(Base):
    __tablename__ = "enroll"

    course = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True )
    level = Column(Integer, default=0)

    user = relationship("User", backref=backref("enroll", lazy="dynamic"))
    