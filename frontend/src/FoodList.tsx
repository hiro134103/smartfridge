import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Food { 
  id: number; 
  name: string; 
  expiry: string; 
}

const FoodList: React.FC = () => {
  const navigate = useNavigate();
  const [foods, setFoods] = useState<Food[]>([]);
  const [file, setFile] = useState<File | null>(null);

  // 食材一覧取得
  const fetchFoods = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/foods');
      const data = await res.json();
      setFoods(data);
    } catch (err) {
      console.error('取得失敗', err);
    }
  };

  // 削除
  const deleteFood = async (id: number) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/foods/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFoods(foods.filter(food => food.id !== id));
      }
    } catch (err) {
      console.error('削除失敗', err);
    }
  };

  // ファイル選択
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  // AI推論して登録
  const handlePredict = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      // AIサーバーに送信（推論）
      const res = await fetch('http://127.0.0.1:8001/predict', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('推論失敗');

      const data: { name: string; expiry: string } = await res.json();

      // バックエンドに登録
      const addRes = await fetch('http://127.0.0.1:8000/foods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!addRes.ok) throw new Error('登録失敗');

      const newFood = await addRes.json();
      setFoods(prev => [...prev, newFood]);
      setFile(null); // 選択リセット
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div style={{ maxWidth: 500, margin: 'auto', marginTop: 50 }}>
      <Typography variant='h4' gutterBottom>食材一覧</Typography>

      {foods.map(food => (
        <Card key={food.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant='h6'>{food.name}</Typography>
            <Typography color='text.secondary'>賞味期限: {food.expiry}</Typography>
          </CardContent>
          <CardActions>
            <Button color="error" onClick={() => deleteFood(food.id)}>削除</Button>
          </CardActions>
        </Card>
      ))}

      <input type="file" onChange={handleFileChange} />
      <Button variant='contained' onClick={handlePredict} fullWidth disabled={!file} sx={{ mt: 1 }}>
        AIで登録
      </Button>

      <Button variant='contained' color='primary' onClick={() => navigate('/add')} fullWidth sx={{ mt: 2 }}>
        手動で新規登録
      </Button>
    </div>
  );
};

export default FoodList;
