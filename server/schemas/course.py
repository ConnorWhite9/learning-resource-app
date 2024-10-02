from pydantic import BaseModel, EmailStr
from typing import List


class Course(BaseModel):
    name: str

class QuizSchema(BaseModel):
    course: str
    level: int


class userAnswers(BaseModel):
    user_id: int
    quiz_id: int 
    answers: List[str]