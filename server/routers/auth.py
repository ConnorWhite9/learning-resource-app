from fastapi import APIRouter, HTTPException, Request
from fastapi.params import Depends
from sqlalchemy.orm import Session


from .limiter import limiter

router = APIRouter(
    prefix="/auth",
)


@router.post("/create_user")
@limiter.limit("2/second")
def createUser(request: Request, id: int):
    return 

