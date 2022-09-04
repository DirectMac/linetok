from src.common.config import Base
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from .base import BaseModel


class TokenModel(Base, BaseModel):
    __tablename__ = "refresh_token"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("user.id"), index=True)

    user = relationship(
        "UserModel",
        back_populates="refresh_token",
        uselist=False
    )
