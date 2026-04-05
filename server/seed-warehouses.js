const db = require('./config/db');

const warehouseMapping = [
    {
        name: "Tech & IT Warehouse",
        location: "Zone A - Climate Controlled",
        categories: ["Electronics", "IT Equipment", "Software Licenses"]
    },
    {
        name: "Office & Stationery Warehouse",
        location: "Zone B - North Wing",
        categories: ["Office Supplies", "Stationery", "Books & Educational Materials"]
    },
    {
        name: "Furniture Showroom & Storage",
        location: "Zone C - Ground Floor",
        categories: ["Furniture"]
    },
    {
        name: "Industrial & Hardware Depot",
        location: "Zone D - Heavy Duty",
        categories: ["Tools & Equipment", "Hardware", "Raw Materials", "Spare Parts", "Maintenance Supplies"]
    },
    {
        name: "Food & Kitchen Warehouse",
        location: "Zone E - Cold Storage",
        categories: ["Kitchen Supplies", "Food & Beverages", "Finished Goods"]
    },
    {
        name: "Safety & Medical Vault",
        location: "Zone F - Secured",
        categories: ["Medical Supplies", "Safety Equipment"]
    },
    {
        name: "Logistics & Packaging Center",
        location: "Zone G - Loading Dock",
        categories: ["Packaging Materials", "Vehicles & Transport"]
    },
    {
        name: "General & Miscellaneous Hub",
        location: "Zone H - Central",
        categories: ["Cleaning Supplies", "Consumables", "Clothing & Uniforms", "Outdoor Equipment", "Promotional Items", "Miscellaneous"]
    }
];

async function seedWarehouses() {
    try {
        console.log('Fetching category and product data...');
        const [categories] = await db.query('SELECT id, name FROM categories');
        const categoryMap = {};
        categories.forEach(c => categoryMap[c.name] = c.id);

        console.log('Creating specialized warehouses...');
        for (const w of warehouseMapping) {
            // Insert warehouse
            const [wResult] = await db.query(
                'INSERT IGNORE INTO warehouses (name, location) VALUES (?, ?)',
                [w.name, w.location]
            );

            let warehouseId;
            if (wResult.insertId) {
                warehouseId = wResult.insertId;
            } else {
                const [ws] = await db.query('SELECT id FROM warehouses WHERE name = ?', [w.name]);
                warehouseId = ws[0].id;
            }

            console.log(`Warehouse: ${w.name} (ID: ${warehouseId})`);

            // For each category assigned to this warehouse, move the products
            for (const catName of w.categories) {
                const categoryId = categoryMap[catName];
                if (categoryId) {
                    // Get products in this category
                    const [products] = await db.query('SELECT id, name FROM products WHERE category_id = ?', [categoryId]);
                    
                    for (const product of products) {
                        // 1. Check if product has stock in "Main Warehouse" (ID: 1)
                        const [mainStock] = await db.query('SELECT quantity FROM stock WHERE product_id = ? AND warehouse_id = 1', [product.id]);
                        
                        if (mainStock.length > 0) {
                            const qty = mainStock[0].quantity;
                            
                            // 2. Move stock to new warehouse
                            await db.query('DELETE FROM stock WHERE product_id = ? AND warehouse_id = 1', [product.id]);
                            await db.query(
                                'INSERT INTO stock (product_id, warehouse_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?',
                                [product.id, warehouseId, qty, qty]
                            );

                            // 3. Log the transfer transaction
                            await db.query(
                                'INSERT INTO transactions (product_id, warehouse_id, change_amount, transaction_type) VALUES (?, ?, ?, ?)',
                                [product.id, warehouseId, qty, 'transfer']
                            );
                            
                            console.log(`  Moved ${product.name} to ${w.name}`);
                        }
                    }
                }
            }
        }

        // Optionally remove the now-empty Main Warehouse if desired, 
        // but it's safer to keep it.
        console.log('Finished seeding warehouses and redistributing stock.');
    } catch (err) {
        console.error('Error seeding warehouses:', err.message);
    } finally {
        process.exit();
    }
}

seedWarehouses();
