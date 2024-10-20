from fastapi import APIRouter, HTTPException, Request, Response, Cookie, Body
from fastapi.params import Depends
from sqlalchemy.orm import Session
from db.database import get_db
from crud.course import get_courses
from schemas.course import *
from services.course import *
from services.user import *
from .limiter import limiter

router = APIRouter(
    prefix="/course",
)

@router.get("/catalog")
@limiter.limit("2/second")
def catalog(request: Request):
    courses = get_courses()
    return {"courses": courses}


"""@router.get("/coursePage")
@limiter.limit("1/second")
def coursePage(request: Request, course: Course, db: AsyncSession = Depends(get_db)):
    quizs = coursePage_service(course.name, db)
    return {"quizs": quizs, "course": course.name}"""


@router.get("/getQuiz")
@limiter.limit("3/second")
async def getQuiz (request: Request, course: str, level: int, db: AsyncSession=Depends(get_db)):
    questions, quiz_id = await getQuiz_service(course, level, db)
    return {"questions": questions, "quiz_id": quiz_id}


@router.post("/grade")
@limiter.limit("1/second")
async def grade (request: Request, userAnswers: userAnswers, db: AsyncSession=Depends(get_db)):
    access_token = request.cookies.get("access_token")
    grade = await grade_service(access_token, userAnswers, db)
    await streak_service(access_token, db)
    return  {"message": "new grade added", "grade": grade}


@router.get("/getAllQuiz")
@limiter.limit('2/second')
async def getAllQuiz (request: Request, db: AsyncSession=Depends(get_db)):
    quizzes = await getAllQuiz_service(db)

    return quizzes 
