from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship, backref
from db.database import Base


class Quiz(Base):
    __tablename__="quizs"
    id = Column(Integer, primary_key=True)
    course = Column(String, index=True)
    level = Column(Integer, index=True)

    user = relationship("User", backref=backref("quizs", lazy="dynamic"))
    


class Grade(Base): 
    __tablename__="grades"

    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    grade = Column(Integer)
    quiz_id = Column(Integer, ForeignKey("quizs.id"), primary_key=True)

    
    user = relationship("User", backref=backref("grades", lazy="dynamic"))
    quiz = relationship("Quiz", backref=backref("grades", lazy="dynamic"))

class Question(Base):
    __tablename__="questions"

    quiz_id = Column(Integer, ForeignKey("quizs.id"), index=True)
    number = Column(Integer)
    id = Column(Integer, primary_key=True)
    question = Column(String)
    option_a = Column(String)
    option_b = Column(String)
    option_c = Column(String)
    option_d = Column(String)
    answer = Column(String)
    type = Column(String)

    quiz = relationship("Quiz", backref=backref("questions", lazy="dynamic"))


"""class Answer(Base):
    __tablename__="answers"
    
    quiz_id = Column(Integer, ForeignKey("questions.id"))
    answer = Column(String)
    id = Column(Integer, primary_key=True)
    correct = Column(Boolean)
    
    quiz = relationship("Quiz", backref=backref("answers", lazy="dynamic"))"""