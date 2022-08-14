import os
from dotenv import load_dotenv

load_dotenv()

HOST = "localhost"
PORT = 8000
DEBUG = True

ROUTE_PREFIX = "/api"

DATABASE_URL = os.getenv("DB_URL")

JWT_SECRET = os.getenv("JWT_SECRET")

