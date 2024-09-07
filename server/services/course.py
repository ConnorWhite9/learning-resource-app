from sqlalchemy.orm import Session
from crud.quiz import get_course_quizs



def coursePage_service(name: str, db: Session):
    quizs = get_course_quizs(name, db)
    return quizs 