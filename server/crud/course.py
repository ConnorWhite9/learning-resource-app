from sqlalchemy.orm import Session
from models.course import Course

def get_courses(db:Session):
    try:
        courses = db.query(Course).all()
        return courses
    except:
        return ValueError