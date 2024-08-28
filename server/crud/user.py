#Database interactions regarding the user table

from sqlalchemy.orm import Session

from . import models, schemas


async def get_user(db: Session, user_id: int):
    try:
        user = await db.query(models.User).filter(models.User.id == user_id).first()
        return user
    except:
        return ValueError
    

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
    


async def create_user(db: Session, create_user_request: CreateUserRequest):
    create_user_model = models.User(
        username=create_user_request.username,
        hashed_password = bcrypt_context.hash(create_user_request.password),
    )
    db.add(create_user_model)
    db.commit()