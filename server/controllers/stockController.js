const db = require('../config/db');

exports.getStockByProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const [rows] = await db.query(`
            SELECT s.*, w.name as warehouse_name
            FROM stock s
            JOIN warehouses w ON s.warehouse_id = w.id
            WHERE s.product_id = ?
        `, [productId]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateStock = async (req, res) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        let { product_id, warehouse_id, change_amount, transaction_type } = req.body;
        
        // Ensure numbers are treated as numbers
        change_amount = parseInt(change_amount);
        product_id = parseInt(product_id);
        warehouse_id = parseInt(warehouse_id);

        // Adjust amount based on type
        let adjustedAmount = change_amount;
        if (transaction_type === 'out') {
            adjustedAmount = -Math.abs(change_amount);
        } else if (transaction_type === 'in') {
            adjustedAmount = Math.abs(change_amount);
        }

        // Check if stock record exists
        const [existing] = await connection.query(
            'SELECT quantity FROM stock WHERE product_id = ? AND warehouse_id = ?',
            [product_id, warehouse_id]
        );

        let newQuantity = adjustedAmount;
        if (existing.length > 0) {
            newQuantity = existing[0].quantity + adjustedAmount;
            await connection.query(
                'UPDATE stock SET quantity = ? WHERE product_id = ? AND warehouse_id = ?',
                [newQuantity, product_id, warehouse_id]
            );
        } else {
            await connection.query(
                'INSERT INTO stock (product_id, warehouse_id, quantity) VALUES (?, ?, ?)',
                [product_id, warehouse_id, newQuantity]
            );
        }

        // Log transaction with the adjusted amount
        await connection.query(
            'INSERT INTO transactions (product_id, warehouse_id, change_amount, transaction_type) VALUES (?, ?, ?, ?)',
            [product_id, warehouse_id, adjustedAmount, transaction_type]
        );

        await connection.commit();
        res.json({ message: 'Stock updated and transaction logged', newQuantity });
    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        connection.release();
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT t.*, p.name as product_name, w.name as warehouse_name
            FROM transactions t
            JOIN products p ON t.product_id = p.id
            JOIN warehouses w ON t.warehouse_id = w.id
            ORDER BY t.created_at DESC
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
