from fastapi import APIRouter, HTTPException, Request, Response, Cookie, FastAPI, Depends, Header, status
from fastapi.params import Depends
from sqlalchemy.orm import Session
from services.auth import *
from fastapi.security import OAuth2PasswordBearer
from fastapi_csrf_protect import CsrfProtect
from schemas.auth import *
from .limiter import limiter
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi_csrf_protect import CsrfProtect
router = APIRouter(
    prefix="/auth",
)


"""@router.post("/token")
@limiter.limit("2/second")
def login_for_access_token(username: str, password: str):
    token = access_token_service(username, password)
    return ({'access_token': token, 'token_type': 'bearer'})"""

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/refresh")
@limiter.limit("2/second")
async def refresh(request: Request, csrf: str = Depends(validate_csrf), db: AsyncSession=Depends(get_db)):
        refresh_token = request.cookies.get("refresh_token")
        access_token = request.cookies.get("access_token")
        if refresh_token is None or access_token is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No token found")
        access_token = request.cookies.get("access_token")
        tokens = await refresh_token_service(refresh_token, access_token, db)
        response = Response()
        
        response.set_cookie(
            key="access_token",
            value=tokens["access_token"],
            httponly=True,  # Prevents access via JavaScript
            secure=True,    # Ensure the cookie is sent only over HTTPS (production)
            samesite="None", # Controls cross-site request handling
            path="/",
        )
        response.set_cookie(
            key="refresh_token",
            value=tokens["refresh_token"],
            httponly=True,  # Prevents access via JavaScript
            secure=True, # Ensure the cookie is sent only over HTTPS (production)
            samesite="None", # Controls cross-site request handling
            path="/",
        )
        return response

@router.post("/login")
@limiter.limit("2/second")
async def login(request: Request, response: Response, info: LoginSchema, csrf: str = Depends(validate_csrf),  db: AsyncSession = Depends(get_db) ):
    access_token, refresh_token = await login_service(info.email, info.password, db)
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,  # Prevents access via JavaScript
        secure=True,    # Ensure the cookie is sent only over HTTPS (production)
        samesite="None", # Controls cross-site request handling
        path="/"
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,  # Prevents access via JavaScript
        secure=True,    # Ensure the cookie is sent only over HTTPS (production)
        samesite="None", # Controls cross-site request handling
        path="/",
    )
    response.status_code = 200
    return response


@router.post("/register")
@limiter.limit("1/second")
async def create_user(request: Request, user: CreateUserSchema, csrf: str = Depends(validate_csrf), db: AsyncSession=Depends(get_db)):
    dict = await create_user_service(user, db)
    return dict


@router.post("/logout")
@limiter.limit("1/second")
async def logout(request: Request, response: Response, db: AsyncSession = Depends(get_db)):
    
    cookies = request.cookies
    refresh = cookies.get("refresh_token")
    print(refresh)
    check = await logout_service(refresh, db)
    if check:
        message = "Logged out successfully"
    else:
        message = "Tokens were not able to be blacklisted and removed from data tables"

    response.delete_cookie(key="access_token", path="/", samesite='None', secure=True)
    response.delete_cookie(key="refresh_token", path="/", samesite='None', secure=True)

    return {"message": message}






@router.get("/get_csrf_token")
@limiter.limit("10/second")
def get_csrf_token(request: Request, csrf_protect: CsrfProtect = Depends()):
    csrf_token = csrf_protect.generate_csrf()
    data={"csrf_token": csrf_token, "message": "CSRF token generated"}
    response = JSONResponse(content=data)

    return response

