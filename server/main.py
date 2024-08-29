from typing import Union
from contextlib import asynccontextmanager
from fastapi import FastAPI, APIRouter
from routers.limiter import limiter
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded



# @asynccontextmanager
# async def lifespan(_: FastAPI):
#     yield

test_router = APIRouter()

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


app.include_router(test_router)

app.state.limiter = limiter

app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}