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


bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')



oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")

class CreateUserRequest(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

db_dependency = Annotated[Session, Depends(get_db)]



"""def access_token_service(username, password):
    user = authenticate_user(username, password)
    if not user:
        raise HTTPException(status_code=status.HTTP_UNAUTHORIZED, 
                            detail='Could not validate user.')
    token = create_access_token(user.username, user.id, timedelta(minutes=20))

    return token"""


def login_service(email, password, db: Session = Depends(get_db),):
    
    user = authenticate_user(email, password)
    
    access_token = create_access_token(user.username, user.user_id)
    refresh_token, expire = create_refresh_token(user.username, user.user_id)
    #Delete any previous refresh tokens
    db.query(Token).filter(Token.user_id == user.user_id).delete()

    refresh_token_save = Token(token=refresh_token, type="refresh", expiry=expire, user_id=user.user_id )
    db.add(refresh_token_save)
    db.commit()
    
    return access_token, refresh_token
    

def refresh_token_service(token, db: Session = Depends(get_db)):
    # Verify the refresh token
    payload = decode_token(token)
    if not payload or isBlacklisted(token):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")
    
    # Extract user info from the payload
    user_id = payload.get("sub")

    username = db.query(User).filter(User.user_id == user_id).first().username
    if not username:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload")
    
    # Create new access token
    new_access_token = create_access_token(data={'sub': user_id, 'name': username})
    
    # Optionally create a new refresh token
    new_refresh_token, expire = create_refresh_token(data={'sub': user_id, 'id': username})

    refresh_token_save = Token(token=new_refresh_token, type="refresh", expiry=expire, user_id=user_id )
    db.add(refresh_token_save)
    db.commit()
    
    # Return the new tokens
    cookies = {"access_token": new_access_token, "refresh_token": new_refresh_token}
    return cookies



def create_user_service(newUser: CreateUserSchema):
    
    message = create_user_instance(newUser)
    
    return {"message": message}
