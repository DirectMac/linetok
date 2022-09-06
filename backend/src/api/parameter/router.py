from src.common.utils.crud import read, create, update, destroy, by
from fastapi import APIRouter, Depends
from src.common.schemas.parameter import *
from src.common.models import ParameterModel
from src.common.dependencies import get_current_user
from src.common.utils.exceptions import not_found, conflict


router = APIRouter(
    tags=["Parameter"]
)


@router.get("/parameter/{id}", response_model=Parameter)
async def get(id: str):
    parameter: Parameter | None = await read(
        ParameterModel,
        by(ParameterModel.id, id)
    )
    if parameter is None:
        raise not_found("Parameter")

    return parameter


@router.get("/parameters", response_model=list[Parameter])
async def get_all(): return await read(ParameterModel)


@router.post("/parameter", response_model=Parameter, status_code=201, dependencies=[Depends(get_current_user)])
async def post(payload: ParameterCreate):
    parameter: Parameter | None = await read(
        ParameterModel,
        by(ParameterModel.title, payload.title)
    )
    if parameter:
        raise conflict("Parameter")

    return await create(ParameterModel, **payload.dict())


@ router.put("parameter/{id}", response_model=Parameter, dependencies=[Depends(get_current_user)])
async def put(id: str, payload: ParameterUpdate):
    parameter: Parameter | None = await read(
        ParameterModel,
        by(ParameterModel.id, id)
    )
    if parameter is None:
        raise not_found("Parameter")

    return await update(parameter, **payload.dict())


@ router.delete("/parameter/{id}", response_model=Parameter, dependencies=[Depends(get_current_user)])
async def delete(id: str):
    parameter: Parameter | None = await read(
        ParameterModel,
        by(ParameterModel.id, id)
    )
    if parameter is None:
        raise not_found("Parameter")

    return await destroy(parameter)
