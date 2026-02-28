from pydantic import BaseModel, HttpUrl, field_validator
from typing import Literal, Optional, List, Any


class AIRequest(BaseModel):
    prompt: str


class AIResponse(BaseModel):
    response: str


class MaterialCreate(BaseModel):
    title: str
    description: str
    type: Literal["Vídeo", "PDF", "Link"]
    url: str
    tags: Optional[List[str]] = []


class MaterialResponse(BaseModel):
    id: int
    title: str
    description: str
    type: Literal["Vídeo", "PDF", "Link"]
    url: str
    tags: List[str] = []

    @field_validator("tags", mode="before")
    @classmethod
    def extract_tag_names(cls, v: Any) -> List[str]:
        if v and hasattr(v[0], "name"):
            return [tag.name for tag in v]
        return v or []

    class Config:
        from_attributes = True
