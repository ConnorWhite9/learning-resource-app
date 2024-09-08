from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base
from sqlalchemy.orm import sessionmaker, registry
from db.config import settings 

#URL from config file

DATABASE_URL = settings.DATABASE_URL

# Create SQLAlchemy engine
engine = create_async_engine(DATABASE_URL, echo=True)

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
    async with AsyncSessionLocal() as session:
        yield session