from fastapi import APIRouter, HTTPException, Request, Response, Cookie
from fastapi.params import Depends
from sqlalchemy.orm import Session
from services.auth import *
from schemas.auth import *
from .limiter import limiter

router = APIRouter(
    prefix="/auth",
)


"""@router.post("/token")
@limiter.limit("2/second")
def login_for_access_token(username: str, password: str):
    token = access_token_service(username, password)
    return ({'access_token': token, 'token_type': 'bearer'})"""


@router.post("/refresh")
@limiter.limit("3/second")
def refresh(request: Request):
        cookies = request.cookies
        refresh = cookies.get("refresh")
        tokens = refresh_token_service(refresh)
        return tokens

@router.post("/login")
@limiter.limit("2/second")
def login(request: Request, email: str, password: str ):
    access_token, refresh_token = login_service(email, password)
    Response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,  # Prevents access via JavaScript
        secure=True,    # Ensure the cookie is sent only over HTTPS (production)
        samesite="Lax", # Controls cross-site request handling
    )
    Response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,  # Prevents access via JavaScript
        secure=True,    # Ensure the cookie is sent only over HTTPS (production)
        samesite="Lax", # Controls cross-site request handling
    )
    return {"message": "Login Successful"}


@router.post("/register")
@limiter.limit("1/second")
def create_user(request: Request, user: CreateUserSchema):
    dict = create_user_service(user)
    return dict