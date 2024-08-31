from jose import jwt, JWTError
from server.db.database import get_db
from datetime import timedelta, datetime
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from server.db.database import get_db
import os
from . import models, schemas
SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')
REFRESH_TOKEN_EXPIRY = os.getenv("REFRESH_TOKEN_EXPIRY")
ACCESS_TOKEN_EXPIRY = os.getenv("REFRESH_ACCESS_EXPIRY")


def create_access_token(username: str, user_id: int, expires_delta: timedelta = None):
    encode = {'sub': username, 'id': user_id}
    expires = datetime.utcnow() + expires_delta
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
    except JWTError:
        return ValueError
    

def create_refresh_token(username: str, user_id: int, expires_delta: timedelta = None):
    
    expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRY)
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
    except JWTError:
        return None
    
