const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    category: { 
        type: String, 
        enum: ['signature-thalis', 'weekend-specials', 'sweet-finales', 'beverages', 'starters'],
        required: true 
    },
    tags: [{ type: String }],          // e.g. ['veg', 'vegan', 'best-seller']
    spiceLevel: { 
        type: String, 
        enum: ['mild', 'medium', 'spicy'], 
        default: 'medium' 
    },
    isAvailable: { type: Boolean, default: true },
    weekendOnly: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
