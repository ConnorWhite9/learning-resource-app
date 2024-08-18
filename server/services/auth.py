from pydantic import BaseModel
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from typing import Annotated
from fastapi import Depends
from server.db.database import get_db


bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


db_dependency = Annotated[Session, Depends(get_db)]