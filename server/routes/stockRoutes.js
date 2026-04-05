const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

router.get('/product/:productId', stockController.getStockByProduct);
router.post('/update', stockController.updateStock);
router.get('/transactions', stockController.getTransactions);

module.exports = router;
