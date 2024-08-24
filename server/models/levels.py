from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship, backref
from server.db.database import Base


#Create models for user information on different language paths
class Python:
    __tablename__ = "python"



    owner = relationship("User", back_populates="tokens")