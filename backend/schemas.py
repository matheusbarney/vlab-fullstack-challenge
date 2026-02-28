from pydantic import BaseModel, HttpUrl
from typing import Literal, Optional, List


class AIRequest(BaseModel):
    prompt: str


class AIResponse(BaseModel):
    response: str


class ResourceCreate(BaseModel):
    # //title: str = Field(..., min_length=3, max_length=100)
    title: str
    description: str
    type: Literal["Vídeo", "PDF", "Link"]
    url: HttpUrl
    tags: Optional[List[str]] = []


class MaterialCreate(BaseModel):
    title: str
    description: str


class MaterialResponse(BaseModel):
    id: int
    title: str
    description: str

    class Config:
        from_attributes = True
