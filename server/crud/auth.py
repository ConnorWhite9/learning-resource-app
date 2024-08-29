from sqlalchemy.orm import Session
import datetime
from passlib.context import CryptContext
from bcrypt import bcrypt_context
from . import models, schemas




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
    


async def create_user(db: Session, create_user_request: schemas.CreateUserRequest):
    create_user_model = models.User(
        username=create_user_request.username,
        hashed_password = bcrypt_context.hash(create_user_request.password),
    )
    db.add(create_user_model)
    db.commit()

async def authenticate_user(db: Session, username: str, password: str):
    user = await db.query(models.User).filer(models.User.username == username).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, models.User.password):
        return False
    return user

