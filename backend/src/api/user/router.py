from src.common.utils.crud import create, read, update, destroy
from fastapi import APIRouter, HTTPException, Depends
from src.common.models import UserModel
from src.common.schemas.user import *
from passlib.hash import bcrypt
from src.common.dependencies import get_current_user


router = APIRouter(
    tags=["User"],
)


@router.get("/user/{id}", response_model=User)
async def get(id: str):
    user: User | None = await read(UserModel, {
        "key": UserModel.id,
        "value": id
    })
    if user is None:
        raise HTTPException(404, "User not found")

    return user


@router.get("/users", response_model=list[User])
async def get_all(): return await read(UserModel)


@router.post("/user", response_model=User, status_code=201)
async def post(payload: UserCreate):
    user: User | None = await read(UserModel, {
        "key": UserModel.username,
        "value": payload.username
    })
    if user:
        raise HTTPException(409, "User already exists")

    return await create(
        UserModel,
        username=payload.username,
        password=bcrypt.hash(payload.password)
    )


@router.put("/user/{id}", response_model=User)
async def put(id: str, payload: UserUpdate):
    user: User | None = await read(UserModel, {
        "key": UserModel.id,
        "value": id
    })
    if user is None:
        raise HTTPException(404, "User not found")

    return await update(user, **payload.dict())


@router.delete("/user/{id}", response_model=User)
async def delete(id: str):
    user: User | None = await read(UserModel, {
        "key": UserModel.id,
        "value": id
    })
    if user is None:
        raise HTTPException(404, "User not found")

    return await destroy(user)
