#Database interactions regarding the user table

from sqlalchemy.orm import Session
import datetime
from models.user import *


async def get_user(db: Session, user_id: int):
    try:
        user = await db.query(User).filter(User.id == user_id).first()
        return user
    except:
        return ValueError
    

