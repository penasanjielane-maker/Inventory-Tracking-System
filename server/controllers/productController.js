const db = require('../config/db');

exports.getAllProducts = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT p.*, c.name as category_name, sup.name as supplier_name, SUM(s.quantity) as total_quantity
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN suppliers sup ON p.supplier_id = sup.id
            LEFT JOIN stock s ON p.id = s.product_id
            GROUP BY p.id
            ORDER BY p.id ASC
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { sku, name, category_id, supplier_id, reorder_level } = req.body;
        const [result] = await db.query(
            'INSERT INTO products (sku, name, category_id, supplier_id, reorder_level) VALUES (?, ?, ?, ?, ?)',
            [sku, name, category_id || null, supplier_id || null, reorder_level]
        );
        res.json({ id: result.insertId, sku, name, category_id: category_id || null, supplier_id: supplier_id || null, reorder_level });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { sku, name, category_id, supplier_id, reorder_level } = req.body;
        await db.query(
            'UPDATE products SET sku = ?, name = ?, category_id = ?, supplier_id = ?, reorder_level = ? WHERE id = ?',
            [sku, name, category_id || null, supplier_id || null, reorder_level, id]
        );
        res.json({ id, sku, name, category_id: category_id || null, supplier_id: supplier_id || null, reorder_level });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM products WHERE id = ?', [id]);
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
