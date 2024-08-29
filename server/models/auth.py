#Will include schema for tokens and other authentication processes

from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship, backref
from server.db.database import Base


class Token(Base):
    __tablename__ = "tokens"
    id = Column(Integer, primary_key=True, index=True)
    token = Column(String, unique=True, index=True )
    type = Column(String) 
    expiry = Column(DateTime)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)

    owner = relationship("User", back_populates="tokens")

class blacklistedToken(Base):
    __tablename__ = "blacklistedTokens"

    id = Column(Integer, primary_key=True, index=True)
    token = Column(String, unique=True, index=True )
    type = Column(String) 
    expiry = Column(DateTime)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)

    owner = relationship("User", back_populates="tokens")