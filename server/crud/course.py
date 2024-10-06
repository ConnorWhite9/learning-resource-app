from sqlalchemy.orm import Session
from models.course import Course
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

async def get_courses(db: AsyncSession):
    try:
        courses = await db.execute(select(Course))
        return courses.scalars().all()
    except:
        raise ValueError
    

