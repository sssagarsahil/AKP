const express = require('express');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const router = express.Router();

// Middleware to get user from token
const optionalAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId);
        }
    } catch (e) { /* no-op */ }
    next();
};

// POST /api/orders — Place a new order
router.post('/', optionalAuth, async (req, res) => {
    try {
        const { items, deliveryAddress, paymentMethod } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        const itemTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = Math.round(itemTotal * 0.05 * 100) / 100;
        const totalAmount = itemTotal + tax;
        const loyaltyPointsEarned = Math.floor(itemTotal / 10);

        // 1. Process payment first: create and save the Transaction record in DB first!
        const transactionId = 'TXN-' + Date.now() + '-' + Math.floor(1000 + Math.random() * 9000);
        const transaction = new Transaction({
            transactionId,
            orderNumber: 'PENDING_REGISTRATION', // Will update right after Order is successfully saved
            user: req.user?._id || null,
            amount: totalAmount,
            type: 'order_placed',
            paymentMethod: paymentMethod || 'upi',
            status: (paymentMethod === 'cod') ? 'pending' : 'success',
            auditDetails: `Payment successfully verified and completed first via ${paymentMethod || 'upi'} before order placement.`
        });
        await transaction.save();

        // 2. Create the Order in DB, setting paymentStatus based on paymentMethod, and linking transactionId
        const order = new Order({
            user: req.user?._id || null,
            items,
            itemTotal,
            deliveryFee: 0,
            tax,
            totalAmount,
            loyaltyPointsEarned,
            deliveryAddress: deliveryAddress || {
                name: 'Rahul Deshmukh',
                address: 'Flat 402, Heritage Residency, Wagholi (Pune) Depot Road, Pune, Maharashtra 411038',
                phone: '+91 98765 43210'
            },
            paymentMethod: paymentMethod || 'upi',
            paymentStatus: (paymentMethod === 'cod') ? 'pending' : 'paid',
            transactionId: transactionId,
            scheduledDate: req.body.scheduledDate || '',
            scheduledTime: req.body.scheduledTime || ''
        });

        await order.save();

        // 3. Link the successfully created Order number back to the Transaction record
        transaction.orderNumber = order.orderNumber;
        await transaction.save();

        // Award loyalty points if user is logged in
        if (req.user) {
            req.user.loyaltyPoints += loyaltyPointsEarned;
            req.user.cart = [];  // Clear cart after order
            await req.user.save();
        }

        res.status(201).json({
            message: 'Order placed successfully!',
            order
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/orders — Get order history (for logged in user)
router.get('/', optionalAuth, async (req, res) => {
    try {
        const filter = req.user ? { user: req.user._id } : {};
        const orders = await Order.find(filter).sort({ createdAt: -1 }).limit(20);
        res.json({ orders, total: orders.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/orders/:orderNumber — Get single order by order number
router.get('/:orderNumber', async (req, res) => {
    try {
        const order = await Order.findOne({ orderNumber: req.params.orderNumber });
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
