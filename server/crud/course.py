from sqlalchemy.orm import Session
from models.course import Course
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from fastapi import HTTPException, status
from sqlalchemy.future import select
from sqlalchemy import text


async def get_courses(db: AsyncSession):
    try:
        courses = await db.execute(select(Course))

        return courses.scalars().all()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Courses could not be grabbed: {str(e)}")
    

