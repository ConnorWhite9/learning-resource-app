from sqlalchemy.orm import Session
import datetime
from passlib.context import CryptContext
from fastapi import Depends
from server.db.database import get_db
from bcrypt import bcrypt_context
from . import models, schemas
from server.schemas.auth import *




async def login(db: Session, email: str, password: str):
    try:
        username = await db.query(models.User).filter(models.User.email == email).first()
        password = await db.query(models.User).filter(models.User.password == hash).first()
        if username or password is None:
            return False
        else:
            return True
    except:
        return ValueError
    


async def create_user_instance(db: Session, create_user_request: CreateUserSchema):
    create_user_model = models.User(
        username=create_user_request.username,
        email=create_user_request.email,
        hashed_password = bcrypt_context.hash(create_user_request.password),
    )
    db.add(create_user_model)
    db.commit()
    return "User Created"

async def authenticate_user(db: Session, email: str, password: str):
    user = await db.query(models.User).filter(models.User.email == email).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, models.User.password):
        return False
    return user

def isBlacklisted(token: str, db: Session = Depends(get_db)):
    try: 
        check = db.query(models.blacklistedToken).filter(models.blacklistedToken.token == token).first()
        if check:
            return False
        return True
    except:
        raise ValueError