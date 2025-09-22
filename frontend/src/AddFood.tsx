import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddFood: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/foods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, expiry }),
      });

      if (!res.ok) throw new Error('登録失敗');
      alert('登録成功！');
      navigate('/'); // 登録後に一覧ページへ戻る
    } catch (err) {
      alert('登録できませんでした');
      console.error(err);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', mt: 5 }}>
      <CardContent>
        <Typography variant='h5' gutterBottom>食材登録</Typography>
        <TextField 
          label='食材名' 
          fullWidth 
          margin='normal' 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <TextField
          label='賞味期限'
          type='date'
          fullWidth
          margin='normal'
          InputLabelProps={{ shrink: true }}
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />
        <Button 
          variant='contained' 
          color='primary' 
          fullWidth 
          sx={{ mt: 2 }} 
          onClick={handleSubmit}
        >
          登録
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddFood;
