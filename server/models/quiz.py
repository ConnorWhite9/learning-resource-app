from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship, backref
from server.db.database import Base


class Quiz:
    __tablename__="quizs"
    id = Column(Integer, primary_key=True)
    course = Column(String, index=True)
    level = Column(Integer, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    complete = Column(Boolean, default=False) 

    owner = relationship("User", back_populates="quizs")
    grades = relationship("Grade", back_populates="quizs")


class Grade: 
    __tablename__="grades"

    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    grade = Column(Integer)
    quiz_id = Column(Integer, ForeignKey("quizs.id"), primary_key=True)

    
    owner = relationship("User", back_populates="grades")
    quizs = relationship("Quiz", back_populates="grades")