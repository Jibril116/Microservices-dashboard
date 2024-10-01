// server/server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

let data = ['Item 1', 'Item 2', 'Item 3'];

// Get data
app.get('/api/data', (req, res) => {
  res.json(data);
});

// Add data
app.post('/api/data', (req, res) => {
  const { item } = req.body;
  if (item) {
    data.push(item);
    res.status(201).json({ message: 'Item added' });
  } else {
    res.status(400).json({ error: 'Invalid item' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
