from fastapi import APIRouter
from ..core.config import settings
from .user import user_router
from .auth import auth_router
from .parameter import parameter_router
from .category import category_router

api_router = APIRouter(
    prefix=settings.ROUTE_PREFIX
)


ROUTERS = [
    user_router,
    auth_router,
    parameter_router,
    category_router,
]

for router in ROUTERS:
    api_router.include_router(router)
