from sqlalchemy.orm import Session
from models.course import Course
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

def get_courses(db: AsyncSession):
    try:
        courses = db.execute(select(Course)).all()
        return courses
    except:
        return ValueError
    

