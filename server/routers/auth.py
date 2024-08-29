from fastapi import APIRouter, HTTPException, Request
from fastapi.params import Depends
from sqlalchemy.orm import Session
from server.services.auth import access_token_service

from .limiter import limiter

router = APIRouter(
    prefix="/auth",
)


@router.post("/create_user")
@limiter.limit("2/second")
def createUser(request: Request, id: int):
    return 

@router.post("/token", response_model=token)
@limiter.limit("2/second")
def login_for_access_token(username: str, password: str):
    token = access_token_service(username, password)
    return ({'access_token': token, 'token_type': 'bearer'})

    
