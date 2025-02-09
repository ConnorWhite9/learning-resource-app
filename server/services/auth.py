from pydantic import BaseModel
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from typing import Annotated
import timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from db.database import get_db
from crud.auth import authenticate_user
from schemas.auth import *
from models.auth import *
from models.user import *
from helpers.auth import *
from crud.auth import *
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession


bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')



oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")

class CreateUserRequest(BaseModel):
    username: str
    password: str



db_dependency = Annotated[Session, Depends(get_db)]



"""def access_token_service(username, password):
    user = authenticate_user(username, password)
    if not user:
        raise HTTPException(status_code=status.HTTP_UNAUTHORIZED, 
                            detail='Could not validate user.')
    token = create_access_token(user.username, user.id, timedelta(minutes=20))

    return token"""


async def login_service(email, password, db: Session):   
    user, message = await authenticate_user(db, email, password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=message)
    access_token = create_access_token(user.username, user.id)
    refresh_token, expire = create_refresh_token(user.username, user.id)
    #Delete any previous refresh tokens
    #db.query(Token).filter(Token.user_id == user.id).delete()
    await save_refresh(refresh_token, expire, user.id, db)
    
    return access_token, refresh_token
    

async def refresh_token_service(refresh_token, access_token, db: AsyncSession):
    # Verify the refresh token
    payload2 = decode_refresh_token(refresh_token)
    if not payload2:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

    # Extract user info from the payload
    user_id = payload2.get("id")
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar()
    
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload")
    
    # Create new access token
    new_access_token = create_access_token(user.username, user_id)
    
    # Optionally create a new refresh token
    new_refresh_token, expire = create_refresh_token(user.username, user_id)
    try:
        refresh_token_save = Token(token=new_refresh_token, type="refresh", expiry=expire, user_id=user_id )
        db.add(refresh_token_save)
        await db.commit()
    except Exception as e:
        try: 
            await db.rollback()
            await db.execute(delete(Token).where(Token.token == new_refresh_token))
            await db.commit()
            
            refresh_token_save = Token(token=new_refresh_token, type="refresh", expiry=expire, user_id=user_id )
            db.add(refresh_token_save)
            await db.commit()
        except Exception as e:
            db.rollback()
            raise ValueError(e)
    # Return the new tokens
    cookies = {"access_token": new_access_token, "refresh_token": new_refresh_token}
    return cookies, user_id



async def create_user_service(newUser: CreateUserSchema, db: Session):
    bool =  await check_users(newUser, db)
    message = await create_user_instance(newUser, db)
   
    return {"message": message}


async def logout_service(token, db: Session):
    check = await logout_crud(token, db)
    if check:
        return True
    else: 
        return False
    

async def checkPassword_service(refresh_token, access_token, password, response: Response, db: AsyncSession):
    payload, checker = await decode_token(refresh_token, access_token, response, db)
    user_id = None
    if checker: 
        if not payload:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid access token")

        # Extract user info from the payload
        user_id = payload.get("id")
    else:
        user_id = payload

    user = await grabPassword(user_id, db)

    if bcrypt_context.verify(password.password, user.password):
    
        password_token = create_access_token(user.username, user_id)
        return True, password_token
    else:
       
        return False, None

async def updatePassword_service(refresh_token, access_token, password_token, password, response: Response, db: AsyncSession):
    #Password token checker functionality 
    payload, checker = await decode_token(refresh_token, access_token, response, db)
    user_id = None
    if checker: 
        if not payload:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid access token")

        # Extract user info from the payload
        user_id = payload.get("id")
    else:
        user_id = payload

    payload2 = verify_access(password_token)
    if not payload2:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not verified to change password")
    
    user_id = payload.get("id")

    await updatePassword_crud(user_id, bcrypt_context.hash(password.password), db)
    return True

#Current info update service being used
async def infoUpdate_service(refresh_token, access_token, newInfo, response: Response, db: AsyncSession):
    payload, checker = await decode_token(refresh_token, access_token, response, db)
    user_id = None
    if checker: 
        if not payload:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid access token")

        # Extract user info from the payload
        user_id = payload.get("id")
    else:
        user_id = payload
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Access token was invalid")
    user_id = payload.get("id")

    #crud function with new info
    check = await infoUpdate_crud(user_id, newInfo, db)

    return check