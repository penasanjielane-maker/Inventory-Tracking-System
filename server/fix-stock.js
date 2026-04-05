const db = require('./config/db');

async function fixStock() {
    try {
        console.log('Ensuring a warehouse exists...');
        const [warehouseResult] = await db.query(
            'INSERT IGNORE INTO warehouses (name, location) VALUES (?, ?)',
            ['Main Warehouse', 'Default Location']
        );
        
        let warehouseId;
        if (warehouseResult.insertId) {
            warehouseId = warehouseResult.insertId;
        } else {
            const [warehouses] = await db.query('SELECT id FROM warehouses WHERE name = ?', ['Main Warehouse']);
            warehouseId = warehouses[0].id;
        }
        console.log(`Using warehouse ID: ${warehouseId}`);

        console.log('Fetching all products...');
        const [products] = await db.query('SELECT id, name FROM products');

        console.log(`Updating stock for ${products.length} products...`);
        for (const product of products) {
            const initialQuantity = 20; // Default initial stock

            // Insert or update stock record
            await db.query(
                'INSERT INTO stock (product_id, warehouse_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = ?',
                [product.id, warehouseId, initialQuantity, initialQuantity]
            );

            // Log the transaction
            await db.query(
                'INSERT INTO transactions (product_id, warehouse_id, change_amount, transaction_type) VALUES (?, ?, ?, ?)',
                [product.id, warehouseId, initialQuantity, 'in']
            );
            
            console.log(`Initialized stock for product: ${product.name} (Qty: ${initialQuantity})`);
        }
        console.log('Successfully fixed/initialized stock for all products.');
    } catch (err) {
        console.error('Error fixing stock:', err.message);
    } finally {
        process.exit();
    }
}

fixStock();
