const db = require('./config/db');

const categories = [
    "Electronics",
    "Office Supplies",
    "Furniture",
    "Stationery",
    "Cleaning Supplies",
    "Tools & Equipment",
    "IT Equipment",
    "Kitchen Supplies",
    "Medical Supplies",
    "Safety Equipment",
    "Packaging Materials",
    "Raw Materials",
    "Finished Goods",
    "Spare Parts",
    "Maintenance Supplies",
    "Consumables",
    "Clothing & Uniforms",
    "Food & Beverages",
    "Books & Educational Materials",
    "Hardware",
    "Software Licenses",
    "Vehicles & Transport",
    "Outdoor Equipment",
    "Promotional Items",
    "Miscellaneous"
];

async function seedCategories() {
    try {
        console.log('Seeding categories...');
        for (const category of categories) {
            await db.query('INSERT IGNORE INTO categories (name, description) VALUES (?, ?)', [category, `${category} category`]);
            console.log(`Added/Verified category: ${category}`);
        }
        console.log('Finished seeding categories.');
    } catch (err) {
        console.error('Error seeding categories:', err.message);
    } finally {
        process.exit();
    }
}

seedCategories();
