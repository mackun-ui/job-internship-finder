require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch'); 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('../frontend'));

// Proxy endpoint to handle API requests
app.get('/api/search', async (req, res) => {
  try {
    const { query = '', location = '' } = req.query;
    const apiUrl = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}&num_pages=1`;

    const response = await fetch(apiUrl, {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).send(text);
    }

    const json = await response.json();
    res.json(json);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Proxy error' });
  }
});

app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
