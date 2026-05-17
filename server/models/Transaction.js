const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transactionId: { type: String, required: true, unique: true },
    orderNumber: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    amount: { type: Number, required: true },
    type: { 
        type: String, 
        enum: ['order_placed', 'refund', 'adjustment'], 
        default: 'order_placed' 
    },
    paymentMethod: { type: String },
    status: { 
        type: String, 
        enum: ['success', 'failed', 'pending'], 
        default: 'success' 
    },
    auditDetails: { type: String, default: '' }
}, { timestamps: true });

// Auto-generate transaction ID before saving
transactionSchema.pre('save', function(next) {
    if (!this.transactionId) {
        this.transactionId = 'TXN-' + Date.now() + '-' + Math.floor(1000 + Math.random() * 9000);
    }
    next();
});

module.exports = mongoose.model('Transaction', transactionSchema);
