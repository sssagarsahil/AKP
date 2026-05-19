const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String, default: '' },
    addresses: [{
        label: { type: String, default: 'Home' },     // Home, Office, etc.
        address: { type: String, required: true },
        isDefault: { type: Boolean, default: false }
    }],
    loyaltyPoints: { type: Number, default: 0 },
    memberSince: { type: Date, default: Date.now },
    cart: [{
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
        name: { type: String },
        price: { type: Number },
        quantity: { type: Number, default: 1 },
        image: { type: String, default: '' },
        desc: { type: String, default: '' }
    }]
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
