from sqlalchemy.orm import Session
from sqlalchemy import delete
import datetime
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from db.database import get_db
from models.user import *
from models.auth import *
from schemas import *
from schemas.auth import *
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError


bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

async def login(db: Session, email: str, password: str):
    try:
        user = await db.execute(select(User)).where(User.email == email).first()  
        if user is None:
            return False
        if not bcrypt_context.verify(password, user.password):
            return False
        return user
    except SQLAlchemyError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"User could not be grabbed: {str(e)}")
    


async def create_user_instance(create_user_request: CreateUserSchema, db: AsyncSession):
    try: 
        create_user_model = User(
            username=create_user_request.username,
            email=create_user_request.email,
            password=bcrypt_context.hash(create_user_request.password),
        )
        db.add(create_user_model)
        await db.commit()
        return "User Created"
    except SQLAlchemyError as e:
        await db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"User could not be created successfully: {str(e)}")
    

async def check_users(create_user_request: CreateUserSchema, db: AsyncSession):
    try:
        result = await db.execute(select(User).where(User.email == create_user_request.email))
        user = result.scalar_one_or_none()
        if user is not None:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Account already exists with this email.")
    except SQLAlchemyError as e: 
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"User could not be grabbed for authentication: {str(e)}")


async def authenticate_user(db: AsyncSession, email: str, password: str):
    try: 
        result = await db.execute(select(User).where(User.email == email))
        user = result.scalar()
        if not user:
            return False, "There is no user with this email."
        if not bcrypt_context.verify(password, user.password):
            return False, "Incorrect password."
        return user, "Correctly grabbed everything"
    except SQLAlchemyError as e: 
        print(f"Error during authentication: {e} ")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"User could not be grabbed for authentication: {str(e)}")

async def isBlacklisted(token: str, db: Session = Depends(get_db)):
    try: 
        result = await db.execute(select(blacklistedToken).where(blacklistedToken.token == token))
        check = result.scalar()
        if check:
            return False
        return True
    except SQLAlchemyError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Token could not be grabbed: {str(e)}")
    

async def logout_crud(token, db: AsyncSession):
    try: 
        select_stmt = select(Token).where(Token.token == token)
        result = await db.execute(select_stmt)
        token_details = result.scalar_one_or_none()  # Get the single result or None
       
        if token_details is None:
            print("Token not found.")
            return False
        
        rows = await db.execute(delete(Token).where(Token.token == token))
        if rows.rowcount == 0:
            print("No tokens were deleted.")
            return False
        newBlackList = blacklistedToken(token=token_details.token, user_id=token_details.user_id, expiry=token_details.expiry, type=token_details.type)
        db.add(newBlackList)
        await db.commit()
        return True
        
    except SQLAlchemyError as e:
        await db.rollback()
        print(f"Could not delete tokens: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"New token could not be created or token could not be grabbed: {str(e)}")
    
    


async def save_refresh(token, expire, user_id, db: AsyncSession):
    try:
        refresh_token_save = Token(token=token, type="bearer", expiry=expire, user_id=user_id )
        db.add(refresh_token_save)
        await db.commit()
        return True
    except Exception as e:
        await db.rollback()
        print(f"Problem in saving new refresh token: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"New refresh token could not be succesfully added: {str(e)}")

async def grabPassword(user_id, db: AsyncSession):
    try:
        result = await db.execute(select(User).where(User.id == user_id))
        user = result.scalar_one_or_none()
        return user
    except Exception as e:
        await db.rollback()
        print(f"Problem in grabbing new password: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Password could not be grabbed: {str(e)}")
    
async def updatePassword_crud(user_id, password, db: AsyncSession):
    try:
        result = await db.execute(select(User).where(User.id == user_id))
        user = result.scalar_one_or_none()
        user.password = password
        await db.commit()
    except Exception as e:
        await db.rollback()
        print(f"Problem in changing the password: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Password could not be changed: {str(e)}")
    

async def infoUpdate_crud(user_id, newInfo, db: AsyncSession):
    try:
        result = await db.execute(select(User).where(User.id == user_id))
        user = result.scalar_one_or_none()
        user.email = newInfo.email
        user.username = newInfo.username 
        await db.commit()
        return True
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Info could not be updated: {str(e)}")