from sqlalchemy.orm import Session

from . import models, schemas


def get_courses(db:Session):
    try:
        courses = db.query(models.Course).all()
        return courses
    except:
        return ValueError