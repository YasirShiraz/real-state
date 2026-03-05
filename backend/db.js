const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'database.sqlite'));

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    price TEXT NOT NULL,
    location TEXT NOT NULL,
    beds INTEGER,
    baths INTEGER,
    sqft INTEGER,
    image TEXT,
    type TEXT,
    status TEXT,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS site_content (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    heroTitle TEXT,
    heroSubtitle TEXT,
    contactEmail TEXT,
    contactPhone TEXT,
    contactAddress TEXT
  );
`);

// Seed initial data if empty
const propertyCount = db.prepare('SELECT COUNT(*) as count FROM properties').get();
if (propertyCount.count === 0) {
    const insertProperty = db.prepare(`
        INSERT INTO properties (title, price, location, beds, baths, sqft, image, type, status, description)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const initialProperties = [
        {
            title: "The Royal Atlantis",
            price: "AED 45,000,000",
            location: "Palm Jumeirah",
            beds: 4,
            baths: 5,
            sqft: 6500,
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200",
            type: "Penthouse",
            status: "For Sale"
        },
        {
            title: "Bulgari Resort & Residences",
            price: "AED 32,500,000",
            location: "Jumeirah Bay",
            beds: 3,
            baths: 4,
            sqft: 4200,
            image: "https://images.unsplash.com/photo-1600596542815-e328701102b9?auto=format&fit=crop&q=80&w=1200",
            type: "Apartment",
            status: "New Listing"
        },
        {
            title: "Emirates Hills Mansion",
            price: "AED 120,000,000",
            location: "Emirates Hills",
            beds: 7,
            baths: 9,
            sqft: 18000,
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200",
            type: "Villa",
            status: "Exclusive"
        }
    ];

    for (const p of initialProperties) {
        insertProperty.run(p.title, p.price, p.location, p.beds, p.baths, p.sqft, p.image, p.type, p.status, p.description || null);
    }
}

const contentCount = db.prepare('SELECT COUNT(*) as count FROM site_content').get();
if (contentCount.count === 0) {
    db.prepare(`
        INSERT INTO site_content (id, heroTitle, heroSubtitle, contactEmail, contactPhone, contactAddress)
        VALUES (1, 'PLATINUM LIVING.', 'Experience the new standard of transparency in luxury real estate.', 'elite@maestate.com', '+971 4 123 4567', 'Level 84, Burj Khalifa District, Dubai, UAE')
    `).run();
}

module.exports = db;
