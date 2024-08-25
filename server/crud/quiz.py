
from sqlalchemy.orm import Session

from . import models, schemas


def get_quiz(db: Session, level: int, course: str ):
    try: 
        quiz = db.query(models.Quiz).filter(
            models.Quiz.level == level,
            models.Quiz.course == course
        )
        return quiz
    except:
        return ValueError