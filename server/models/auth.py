#Will include schema for tokens and other authentication processes

from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship, backref
from db.database import Base


class Token(Base):
    __tablename__ = "tokens"
    token = Column(String, primary_key=True)
    type = Column(String) 
    expiry = Column(DateTime)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)

    user = relationship("User", backref=backref("tokens", lazy="dynamic"))

class blacklistedToken(Base):
    __tablename__ = "blacklistedTokens"

    token = Column(String, primary_key=True )
    type = Column(String) 
    expiry = Column(DateTime)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)

    user = relationship("User", backref=backref("blacklistedTokens", lazy="dynamic"))