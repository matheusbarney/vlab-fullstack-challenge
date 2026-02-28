from database import Base
from sqlalchemy import Column, Integer, String


class Material(Base):
    __tablename__ = "material"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(String(999), nullable=False)
    