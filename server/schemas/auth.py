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