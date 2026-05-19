const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

// GET /api/transactions — Get all transactions (Audit Log)
router.get('/', async (req, res) => {
    try {
        const filter = {};
        if (req.query.orderNumber) {
            filter.orderNumber = req.query.orderNumber;
        }
        if (req.query.type) {
            filter.type = req.query.type;
        }

        const transactions = await Transaction.find(filter).sort({ createdAt: -1 });
        res.json({ transactions, total: transactions.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/transactions/:id — Get single transaction by ID
router.get('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
