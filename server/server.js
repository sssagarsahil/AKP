require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const transactionRoutes = require('./routes/transactions');

const app = express();
const PORT = process.env.PORT || 8082;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/transactions', transactionRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Akshaypatra API is running 🍛', timestamp: new Date() });
});

// Serve static frontend files from the parent AKP directory
app.use(express.static(path.join(__dirname, '..')));

// Fallback — serve project index
app.get('/', (req, res) => {
    // Serve the expanded web menu as the landing page for every visitor
    res.sendFile(path.join(__dirname, '..', 'akshaypatra_web_menu_expanded', 'code.html'));
});

app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════╗
║   🍛 Akshaypatra Server Running         ║
║                                          ║
║   Local:  http://127.0.0.1:${PORT}         ║
║   API:    http://127.0.0.1:${PORT}/api     ║
║   Health: http://127.0.0.1:${PORT}/api/health ║
╚══════════════════════════════════════════╝
    `);
});
