from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship, backref
from db.database import Base


#Create models for user information on different language paths
class Course(Base):
    __tablename__ = "courses"

    level = Column(Integer)
    name = Column(String, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)

    class Config:
        json_schema_extra = {
            "example": {
                "level": 1,
                "name": "Python",
                "user_id": 50
            }
        }
    user = relationship("User", backref=backref("courses", lazy="dynamic"))
    
