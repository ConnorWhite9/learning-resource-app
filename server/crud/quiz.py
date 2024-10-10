
from sqlalchemy.orm import Session
from sqlalchemy import delete
import datetime
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from db.database import get_db
from models.user import *
from models.auth import *
from schemas import *
from schemas.auth import *
from crud.course import *
from sqlalchemy.future import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession


async def get_quiz_crud(db: AsyncSession, course: str, level: int ):
    try: 
        result = await db.execute(select(Quiz).where(Quiz.level == level, Quiz.course == course))
        quiz = result.scalar_one_or_none()  # This will return None if no results found
        return quiz
    except SQLAlchemyError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Could not grab quiz: {str(e)}")
    
async def get_course_quizs(course: str, db: Session):
    try: 
        quizs = await db.execute(select(Quiz)).where(Quiz.course == course).all()
        return quizs
    except SQLAlchemyError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Could not grab quizzes for course: {str(e)}")
    

async def get_questions(db: AsyncSession, id: int):
    try:
        questions = await db.execute(select(Question).where(Question.quiz_id == id))
        return questions.scalars().all()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Could not grab questions: {str(e)}")
    


async def getAnswers(quiz_id, db: AsyncSession):
    try:
        answers = await db.execute(select(Question).where(Question.quiz_id == quiz_id))
        return answers.scalars().all()
    except SQLAlchemyError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Could not grab answers for quiz: {str(e)}")
    

async def addGrade(user_id, grade, quiz_id, db: AsyncSession):
    try:
        result = await db.execute(select(Grade).where(Grade.user_id==user_id, Grade.quiz_id==quiz_id))
        exists = result.scalar_one_or_none()
        if exists:
            exists.grade = grade
        else:
            newGrade = Grade(user_id=user_id, grade=grade, quiz_id=quiz_id)
            db.add(newGrade)
        await db.commit()
        return True
    except SQLAlchemyError as e:
        await db.rollback()  # Roll back the session on error
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Grade could not be added properly: {str(e)}")
    


async def grab_all_quizzes(db: AsyncSession):
    try:
        formatted_quizzes = {}
        languages = await get_courses(db)
        for language in languages:
            name = language.name
            formatted_quizzes[name] = {}

        for key in formatted_quizzes:
            raw = await db.execute(select(Quiz).where(Quiz.course == key))
            quizzes = raw.scalars().all()
            for quiz in quizzes:
                formatted_quizzes[key][quiz.level] = quiz

        return formatted_quizzes

    except SQLAlchemyError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Quizzes could not be grabbed successfully: {str(e)}")
