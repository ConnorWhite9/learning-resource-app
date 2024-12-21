from pydantic import BaseModel, EmailStr
from typing import List, Dict

class updateInfo(BaseModel):
    email: EmailStr
    username: str