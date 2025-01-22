from jose import jwt, JWTError
from db.database import get_db
from datetime import datetime, timezone
from datetime import timedelta as extra
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from typing import Annotated
from routers.dependencies import csrf_protect
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from db.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
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


def create_access_token(username: str, user_id: int):
    try:
        expires_delta = extra(minutes=int(ACCESS_TOKEN_EXPIRY))    
        encode = {'sub': username, 'id': user_id}
        expires = expires_delta + datetime.now(timezone.utc) 
   
        encode.update({'exp': expires})
        return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)
    except Exception as e:
        print(e)
        print("This was inside the create access toekn function")


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
    

def create_refresh_token(username: str, user_id: int):
    expire = datetime.now() + extra(days=int(REFRESH_TOKEN_EXPIRY))
    encode = {"sub": username, 'id': user_id}
    encode.update({'exp': expire})

    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM), expire
    
def verify_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise credentials_exception
    


async def decode_token(refresh_token, token: str, response: Response, db: AsyncSession):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload, True
    

    except JWTError as e:
        from services.auth import refresh_token_service
        tokens, user_id = await refresh_token_service(refresh_token, token, db)
        
        response.set_cookie(
            key="access_token",
            value=tokens["access_token"],
            httponly=True,  # Prevents access via JavaScript
            secure=True,    # Ensure the cookie is sent only over HTTPS (production)
            samesite="None", # Controls cross-site request handling
            path="/",
        )
        response.set_cookie(
            key="refresh_token",
            value=tokens["refresh_token"],
            httponly=True,  # Prevents access via JavaScript
            secure=True, # Ensure the cookie is sent only over HTTPS (production)
            samesite="None", # Controls cross-site request handling
            path="/",
        )
         
        return user_id, False

def decode_refresh_token(refresh_token):
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh Token could not be verified"
        )
    
def verify_access(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
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

        csrf_protect.validate_csrf(csrf_token)
        return {"message": "Form submitted successfully"}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Invalid CSRF token {str(e)}")