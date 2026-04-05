const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function initDB() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        multipleStatements: true
    });

    try {
        console.log('Connected to MySQL. Initializing database...');
        const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
        await connection.query(sql);
        console.log('Database initialized successfully!');
    } catch (err) {
        console.error('Error initializing database:', err.message);
    } finally {
        await connection.end();
    }
}

initDB();
