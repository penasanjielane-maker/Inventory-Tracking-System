const db = require('./config/db');

const supplierMapping = [
    {
        name: "Tech Solutions Inc.",
        contact: "John Tech",
        email: "contact@techsolutions.com",
        categories: ["Electronics", "IT Equipment", "Software Licenses"]
    },
    {
        name: "Global Office Supplies",
        contact: "Sarah Office",
        email: "sales@globaloffice.com",
        categories: ["Office Supplies", "Stationery", "Books & Educational Materials"]
    },
    {
        name: "Modern Living Furniture",
        contact: "Mike Wood",
        email: "info@modernliving.com",
        categories: ["Furniture"]
    },
    {
        name: "Hygiene & Maintenance Pro",
        contact: "Clean Team",
        email: "support@hygienepro.com",
        categories: ["Cleaning Supplies", "Maintenance Supplies", "Consumables"]
    },
    {
        name: "Industrial Tools & Hardware",
        contact: "Iron Mike",
        email: "orders@industrialtools.com",
        categories: ["Tools & Equipment", "Hardware", "Outdoor Equipment"]
    },
    {
        name: "Gourmet & General Goods",
        contact: "Chef G",
        email: "supply@gourmetgoods.com",
        categories: ["Kitchen Supplies", "Food & Beverages", "Finished Goods"]
    },
    {
        name: "Health & Safety First",
        contact: "Dr. Safe",
        email: "safety@healthfirst.com",
        categories: ["Medical Supplies", "Safety Equipment"]
    },
    {
        name: "Global Logistics & Raw Materials",
        contact: "Logistics Pro",
        email: "raw@globallogistics.com",
        categories: ["Packaging Materials", "Raw Materials"]
    },
    {
        name: "Precision Parts Co.",
        contact: "Gear Head",
        email: "parts@precisionparts.com",
        categories: ["Spare Parts"]
    },
    {
        name: "Style & Brand Co.",
        contact: "Logo Larry",
        email: "branding@styleandbrand.com",
        categories: ["Clothing & Uniforms", "Promotional Items"]
    },
    {
        name: "Auto & Transport Solutions",
        contact: "Van Vin",
        email: "fleet@autosolutions.com",
        categories: ["Vehicles & Transport"]
    },
    {
        name: "General Trading Co.",
        contact: "Trade Tom",
        email: "misc@generaltrading.com",
        categories: ["Miscellaneous"]
    }
];

async function seedSuppliers() {
    try {
        console.log('Fetching category IDs...');
        const [categories] = await db.query('SELECT id, name FROM categories');
        const categoryMap = {};
        categories.forEach(c => categoryMap[c.name] = c.id);

        console.log('Seeding suppliers and updating products...');
        for (const s of supplierMapping) {
            // Insert supplier
            const [supResult] = await db.query(
                'INSERT IGNORE INTO suppliers (name, contact_name, email) VALUES (?, ?, ?)',
                [s.name, s.contact, s.email]
            );

            let supplierId;
            if (supResult.insertId) {
                supplierId = supResult.insertId;
            } else {
                const [sups] = await db.query('SELECT id FROM suppliers WHERE name = ?', [s.name]);
                supplierId = sups[0].id;
            }

            console.log(`Supplier: ${s.name} (ID: ${supplierId})`);

            // Update products for this supplier based on categories
            for (const catName of s.categories) {
                const categoryId = categoryMap[catName];
                if (categoryId) {
                    await db.query(
                        'UPDATE products SET supplier_id = ? WHERE category_id = ?',
                        [supplierId, categoryId]
                    );
                    console.log(`  Linked products in category "${catName}" to ${s.name}`);
                }
            }
        }
        console.log('Finished seeding suppliers and linking products.');
    } catch (err) {
        console.error('Error seeding suppliers:', err.message);
    } finally {
        process.exit();
    }
}

seedSuppliers();
