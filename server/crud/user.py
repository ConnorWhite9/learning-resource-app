#Database interactions regarding the user table

from sqlalchemy.orm import Session

from . import models, schemas


async def get_user(db: Session, user_id: int):
    try:
        user = await db.query(models.User).filter(models.User.id == user_id).first()
        return user
    except:
        return ValueError