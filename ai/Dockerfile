# Python 3.11 スリムをベース
FROM python:3.11-slim

# 必要なパッケージを追加
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Python 依存関係をコピーしてインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# アプリ本体をコピー
COPY . .

# FastAPI を uvicorn で起動
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
