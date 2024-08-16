from fastapi import APIRouter, HTTPException, Request
from fastapi.params import Depends
from sqlalchemy.orm import Session


from .limiter import limiter

router = APIRouter(
    prefix="/user",
)


@router.post("/get_user")
@limiter.limit("2/second")
def get_user(request: Request, id: int):
    return "Hello"