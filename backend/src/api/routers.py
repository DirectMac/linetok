from fastapi import APIRouter
from src.core.constants import ROUTE_PREFIX
from src.core.db import Base, engine
from .auth import auth_router
from .user import user_router

api_router = APIRouter(
    prefix=ROUTE_PREFIX
)

Base.metadata.create_all(bind=engine)

api_router.include_router(auth_router)
api_router.include_router(user_router)
