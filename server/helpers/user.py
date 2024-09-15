from jose import jwt, JWTError
from db.database import get_db
from datetime import timedelta, datetime, timezone
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from db.database import get_db
from crud.user import *



def streak_counter(): 
    #grab the current streak
    #if 2 new days from when last activity was recorded reset streak
    #return streak 
    return

def streak_add():
    #check when last activity was, if same day do not add streak
    #add streak

    return