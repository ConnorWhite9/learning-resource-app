from pydantic import BaseModel, EmailStr





class CreateUserSchema(BaseModel):
    username: str
    email: EmailStr
    password: str

class LoginSchema(BaseModel):
    email: EmailStr
    password: str

class tokenSchema(BaseModel):
    token: str

class checkPassword(BaseModel):
    password: str

class infoUpdateSchema(BaseModel):
    email: EmailStr
    username: str