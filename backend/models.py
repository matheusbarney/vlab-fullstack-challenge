from database import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship


class MaterialTag(Base):
    __tablename__ = "material_tag"
    id = Column(Integer, primary_key=True, index=True)
    material_id = Column(Integer, ForeignKey("material.id", ondelete="CASCADE"))
    name = Column(String(100), nullable=False)


class Material(Base):
    __tablename__ = "material"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(String(999), nullable=False)
    type = Column(String(50), nullable=False)
    url = Column(String(2048), nullable=False)

    tags = relationship("MaterialTag", cascade="all, delete-orphan", lazy="joined")
