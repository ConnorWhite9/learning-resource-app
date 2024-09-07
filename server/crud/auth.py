from sqlalchemy.orm import Session
import datetime
from passlib.context import CryptContext
from fastapi import Depends
from db.database import get_db
from models.user import *
from models.auth import *
from schemas import *
from schemas.auth import *


bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

async def login(db: Session, email: str, password: str):
    try:
        username = await db.query(User).filter(User.email == email).first()
        password = await db.query(User).filter(User.password == password).first()
        if username or password is None:
            return False
        else:
            return True
    except:
        return ValueError
    


def create_user_instance(create_user_request: CreateUserSchema, db: Session):
    create_user_model = User(
        username=create_user_request.username,
        email=create_user_request.email,
        password= bcrypt_context.hash(create_user_request.password),
    )
    db.add(create_user_model)
    db.commit()
    return "User Created"

def authenticate_user(db: Session, email: str, password: str):
    try: 
        user = db.query(User).filter(User.email == email).first()

        if not user:
            return False
        if not bcrypt_context.verify(password, user.password):
            return False
        return user
    except: 
        print("Did not find user")
        raise ValueError

def isBlacklisted(token: str, db: Session = Depends(get_db)):
    try: 
        check = db.query(blacklistedToken).filter(blacklistedToken.token == token).first()
        if check:
            return False
        return True
    except:
        raise ValueError
    

def logout_crud(token, db: Session):
    try: 
        find = db.query(Token).filter(Token.token == token).first()
        newBlackList = blacklistedToken(token=find.token, user_id=find.user_id, expiry=find.expiry, type=find.type)
        db.add(newBlackList)
        find.delete()
        db.commit()
        return True

    except:
        return False