from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO

app = FastAPI()
model = YOLO('yolov8n.pt')

# CORS 設定
origins = ["http://localhost:5173"]  # フロントのURL
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# クラスID → 食材名
CLASS_MAP = {
    2: "トマト",
    7: "キャベツ",
    9: "きゅうり",
}

# 仮の賞味期限（本番は推論で計算可能）
DEFAULT_EXPIRY = "2025-12-31"

@app.post('/predict')
async def predict(file: UploadFile = File(...)):
    # ファイルを保存
    contents = await file.read()
    with open('temp.jpg', 'wb') as f:
        f.write(contents)
    
    # YOLO推論
    results = model('temp.jpg')

    if results[0].boxes:
        # 信頼度が最も高いものを使う
        best_box = max(results[0].boxes, key=lambda b: b.conf[0])
        cls_id = int(best_box.cls[0])
        name = CLASS_MAP.get(cls_id, "不明")
    else:
        name = "不明"

    return {"name": name, "expiry": DEFAULT_EXPIRY}
