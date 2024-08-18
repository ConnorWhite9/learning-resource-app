import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./test.db"  # Example default, replace with actual

    class Config:
        env_file = ".env"

settings = Settings()