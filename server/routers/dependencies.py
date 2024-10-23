from fastapi import Depends
from fastapi_csrf_protect import CsrfProtect
from db.config import CsrfSettings

csrf_protect = CsrfProtect()

@csrf_protect.load_config
def get_csrf_config():
    return CsrfSettings()