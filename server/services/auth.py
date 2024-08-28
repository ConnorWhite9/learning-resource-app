from pydantic import BaseModel
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from typing import Annotated
from fastapi import Depends
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from server.db.database import get_db


bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

SECRET_KEY = 'fjfjfjfjf'
ALGORITHM = 'HS256'


oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")

class CreateUserRequest(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

db_dependency = Annotated[Session, Depends(get_db)]

