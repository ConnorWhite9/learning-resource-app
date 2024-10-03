#Database interactions regarding the user table

from sqlalchemy.orm import Session
import datetime
from models.user import *
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

async def get_user(db: Session, user_id: int):
    try:
        user = await db.query(User).filter(User.id == user_id).first()
        return user
    except:
        return ValueError
    

async def grab_enrollment_crud(user_id, db: AsyncSession):
    try:
        raw = await db.execute(select(Enroll).where(Enroll.user_id == user_id))
        enrollment = raw.scalars().all()
        list = []
        for enroll in enrollment:
            list.append(enroll["course"])
        return list 
    except:
        raise ValueError
    

async def grab_grades_crud(user_id, db: AsyncSession):
    try: 
        raw = await db.execute(select(Grade)).where(Grade.user_id==user_id)
        grades = raw.scalars().all()
        return grades
    except:
        raise ValueError("hello")