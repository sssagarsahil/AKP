const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Middleware to get user from token (optional auth — works without login too)
const optionalAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId);
        }
    } catch (e) { /* no-op, user stays null */ }
    next();
};

// GET /api/cart — Get cart items
router.get('/', optionalAuth, async (req, res) => {
    try {
        if (req.user) {
            res.json({ cart: req.user.cart, source: 'database' });
        } else {
            // If not logged in, return empty — frontend uses localStorage fallback
            res.json({ cart: [], source: 'localStorage' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/cart/add — Add item to cart
router.post('/add', optionalAuth, async (req, res) => {
    try {
        const { name, price, quantity, image, desc } = req.body;

        if (!req.user) {
            return res.json({ message: 'Use localStorage', source: 'localStorage' });
        }

        // Check if item already in cart
        const existingIdx = req.user.cart.findIndex(i => i.name === name);
        if (existingIdx >= 0) {
            req.user.cart[existingIdx].quantity += quantity || 1;
        } else {
            req.user.cart.push({ name, price, quantity: quantity || 1, image, desc });
        }

        await req.user.save();
        res.json({ cart: req.user.cart, message: 'Item added to cart' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/cart/:itemName — Remove item from cart
router.delete('/:itemName', optionalAuth, async (req, res) => {
    try {
        if (!req.user) return res.json({ message: 'Use localStorage' });

        req.user.cart = req.user.cart.filter(i => i.name !== req.params.itemName);
        await req.user.save();
        res.json({ cart: req.user.cart, message: 'Item removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/cart — Clear entire cart
router.delete('/', optionalAuth, async (req, res) => {
    try {
        if (!req.user) return res.json({ message: 'Use localStorage' });

        req.user.cart = [];
        await req.user.save();
        res.json({ cart: [], message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
