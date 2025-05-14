const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Import city processor module
const { processCities } = require('./routes/cityProcessor');

// API route to get city data
app.get('/api/cities', (req, res) => {
  const cityData = processCities();
  res.json(cityData);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
