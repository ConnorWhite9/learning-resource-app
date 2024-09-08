from fastapi import APIRouter, HTTPException, Request
from fastapi.params import Depends
from sqlalchemy.orm import Session
from db.database import get_db
from crud.course import get_courses
from schemas.course import *
from services.course import *

from .limiter import limiter

router = APIRouter(
    prefix="/course",
)

@router.get("/catalog")
@limiter.limit("2/second")
def catalog():
    courses = get_courses()
    return {"courses": courses}


@router.get("/coursePage")
@limiter.limit("1/second")
def coursePage(request: Request, course: Course, db: Session = Depends(get_db)):
    quizs = coursePage_service(course.name, db)
    return {"quizs": quizs, "course": course.name}