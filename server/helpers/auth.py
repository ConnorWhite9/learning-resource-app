from jose import jwt, JWTError
from db.database import get_db
from datetime import timedelta, datetime, timezone
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from typing import Annotated
from routers.dependencies import csrf_protect
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from db.database import get_db
from crud.user import *
from fastapi import APIRouter, HTTPException, Request, Response, Cookie, FastAPI, Depends, Header, status
from fastapi_csrf_protect import CsrfProtect
import os
# importing necessary functions from dotenv library
from dotenv import load_dotenv, dotenv_values 
# loading variables from .env file
load_dotenv() 
 
# accessing and printing value
SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')
REFRESH_TOKEN_EXPIRY = os.getenv("REFRESH_TOKEN_EXPIRY")
ACCESS_TOKEN_EXPIRY = os.getenv("ACCESS_TOKEN_EXPIRY")


def create_access_token(username: str, user_id: int, expires_delta: timedelta = timedelta(minutes=10)):
    encode = {'sub': username, 'id': user_id}
    expires = datetime.now(timezone.utc) + expires_delta
    encode.update({'exp': expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get('sub')
        user_id: int = payload.get('id')
        if username is None or user_id is None: 
            return ValueError
        
        return {'username': username, 'id': user_id}
    except JWTError as e:
        raise ValueError
    

def create_refresh_token(username: str, user_id: int, expires_delta: timedelta = None):
    expire = datetime.now() + timedelta(days=int(REFRESH_TOKEN_EXPIRY))
    encode = {"sub": username, 'id': user_id}
    encode.update({'exp': expire})

    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM), expire
    
def verify_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise credentials_exception
    


def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError as e:
        raise ValueError(e)
    
def verify_access(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM], options={"verify_exp": False})
        print(payload['exp'])
        return payload
    except JWTError as e:
        raise ValueError(e)
    #Add signature matching

    #Add expiration chec

async def validate_csrf(request: Request, csrf_protect: CsrfProtect = Depends()):
    csrf_token = request.headers.get("X-CSRF-Token")

    if not csrf_token:
        # If the token is missing, raise an exception
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="CSRF token missing from headers"
        )
    try:

        csrf_protect.validate_csrf(request.headers.get("X-CSRF-Token"))
        return {"message": "Form submitted successfully"}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Invalid CSRF token {str(e)}")