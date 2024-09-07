from fastapi import APIRouter, HTTPException, Request
from fastapi.params import Depends
from sqlalchemy.orm import Session
from crud.course import get_courses

from .limiter import limiter

router = APIRouter(
    prefix="/course",
)

@router.get("/catalog")
@limiter.limit("2/second")
def catalog():
    get_courses()