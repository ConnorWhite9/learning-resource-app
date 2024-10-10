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
@limiter.limit("10/second")
async def userInfo (request: Request, db: AsyncSession=Depends(get_db)):
    access_token = request.cookies.get("access_token")
    #Reformat function so it grabs user_id from cookies will need to change function parameters and decode the token in teh userInfo service.
    enroll_list, grades, mastery = await userInfo_service(access_token ,db)

    return {"enrollment": enroll_list, "grades": grades, "mastery": mastery}


