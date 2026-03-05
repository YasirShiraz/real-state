const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// API Routes

// Upload Endpoint (Multiple)
app.post('/api/upload', upload.array('images', 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
    }
    const imageUrls = req.files.map(file => `http://localhost:5000/uploads/${file.filename}`);
    res.json({ urls: imageUrls });
});

// Get all properties
app.get('/api/properties', (req, res) => {
    try {
        const properties = db.prepare('SELECT * FROM properties ORDER BY id DESC').all();
        const formatted = properties.map(p => {
            let images = [];
            if (p.image) {
                try {
                    const parsed = JSON.parse(p.image);
                    images = Array.isArray(parsed) ? parsed : [p.image];
                } catch (e) {
                    images = [p.image];
                }
            }
            return { ...p, images };
        });
        res.json(formatted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add property
app.post('/api/properties', (req, res) => {
    const { title, price, location, beds, baths, sqft, images, type, status, description } = req.body;
    try {
        const imagesJson = JSON.stringify(images || []);
        const info = db.prepare(`
            INSERT INTO properties (title, price, location, beds, baths, sqft, image, type, status, description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(title, price, location, beds, baths, sqft, imagesJson, type, status, description);
        res.status(201).json({ id: info.lastInsertRowid, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update property
app.put('/api/properties/:id', (req, res) => {
    const { id } = req.params;
    const updates = { ...req.body };

    if (updates.images) {
        updates.image = JSON.stringify(updates.images);
        delete updates.images;
    }

    const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
    const values = Object.values(updates);

    try {
        db.prepare(`UPDATE properties SET ${fields} WHERE id = ?`).run(...values, id);
        res.json({ message: 'Property updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete property
app.delete('/api/properties/:id', (req, res) => {
    const { id } = req.params;
    try {
        db.prepare('DELETE FROM properties WHERE id = ?').run(id);
        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Site Content
app.get('/api/site-content', (req, res) => {
    try {
        const content = db.prepare('SELECT * FROM site_content WHERE id = 1').get();
        res.json(content);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/site-content', (req, res) => {
    const updates = req.body;
    const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
    const values = Object.values(updates);

    try {
        db.prepare(`UPDATE site_content SET ${fields} WHERE id = 1`).run(...values);
        res.json({ message: 'Site content updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Auth (Simple for now, can be upgraded to JWT)
app.post('/api/login', (req, res) => {
    const { password } = req.body;
    if (password === 'admin@123') {
        res.json({ token: 'mock-jwt-token', success: true });
    } else {
        res.status(401).json({ success: false, message: 'Invalid password' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
