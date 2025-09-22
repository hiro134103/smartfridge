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

## 開発メモ

### フロントエンド（SPA）
- URL: `http://localhost:8080`
- トップページ
  - 冷蔵庫内の食品一覧を表示
- 食品追加ページ (`/add`)
  - 名前、数量、賞味期限入力
  - 画像アップロードで AI による自動認識
- 編集・削除
  - 食品リスト上で操作可能

### バックエンド（APIサーバー）
- URL: `http://localhost:8000`
- エンドポイント
  - `GET /foods` : 登録済み食品一覧を取得
  - `POST /foods` : 新しい食品を登録
- FastAPI + Uvicorn で稼働
- PostgreSQL データベースと連携

### AI サーバー
- URL: `http://localhost:8001`
- POST `/predict` に画像を送信
- YOLOv8 で食品を認識して JSON で返却
- バックエンドに結果を送信してフロントに反映
