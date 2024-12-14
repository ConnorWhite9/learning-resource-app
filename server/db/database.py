from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base
from sqlalchemy.orm import sessionmaker, registry
from sqlalchemy.exc import SQLAlchemyError, OperationalError
from fastapi import Depends, HTTPException, status
from db.config import settings 
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
import os 
from dotenv import load_dotenv, dotenv_values 
# loading variables from .env file
load_dotenv() 
#URL from config file

#DATABASE_URL = settings.DATABASE_URL
DATABASE_URL = os.getenv('DATABASE_URL')
# Create SQLAlchemy engine
engine = create_async_engine(DATABASE_URL, echo=True, future=True)

#async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

# Create the async session
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Create a Base class for declarative models
Base = declarative_base()
# Dependency to get the database session
"""def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()"""
async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def get_db():
    try:
        async with AsyncSessionLocal() as session:
            yield session
    except OperationalError as op_err:
        # OperationalError typically indicates issues like connection failure
        logger.error(f"Database connection error: {op_err}")
        raise HTTPException(status_code=500, detail="Database connection failed.")
    except SQLAlchemyError as sql_err:
        # SQLAlchemyError will catch other database-related errors
        logger.error(f"SQLAlchemy error: {sql_err}")
        raise HTTPException(status_code=500, detail="Database query failed.")
    except Exception as e:
        # Catch any other unhandled exceptions
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Unexpected error occurred.")