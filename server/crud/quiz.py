
from sqlalchemy.orm import Session
from sqlalchemy import delete
import datetime
from passlib.context import CryptContext
from fastapi import Depends
from db.database import get_db
from models.user import *
from models.auth import *
from schemas import *
from schemas.auth import *
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession


async def get_quiz_crud(db: AsyncSession, level: int, course: str ):
    try: 
        quiz = await db.execute(select(Quiz)).where(Quiz.level == level, Quiz.course == course
        ).first()
        return quiz
    except:
        return ValueError

async def get_course_quizs(course: str, db: Session):
    try: 
        quizs = await db.execute(select(Quiz)).where(Quiz.course == course).all()
        return quizs
    except:
        raise ValueError
    

async def get_questions(db: AsyncSession, id: int):
    try:
        questions = await db.execute(select(Question)).where(Question.quiz_id == id)
        return questions.scalars().all()
    except:
        raise ValueError
    


async def getAnswers(quiz_id, db: AsyncSession):
    try:
        answers = await db.execute(select(Question)).where(Question.quiz_id == quiz_id)
        return answers.scalars.all()
    except:
        raise ValueError
    

async def addGrade(user_id, grade, quiz_id, db: AsyncSession):
    try:
        newGrade = Grade(user_id=user_id, grade=grade, quiz_id=quiz_id)
        db.add(newGrade)
        await db.commit()
        return True
    except:
        raise ValueError