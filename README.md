# SmartFridge

SmartFridge は、AI を活用して冷蔵庫内の食品を管理するアプリケーションです。

---

## 構成

```
smartfridge/
├─ ai/          # AI 推論用サーバー
│  ├─ main.py           # YOLOv8 推論コード
│  ├─ Dockerfile        # コンテナビルド定義
│  └─ requirements.txt  # Python 依存ライブラリ
├─ backend/     # API サーバー
│  ├─ main.py           # FastAPI メインコード
│  ├─ models.py         # データモデル定義
│  ├─ Dockerfile        # コンテナビルド定義
│  └─ requirements.txt  # Python 依存ライブラリ
├─ frontend/    # フロントエンド（SPA）
│  ├─ src/              # React / TypeScript ソースコード
│  ├─ public/           # 静的ファイル
│  ├─ dist/             # ビルド成果物
│  ├─ Dockerfile        # コンテナビルド定義
│  └─ package.json      # npm 依存ライブラリ
└─ docker-compose.yaml  # マルチコンテナ構成

```

---

## 技術スタック

- **フロントエンド (SPA)**: React + TypeScript + Vite
- **バックエンド (API)**: FastAPI + Uvicorn
- **AI 推論**: Python + Ultralytics YOLOv8
- **データベース**: PostgreSQL
- **コンテナ管理**: Docker & Docker Compose
- **バージョン管理**: Git + GitHub

---

## 必要環境

- Docker & Docker Compose
- Python 3.x
- Node.js 18.x 以上

---

## 使い方

1. プロジェクトルートで Docker コンテナを立ち上げる:

```bash
docker-compose up --build
```

2. ブラウザでアクセス:

```
http://localhost:8080
```

---
