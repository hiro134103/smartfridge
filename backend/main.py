from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

# PostgreSQL の接続情報（自分の環境に合わせて）
import os
DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql://hiro:secret@db:5432/smartfridge")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# CORS 設定
app = FastAPI()
origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic モデル
class Food(BaseModel):
    name: str
    expiry: str

class FoodOut(Food):
    id: int

# SQLAlchemy モデル
class FoodModel(Base):
    __tablename__ = "foods"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    expiry = Column(String, nullable=False)

Base.metadata.create_all(bind=engine)

# DB セッション
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# API
@app.get("/foods", response_model=List[FoodOut])
def get_foods(db: Session = Depends(get_db)):
    foods = db.query(FoodModel).all()
    return foods

@app.post("/foods", response_model=FoodOut)
def add_food(food: Food, db: Session = Depends(get_db)):
    db_food = FoodModel(name=food.name, expiry=food.expiry)
    db.add(db_food)
    db.commit()
    db.refresh(db_food)
    return db_food

@app.delete("/foods/{food_id}")
def delete_food(food_id: int, db: Session = Depends(get_db)):
    db_food = db.query(FoodModel).filter(FoodModel.id == food_id).first()
    if not db_food:
        raise HTTPException(status_code=404, detail="食材が見つかりません")
    db.delete(db_food)
    db.commit()
    return {"message": "削除しました"}
