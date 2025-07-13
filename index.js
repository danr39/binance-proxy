const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;
const BASE_URL = 'https://api.binance.com/api/v3/klines';

app.get('/klines', async (req, res) => {
  const { symbol, interval, limit } = req.query;
  try {
    const response = await axios.get(BASE_URL, {
      params: { symbol, interval, limit }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.get('/', (req, res) => {
  res.send('✅ Binance Proxy is Running');
});

app.listen(PORT, () => {
  console.log(`✅ Binance Proxy is Running on port ${PORT}`);
});
