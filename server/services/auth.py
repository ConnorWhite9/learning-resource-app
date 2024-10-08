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
    user = await authenticate_user(db, email, password)
    access_token = create_access_token(user.username, user.id)
    refresh_token, expire = create_refresh_token(user.username, user.id)
    #Delete any previous refresh tokens
    #db.query(Token).filter(Token.user_id == user.id).delete()
    await save_refresh(refresh_token, expire, user.id, db)
    
    return access_token, refresh_token
    

async def refresh_token_service(token, db: AsyncSession):
    # Verify the refresh token
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

    # Extract user info from the payload
    user_id = payload.get("id")
    print(payload)
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar()
    print(user_id)
    print(user)
    print(1)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload")
    print(user)
    # Create new access token
    new_access_token = create_access_token(user.username, user_id)
    
    # Optionally create a new refresh token
    new_refresh_token, expire = create_refresh_token(user.username, user_id)

    refresh_token_save = Token(token=new_refresh_token, type="refresh", expiry=expire, user_id=user_id )
    db.add(refresh_token_save)
    await db.commit()
    
    # Return the new tokens
    cookies = {"access_token": new_access_token, "refresh_token": new_refresh_token}
    return cookies



async def create_user_service(newUser: CreateUserSchema, db: Session):
    
    message = await create_user_instance(newUser, db)
    
    return {"message": message}


async def logout_service(token, db: Session):
    check = await logout_crud(token, db)
    if check:
        return True
    else: 
        return False