from openai import OpenAI
from typing import Union
from contextlib import asynccontextmanager
from fastapi import FastAPI, APIRouter, Request, Response
from fastapi.responses import JSONResponse
from routers.limiter import limiter
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from routers.auth import router as auth
from routers.courses import router as course
from db.database import Base, engine, init_db
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncEngine
from db.database import engine
from models.quiz import Quiz
from routers.users import router as user
from routers.dependencies import csrf_protect
# @asynccontextmanager
# async def lifespan(_: FastAPI):
#     yield

#uvicorn main:app --reload



test_router = APIRouter()

app = FastAPI()



origins = [
    "https://www.intelliprogramming.org",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

import logging
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup event (initialization)
    await init_db()  # Run your database initialization here
    yield  # Hand over control to the application

# Setup logging (optional, for debugging)
logger = logging.getLogger(__name__)

# Global Exception Handler for all unhandled exceptions
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    # Log the exception
    logger.error(f"Unhandled exception: {exc}")

    # Custom error message based on the exception type
    if isinstance(exc, ValueError):
        custom_message = "A value error occurred. Please check your input."
        status_code = 400  # Bad Request
    elif isinstance(exc, KeyError):
        custom_message = "A key error occurred. Missing or invalid key in the request."
        status_code = 422  # Unprocessable Entity
    else:
        custom_message = "An unexpected error occurred. Please try again later."
        status_code = 500  # Internal Server Error

    # Return the custom error message and status code in the response
    return JSONResponse(
        status_code=status_code,
        content={"error": custom_message},
    )
async def rebuild_database(async_engine: AsyncEngine):
    async with async_engine.begin() as conn:
        # Drop all tables and recreate them asynchronously
        await conn.run_sync(Base.metadata.drop_all)  # Drops all tables
        await conn.run_sync(Base.metadata.create_all)  # Recreates all tables


#@app.on_event("startup")
#async def startup_event():
    # async with engine.begin() as conn:
        # Drop the table asynchronously
        #await conn.run_sync(Quiz.__table__.drop)
        # Recreate the table asynchronously
        #await conn.run_sync(Quiz.__table__.create)
        #await rebuild_database(engine)

@app.get("/")
def read_root():
    return {"Hello": "World"}


app.include_router(auth)
app.include_router(course)
app.include_router(user)

app.state.limiter = limiter



app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
