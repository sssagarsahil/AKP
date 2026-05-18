const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: { 
        type: String, 
        unique: true, 
        default: () => 'AKP-' + Math.floor(10000 + Math.random() * 90000) 
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    items: [{
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        image: { type: String, default: '' }
    }],
    itemTotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 0 },
    tax: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    loyaltyPointsEarned: { type: Number, default: 0 },
    status: { 
        type: String, 
        enum: ['placed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'],
        default: 'placed'
    },
    deliveryAddress: {
        name: { type: String, default: '' },
        address: { type: String, default: '' },
        phone: { type: String, default: '' }
    },
    paymentMethod: { 
        type: String, 
        enum: ['upi', 'card', 'cod'],
        default: 'upi'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    transactionId: { type: String, default: '' },
    estimatedDelivery: { type: String, default: '35-45 min' },
    scheduledDate: { type: String, default: '' },
    scheduledTime: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
