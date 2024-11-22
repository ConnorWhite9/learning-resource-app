import os
from pydantic import SecretStr, ValidationError, BaseModel
from pydantic_settings import BaseSettings


from dotenv import load_dotenv, dotenv_values 
# loading variables from .env file
load_dotenv() 
 
# accessing and printing value
SECRET_KEY = os.getenv('CSRF_SECRET_KEY')
DATABASE_URL = os.getenv('DATABASE_URL')
SETTINGS_KEY = os.getenv('SETTINGS_KEY')

class CsrfSettings(BaseModel):
    secret_key: str = SECRET_KEY  # Use an environment variable in production

class Settings(BaseSettings):
    DATABASE_URL: str = DATABASE_URL

    secret_key: SecretStr = SETTINGS_KEY

    algorithm: str = "HS256"

    refresh_token_expiry: int = 30

    access_token_expiry: int = 5

    csrf_secret_key: str = SECRET_KEY

    class Config:
        env_file = ".env"
        extra = "ignore"  # This allows extra fields like 'settings_key' to be ignored
try:
    settings = Settings()
except ValidationError as e:
    settings = None
    print("Validation error:", e)

