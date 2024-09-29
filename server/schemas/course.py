from pydantic import BaseModel, EmailStr


class Course(BaseModel):
    name: str

class QuizSchema(BaseModel):
    course: str
    level: int