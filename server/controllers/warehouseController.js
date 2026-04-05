const db = require('../config/db');

exports.getAllWarehouses = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM warehouses');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createWarehouse = async (req, res) => {
    try {
        const { name, location } = req.body;
        const [result] = await db.query('INSERT INTO warehouses (name, location) VALUES (?, ?)', [name, location]);
        res.json({ id: result.insertId, name, location });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateWarehouse = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location } = req.body;
        await db.query('UPDATE warehouses SET name = ?, location = ? WHERE id = ?', [name, location, id]);
        res.json({ id, name, location });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteWarehouse = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM warehouses WHERE id = ?', [id]);
        res.json({ message: 'Warehouse deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
