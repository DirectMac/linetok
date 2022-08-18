from curses import echo
from .constants import DATABASE_URL
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import declarative_base, sessionmaker

Base = declarative_base()


class AsyncDatabaseSession:
    def __init__(self):
        self._session = None
        self._engine = None

    def __getattr__(self, name):
        return getattr(self._session, name)

    def create(self):
        self._engine = create_async_engine(
            DATABASE_URL,
            future=True,
            echo=False
        )
        self._session = sessionmaker(
            self._engine,
            expire_on_commit=False,
            class_=AsyncSession,
        )()

    async def create_table(self):
        async with self._engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)


db = AsyncDatabaseSession()
