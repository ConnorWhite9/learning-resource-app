from fastapi import APIRouter, HTTPException, Request, Response, Cookie, Body
from fastapi.params import Depends
from sqlalchemy.orm import Session
from db.database import get_db
from crud.course import get_courses
from schemas.course import *
from services.user import *

from .limiter import limiter


from .limiter import limiter

router = APIRouter(
    prefix="/user",
)


@router.post("/get_user")
@limiter.limit("2/second")
def get_user(request: Request, id: int):
    return "Hello"

@router.get("/userInfo")
@limiter.limit("1/second")
async def userInfo (request: Request, user_id: int, db: AsyncSession=Depends(get_db)):
    enroll_list, grades, mastery = await userInfo_service(user_id ,db)

    return {"enrollment": enroll_list, "grades": grades, "mastery": mastery}