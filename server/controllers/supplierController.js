const db = require('../config/db');

exports.getAllSuppliers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM suppliers');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createSupplier = async (req, res) => {
    try {
        const { name, contact_name, email, phone, address } = req.body;
        const [result] = await db.query(
            'INSERT INTO suppliers (name, contact_name, email, phone, address) VALUES (?, ?, ?, ?, ?)',
            [name, contact_name, email, phone, address]
        );
        res.json({ id: result.insertId, name, contact_name, email, phone, address });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, contact_name, email, phone, address } = req.body;
        await db.query(
            'UPDATE suppliers SET name = ?, contact_name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
            [name, contact_name, email, phone, address, id]
        );
        res.json({ id, name, contact_name, email, phone, address });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM suppliers WHERE id = ?', [id]);
        res.json({ message: 'Supplier deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
