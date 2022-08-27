from ..config import Base
from passlib.hash import bcrypt
from sqlalchemy import Column, String
from src.common.services.crud import Service
from .base import BaseModel
from sqlalchemy.orm import relationship


class UserModel(Base, BaseModel, Service):
    __tablename__ = "user"

    username = Column(String(50), unique=True)
    password = Column(String(128))
    role = Column(String(10), default='moderator')
    refresh_token = relationship(
        "TokenModel", back_populates="user")

    def verify_password(self, password):
        return bcrypt.verify(password, self.password)
