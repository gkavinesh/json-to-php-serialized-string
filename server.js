// server.js
const express = require('express');
const bodyParser = require('body-parser');
const phpSerialize = require('php-serialize');
const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Handle form submission
app.post('/serialize', (req, res) => {
    try {
        // Parse JSON from the form input
        const jsonData = JSON.parse(req.body.jsonData);

        // Serialize JSON to PHP format
        const serializedPhpString = phpSerialize.serialize(jsonData);

        // Send serialized PHP string back as response
        res.send(`<pre>${serializedPhpString}</pre>`);
    } catch (error) {
        res.status(400).send('Invalid JSON input. Please try again.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
