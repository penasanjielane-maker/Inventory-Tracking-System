const db = require('./config/db');

const products = [
    { name: "Smartphone", category: "Electronics", sku: "ELEC-001" },
    { name: "Laptop", category: "Electronics", sku: "ELEC-002" },
    { name: "Bluetooth Speaker", category: "Electronics", sku: "ELEC-003" },
    { name: "Ballpoint Pen", category: "Office Supplies", sku: "OFF-001" },
    { name: "Stapler", category: "Office Supplies", sku: "OFF-002" },
    { name: "A4 Bond Paper", category: "Office Supplies", sku: "OFF-003" },
    { name: "Office Chair", category: "Furniture", sku: "FURN-001" },
    { name: "Office Desk", category: "Furniture", sku: "FURN-002" },
    { name: "Filing Cabinet", category: "Furniture", sku: "FURN-003" },
    { name: "Notebook", category: "Stationery", sku: "STAT-001" },
    { name: "Highlighter Set", category: "Stationery", sku: "STAT-002" },
    { name: "Envelope Pack", category: "Stationery", sku: "STAT-003" },
    { name: "All-Purpose Cleaner", category: "Cleaning Supplies", sku: "CLEAN-001" },
    { name: "Broom", category: "Cleaning Supplies", sku: "CLEAN-002" },
    { name: "Mop", category: "Cleaning Supplies", sku: "CLEAN-003" },
    { name: "Hammer", category: "Tools & Equipment", sku: "TOOL-001" },
    { name: "Screwdriver Set", category: "Tools & Equipment", sku: "TOOL-002" },
    { name: "Electric Drill", category: "Tools & Equipment", sku: "TOOL-003" },
    { name: "Desktop Computer", category: "IT Equipment", sku: "IT-001" },
    { name: "Wi-Fi Router", category: "IT Equipment", sku: "IT-002" },
    { name: "External Hard Drive", category: "IT Equipment", sku: "IT-003" },
    { name: "Cooking Pot", category: "Kitchen Supplies", sku: "KITCH-001" },
    { name: "Frying Pan", category: "Kitchen Supplies", sku: "KITCH-002" },
    { name: "Chef’s Knife", category: "Kitchen Supplies", sku: "KITCH-003" },
    { name: "First Aid Kit", category: "Medical Supplies", sku: "MED-001" },
    { name: "Digital Thermometer", category: "Medical Supplies", sku: "MED-002" },
    { name: "Face Mask", category: "Medical Supplies", sku: "MED-003" },
    { name: "Safety Helmet", category: "Safety Equipment", sku: "SAFE-001" },
    { name: "Safety Goggles", category: "Safety Equipment", sku: "SAFE-002" },
    { name: "Protective Gloves", category: "Safety Equipment", sku: "SAFE-003" },
    { name: "Cardboard Box", category: "Packaging Materials", sku: "PACK-001" },
    { name: "Packing Tape", category: "Packaging Materials", sku: "PACK-002" },
    { name: "Bubble Wrap", category: "Packaging Materials", sku: "PACK-003" },
    { name: "Steel Rod", category: "Raw Materials", sku: "RAW-001" },
    { name: "Plastic Pellets", category: "Raw Materials", sku: "RAW-002" },
    { name: "Bottled Water", category: "Finished Goods", sku: "FIN-001" },
    { name: "Packaged Snacks", category: "Finished Goods", sku: "FIN-002" },
    { name: "Printer Ink Cartridge", category: "Consumables", sku: "CONS-001" },
    { name: "Machine Belt", category: "Spare Parts", sku: "SPARE-001" },
    { name: "Lubricating Oil", category: "Spare Parts", sku: "SPARE-002" },
    { name: "Cleaning Cloth", category: "Maintenance Supplies", sku: "MAINT-001" },
    { name: "AA Batteries", category: "Maintenance Supplies", sku: "MAINT-002" },
    { name: "Printer Paper", category: "Consumables", sku: "CONS-002" },
    { name: "Company Uniform Shirt", category: "Clothing & Uniforms", sku: "CLOTH-001" },
    { name: "Safety Vest", category: "Clothing & Uniforms", sku: "CLOTH-002" },
    { name: "Instant Coffee", category: "Food & Beverages", sku: "FOOD-001" },
    { name: "Canned Tuna", category: "Food & Beverages", sku: "FOOD-002" },
    { name: "Textbook", category: "Books & Educational Materials", sku: "BOOK-001" },
    { name: "Training Manual", category: "Books & Educational Materials", sku: "BOOK-002" },
    { name: "Nails (Box)", category: "Hardware", sku: "HARD-001" },
    { name: "Screw Set", category: "Hardware", sku: "HARD-002" },
    { name: "Operating System License", category: "Software Licenses", sku: "SOFT-001" },
    { name: "Antivirus Software", category: "Software Licenses", sku: "SOFT-002" },
    { name: "Delivery Van", category: "Vehicles & Transport", sku: "VEH-001" },
    { name: "Motorcycle", category: "Vehicles & Transport", sku: "VEH-002" },
    { name: "Lawn Mower", category: "Outdoor Equipment", sku: "OUT-001" },
    { name: "Garden Hose", category: "Outdoor Equipment", sku: "OUT-002" },
    { name: "Branded T-Shirt", category: "Promotional Items", sku: "PROM-001" },
    { name: "Custom Mug", category: "Promotional Items", sku: "PROM-002" },
    { name: "Flashlight", category: "Miscellaneous", sku: "MISC-001" },
    { name: "Extension Cord", category: "Miscellaneous", sku: "MISC-002" }
];

async function seedProducts() {
    try {
        console.log('Fetching category IDs...');
        const [categories] = await db.query('SELECT id, name FROM categories');
        const categoryMap = {};
        categories.forEach(c => {
            categoryMap[c.name] = c.id;
        });

        console.log('Seeding products...');
        for (const product of products) {
            const categoryId = categoryMap[product.category];
            if (!categoryId) {
                console.warn(`Category not found: ${product.category} for product ${product.name}`);
                continue;
            }

            await db.query(
                'INSERT IGNORE INTO products (sku, name, category_id, reorder_level) VALUES (?, ?, ?, ?)',
                [product.sku, product.name, categoryId, 10]
            );
            console.log(`Added/Verified product: ${product.name} [${product.sku}]`);
        }
        console.log('Finished seeding products.');
    } catch (err) {
        console.error('Error seeding products:', err.message);
    } finally {
        process.exit();
    }
}

seedProducts();
