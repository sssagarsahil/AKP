const express = require('express');
const MenuItem = require('../models/MenuItem');
const router = express.Router();

// GET /api/menu — Get all menu items (with optional filters)
router.get('/', async (req, res) => {
    try {
        const { category, spiceLevel, tag, available } = req.query;
        const filter = {};

        if (category) filter.category = category;
        if (spiceLevel) filter.spiceLevel = spiceLevel;
        if (tag) filter.tags = { $in: [tag] };
        if (available !== undefined) filter.isAvailable = available === 'true';

        const items = await MenuItem.find(filter).sort({ category: 1, name: 1 });

        // Group by category for easier frontend rendering
        const grouped = items.reduce((acc, item) => {
            if (!acc[item.category]) acc[item.category] = [];
            acc[item.category].push(item);
            return acc;
        }, {});

        res.json({ items, grouped, total: items.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/menu/:id — Get single menu item
router.get('/:id', async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Menu item not found' });
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
