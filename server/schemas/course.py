from pydantic import BaseModel, EmailStr
from typing import List, Dict


class Course(BaseModel):
    name: str

class QuizSchema(BaseModel):
    course: str
    level: int


class userAnswers(BaseModel):
    quiz_id: int 
    answers: Dict[int, int]