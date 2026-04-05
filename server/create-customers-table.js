const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function createTable() {
    console.log('Attempting to connect to MySQL...');
    
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log(`Connected to database: ${process.env.DB_NAME}`);

        const sql = `
            CREATE TABLE IF NOT EXISTS customers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(100) UNIQUE,
                phone VARCHAR(20),
                address TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        console.log('Creating "customers" table...');
        await connection.query(sql);
        console.log('Table "customers" created successfully!');

        await connection.end();
    } catch (err) {
        console.error('Error during table creation:', err.message);
    }
}

createTable();
