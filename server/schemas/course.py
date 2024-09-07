from pydantic import BaseModel, EmailStr


class Course(BaseModel):
    name: str

