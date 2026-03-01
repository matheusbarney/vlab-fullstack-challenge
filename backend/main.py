import config

from typing import List
from fastapi import FastAPI, HTTPException, Depends

from database import engine, get_db
from models import Material, MaterialTag

from sqlalchemy.orm import Session

from ai.gemini_flash import GeminiFlash
from schemas import AIRequest, AIResponse, MaterialCreate, MaterialResponse

import models

models.Base.metadata.create_all(bind=engine)

# Inicicialização do FastAPI
app = FastAPI(title="Educational Material API")

# Config modelo IA
gemini_api_key = config.GEMINI_API_KEY
if not gemini_api_key:
    raise ValueError("GEMINI_API_KEY não foi definido nas variáveis de ambiente.")

ai_platform = GeminiFlash(api_key=gemini_api_key)


# Endpoints API
@app.get("/")
def read_root():
    return {"message": "API is running"}


# Create
@app.post("/materials/", response_model=MaterialResponse)
def create_material(material: MaterialCreate, db: Session = Depends(get_db)):
    data = material.dict()
    tags = data.pop("tags", [])

    new_material = Material(**data)
    new_material.tags = [MaterialTag(name=tag) for tag in tags]

    db.add(new_material)
    db.commit()
    db.refresh(new_material)
    return new_material


# Return
@app.get("/materials/{material_id}", response_model=MaterialResponse)
def get_material(material_id: int, db: Session = Depends(get_db)):
    db_material = db.query(Material).filter(Material.id == material_id).first()
    if not db_material:
        raise HTTPException(status_code=404, detail="Material não existe")
    return db_material


# Update
@app.put("/materials/{material_id}", response_model=MaterialResponse)
def update_material(
    material_id: int, material: MaterialCreate, db: Session = Depends(get_db)
):
    db_material = db.query(Material).filter(Material.id == material_id).first()
    if not db_material:
        raise HTTPException(status_code=404, detail="Material não existe")

    data = material.dict()
    tags = data.pop("tags", [])
    data["url"] = str(data["url"])

    for key, value in data.items():
        setattr(db_material, key, value)

    # Substitui as tags completamente
    db_material.tags = [MaterialTag(name=tag) for tag in tags]

    db.commit()
    db.refresh(db_material)
    return db_material


# apagar todos e limpar db..
@app.delete("/materials/clear")
def clear_material_db(db: Session = Depends(get_db)):
    db.query(Material).delete()
    db.commit()
    return {"message": "Todos os materiais foram excluídos!"}


# Delete
@app.delete("/materials/{material_id}")
def delete_material(material_id: int, db: Session = Depends(get_db)):
    db_material = db.query(Material).filter(Material.id == material_id).first()
    if not db_material:
        raise HTTPException(status_code=404, detail="Material não existe")

    db.delete(db_material)
    db.commit()
    return {"message": "Material excluído!"}


# retornar todos..
@app.get("/materials/", response_model=List[MaterialResponse])
def get_all_material(db: Session = Depends(get_db)):
    return db.query(Material).all()


@app.post("/ai", response_model=AIResponse)
async def use_ai(request: AIRequest):
    response_text = ai_platform.chat(
        prompt_title=request.prompt_title, prompt_type=request.prompt_type
    )
    return AIResponse(response=response_text)
