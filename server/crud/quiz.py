
from sqlalchemy.orm import Session

from . import models, schemas
from models.quiz import *
from models.course import *


def get_quiz(db: Session, level: int, course: str ):
    try: 
        quiz = db.query(Quiz).filter(
            Quiz == level,
            Quiz == course
        ).first()
        return quiz
    except:
        return ValueError

def get_course_quizs(db: Session, course: str):
    try: 
        quizs = db.query(Quiz).filter(Quiz.course == course).all()
        return quizs
    except:
        raise ValueError
    

def get_questions(db: Session, id: int):
    try:
        questions = db.query(Question).filter(Quiz.id == id).all()
        return questions
    except:
        raise ValueError
    


