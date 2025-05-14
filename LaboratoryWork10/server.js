const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.post('/save-cities', (req, res) => {
    const cities = req.body.cities;
    
    // Save original cities to file
    fs.writeFile('original_cities.txt', cities.join('\n'), (err) => {
        if (err) {
            console.error('Error saving original cities:', err);
            return res.status(500).json({ error: 'Failed to save original cities' });
        }
        
        // Process cities (capitalize first letter and sort)
        const processedCities = cities
            .map(city => city.charAt(0).toUpperCase() + city.slice(1))
            .sort();
        
        // Save processed cities to file
        fs.writeFile('processed_cities.txt', processedCities.join('\n'), (err) => {
            if (err) {
                console.error('Error saving processed cities:', err);
                return res.status(500).json({ error: 'Failed to save processed cities' });
            }
            
            res.json({ success: true });
        });
    });
});

app.get('/get-original-cities', (req, res) => {
    fs.readFile('original_cities.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading original cities:', err);
            return res.status(500).json({ error: 'Failed to read original cities' });
        }
        
        const cities = data.split('\n').filter(city => city.trim());
        res.json({ cities });
    });
});

app.get('/get-processed-cities', (req, res) => {
    fs.readFile('processed_cities.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading processed cities:', err);
            return res.status(500).json({ error: 'Failed to read processed cities' });
        }
        
        const cities = data.split('\n').filter(city => city.trim());
        res.json({ cities });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
