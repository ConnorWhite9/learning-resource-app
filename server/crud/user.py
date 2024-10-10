#Database interactions regarding the user table

from sqlalchemy.orm import Session
import datetime
from fastapi import HTTPException, status
from models.user import *
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

async def get_user(db: Session, user_id: int):
    try:
        user = await db.query(User).filter(User.id == user_id).first()
        return user
    except SQLAlchemyError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"User could not be grabbed: {str(e)}")
    

async def grab_enrollment_crud(user_id, db: AsyncSession):
    try:
        raw = await db.execute(select(Enroll).where(Enroll.user_id == user_id))
        enrollment = raw.scalars().all()
        list = []
        for enroll in enrollment:
            list.append(enroll["course"])
        return list 
    except SQLAlchemyError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Could not properly grab enrollment: {str(e)}")
    

async def grab_grades_crud(user_id, db: AsyncSession):
    try: 
        raw = await db.execute(select(Grade).where(Grade.user_id==user_id))
        grades = raw.scalar()
        return grades
    except SQLAlchemyError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Grades were not properly grabbed: {str(e)}")
    


async def get_last_streak(user_id, db: AsyncSession):
    try: 
        raw = await db.execute(select(Streak).where(Streak.user_id==user_id) )
        streak = raw.scalar_one_or_none()
        return streak
    except SQLAlchemyError as e:
       raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Streak could not be properly grabbed: {str(e)}")
    

async def setCurrentStreak(user_id, streak, db: AsyncSession):
    try: 
        streak.lastActivity = datetime.now(timezone.utc)
        streak.current += 1
        await db.commit()

    except SQLAlchemyError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Streak could not be properly increased: {str(e)}" )
    
async def resetStreak(user_id, streak, db: AsyncSession):
    try: 
        streak.lastActivity = datetime.now(timezone.utc)
        streak.current = 0
        await db.commit()
        
    except SQLAlchemyError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Streak could not be properly reset: {str(e)}")