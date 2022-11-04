from fastapi import APIRouter
from src.common.database import db
from src.common.models import CategoryModel, ProductModel
from src.common.utils import not_found, already_exist
from src.common.schemas import (
    Product,
    Category,
    CategoryCreate,
    CategoryUpdate,
    ProductUpdate
)


router = APIRouter()


@router.get("/", response_model=list[Category])
async def get_all():
    categories: list[Category] | None = await db.get_all(CategoryModel)
    if len(categories) == 0:
        raise not_found("categories", many=True)

    return categories


@router.get("/{id}", response_model=Category)
async def get(id: int):
    category: Category | None = await db.get(
        CategoryModel,
        CategoryModel.id,
        id
    )
    if category is None:
        raise not_found("category")

    return category


@router.post("/", response_model=Category)
async def create(payload: CategoryCreate):
    category: Category | None = await db.get(
        CategoryModel,
        CategoryModel.name,
        payload.name
    )
    if category:
        raise already_exist("category")

    return await db.post(CategoryModel, **payload.dict())


@router.put("/{id}", response_model=Category)
async def update(id: int, payload: CategoryUpdate):
    category: Category | None = await db.get(
        CategoryModel,
        CategoryModel.id,
        id
    )
    if category is None:
        raise not_found("category")

    return await db.put(category, **payload.dict())


@router.delete("/{id}", response_model=Category)
async def delete(id: int):
    category: Category | None = await db.get(
        CategoryModel,
        CategoryModel.id,
        id
    )
    if category is None:
        raise not_found("category")

    products: list[Product] | None = await db.get_all(ProductModel)
    for product in products:
        if product.category_id == id:
            await db.put(product, **ProductUpdate(
                categoruId=None).dict(exclude_unset=True))

    return await db.delete(category)
