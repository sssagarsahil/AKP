require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const MenuItem = require('./models/MenuItem');

const menuItems = [
    // ===== Signature Thalis =====
    {
        name: 'Royal Heritage Thali',
        price: 450,
        description: 'A curated journey through 12 traditional regional specialties, including hand-churned butter, slow-cooked lentils, and heritage grains.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAT-m5A2AMcJP8Kv01sQqw4IaFqYGnHO_m1lAm2zSxl91MDd1XLW4qKIjbJFSvh5-BfH1j6wGcylhXKs3UUeVLb6eAhDAV8vBw56xnz8nWQI1VlFTCYz-GkpEXXENhWvNjniDHHnwpCVZZdJpfGdpOcOWxU8UhfIgJVZEiZ18YSowE4aNYBMV0e9Wfq9uHHW-2AyoF3SoMUNS-JKFJmHOLvUqmWzBvMjTQpcn3U4bsOqIHPmRQqCpwQrCdpPvGCUFi6HRKf7lTA',
        category: 'signature-thalis',
        tags: ['veg', 'best-seller'],
        spiceLevel: 'medium',
    },
    {
        name: 'Daily Meal Thali',
        price: 250,
        description: 'A balanced daily special thali featuring chef\'s choice vegetable curry, comforting dal, fragrant steamed rice, 2 hot rotis, and cooling raita.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwWde4oSbOdaUBR_nYzgy5jxb6GH-FFS-pS9Q94SA-nfttbR0bkDroG21mJQHXz7XGu04H7zJPQKsklv9ILJe4UB2yENF3fwwCVwJ2wINZ8prDeaK0L7kRZtbNl0_9_vIK6mQiMgwyDa75jo0l07-_2rVZrUnKRkPmHZ7uxhMLeZX7xPtuG61kMMqt1VlRMHzt308VnGn5S0Sq3HxAj0YT0RUPbpowxHivSmhg0wfm4gCkW8tvfQTHpBzHMW7Oooa5olWfsiIjSg',
        category: 'signature-thalis',
        tags: ['veg'],
        spiceLevel: 'mild',
    },
    {
        name: 'Punjabi Thali',
        price: 320,
        description: 'A rich northern feast consisting of Matar Paneer, 2 Butter Parathas, smoky Dal Tadka, fragrant Jeera Rice, crisp Salad, Achar, crunchy Papad, and Sweet Lassi or Chaas.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQjvd4sPdfblsW14FW2LQd1AocpEKKqyDiCwjqb_aQ6wVfGW3vp2sFv9bZ_Xol3_9UwX3VB8OjfOqW5qcVBHqZu9JIr5Ej0DhCDaJ0CblqJPJ4A6JYX27W8l92VdvGRsLBBGXlC-Q14oJd1hN3HpfB-OvFAhvfUTZ12E1W4fA03hbJhLPTMrMO3bMrwPyM59Fn1YdN9EPw0J2PqQ3lAmpMYB7vXm_F7gIWHq9q7L8w3R7NlWiPqh1HllDJ_WqKjjT9bvhc48s1w',
        category: 'signature-thalis',
        tags: ['veg'],
        spiceLevel: 'medium',
    },
    {
        name: 'South Coast Platter',
        price: 390,
        description: 'Coconut-infused seasonal vegetables served on a traditional banana leaf with red rice and tempered buttermilk.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvvSUKz1tnb5InWLd_32_D-8y1h3AHMqaS9C-BW5-1FH98rZoQZVXQTiHKfU8cHDN1J9jIZwAyWJYPE8fC2EcHEKWoUbJlNIpf8RkFGFDpnRDaHZHVuGqpWbT3f0Bsc6LkECHrFRXXJ5iYqwBh7WnSJQEhpwYkBYQ0G1BG3SZXDhvVqjzBL--xJM0OiNT7tMBthU7y1xI-kY9_5KU9-VEI2sBQXEr-Cf6XcC73lgE2I7HQLBxkqDW8NcLkf1uJvCM8T0N0AYPQ',
        category: 'signature-thalis',
        tags: ['veg'],
        spiceLevel: 'mild',
    },
    // ===== Weekend Specials =====
    {
        name: 'Mutton Rassa Thali',
        price: 520,
        description: 'Slow-cooked heritage mutton with Kolhapuri masala, served with fresh bhakri and solkadhi.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQjvd4sPdfblsW14FW2LQd1AocpEKKqyDiCwjqb_aQ6wVfGW3vp2sFv9bZ_Xol3_9UwX3VB8OjfOqW5qcVBHqZu9JIr5Ej0DhCDaJ0CblqJPJ4A6JYX27W8l92VdvGRsLBBGXlC-Q14oJd1hN3HpfB-OvFAhvfUTZ12E1W4fA03hbJhLPTMrMO3bMrwPyM59Fn1YdN9EPw0J2PqQ3lAmpMYB7vXm_F7gIWHq9q7L8w3R7NlWiPqh1HllDJ_WqKjjT9bvhc48s1w',
        category: 'weekend-specials',
        tags: ['non-veg', 'weekend-only'],
        spiceLevel: 'spicy',
        weekendOnly: true,
    },
    {
        name: 'Puran Poli Festival Combo',
        price: 280,
        description: 'Sweet chana dal filled flatbread served with tuppa ghee, aamras, and batata bhaji.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD00kU8GtJlT0bGuSgpvsyHSygnFJE0THxmNTmVcQrH0za4O8E1JLDDqdzaWNy3HEr1c_Mla9Tjgj6XNkaTkiwdDQg3gUYor-eeVZmgQ-T8Z1xXTMfM8Y4z5MdInTWr_XMJvY5h4jG-Rv-pIn7muS1XfpYFN1e-cpwBs4XIj6fTv-RL9kYsTxgr0ntJvW-gAt6m1eO08yZh6rb1ecqLopRImwIxHE93OR2kqZi7JOfrCfPXxtlgfGQ1oUIZI3lhKLBYjsR-AE3kvA',
        category: 'weekend-specials',
        tags: ['veg', 'sweet'],
        spiceLevel: 'mild',
        weekendOnly: true,
    },
    {
        name: 'Bharli Vangi Special',
        price: 340,
        description: 'Stuffed baby eggplants in a peanut-coconut gravy, a signature Maharashtrian delicacy.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIgRLe5JJtcEYK2y7uAhPCRJqWr4ztzi6DjeVwmzNYvKJfgJRg1hooWbyv-EIbFn5a32QbCWAVuhFkqd6jVzXjKnuAURBnXxynA9Adtg3u3-he1_mr7sxJ3I6zbYzwd2pn2ORNn47hXPBu5X7HgsccZlnQAGrLeWbJR2PDaozFbTJbaOI5NghKF-3m2yjuH2HA1XiaFWzIUuIwfhXuUKeX8LKYwAR2x4EK4V0ob3V3WZIK65BUsoLNvWS9C_pQDToyS4JUhevuGg',
        category: 'weekend-specials',
        tags: ['veg'],
        spiceLevel: 'spicy',
        weekendOnly: true,
    },
    // ===== Sweet Finales =====
    {
        name: 'Saffron Gulab Jamun',
        price: 140,
        description: 'Soft milk-solid dumplings soaked in saffron-infused sugar syrup, garnished with pistachios.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMpSz4sVhdnfVnijVnb3Bx4IaqVBJBHPl25eUd-q5bDMILJxFyJLPzjMZ-KMxAPzFRbK-QLfA7J0ydmAcr14gswDaYFKTwN0T3pafGfb-EIuAJeRGxKE7i_Hik2WT27ppyxXs0b9rH0x-M95Bd3SZX0JKLFSvOiO0n1U4V2gHf6gO8F2v-ZX8gF0N1l6Qm2Hh1_1HLJIiLN4e3Jgmh8BERCk-DlkCM3SvANxdLKa_bF8TIX7g_9bIiUvfz9oE8g17IFiWCfKdw',
        category: 'sweet-finales',
        tags: ['veg', 'sweet'],
        spiceLevel: 'mild',
    },
    {
        name: 'Alphonso Mango Lassi',
        price: 120,
        description: 'Creamy yogurt blended with Ratnagiri Alphonso pulp, topped with cardamom.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrxXcz8KR5pHZlneCOqq69C3VHDuYzfQ4kMVbclvSYi81_sNJahTBYzDXcv0OLz0PH3oU5qRLCAYmH-39JJD3K_Tvu3qpMCCR5m9UyHiNIcPzjC3qFgkSbbT88S9F9HN0MnCa5q3EI1aZYh0kNMKm3DSSJ2DP-sN5J6LN3FoXIbCDtqM6meSCRbbQhgBrLuaR6rbJSmXnZnGV_n3l7HJKzAHk2f5FijO1OTvVhWbnW-g7X8Sb2g8iNPNBN7RnhY8Xs_3PNaNnAg',
        category: 'sweet-finales',
        tags: ['veg'],
        spiceLevel: 'mild',
    },
    {
        name: 'Cardamom Rice Kheer',
        price: 160,
        description: 'Slow-simmered rice pudding with cardamom, saffron, and roasted almonds.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCt-G5mT0BRVlbLH1XPH3k4lxe2UpgPlYlNFhfA3UAWB5v-gLblgj6G-UHFRlJcDUmevVDjI9vNdNTLkPGdPdnGRWsXkdAWJxnW4Nz-8o-nF6nJlX_eVs-DfZY3LTwFjsibNSq04ySWPSqKTMNv4oH5nNl9h0oXuwgVj_76P_ZfJIHp9c_hTYMDp54ypNjLZCXGI_qHJYvA9VZKq8xdlJ__tJOHEZhSXR3ZIswNJ7K8WuBX6Xpw7i-pLGaH4TfEwNlq3E4fJdPA',
        category: 'sweet-finales',
        tags: ['veg', 'sweet'],
        spiceLevel: 'mild',
    },
    {
        name: 'Artisanal Malai Kulfi',
        price: 130,
        description: 'Traditional frozen dessert with reduced milk, saffron strands, and chopped pistachios.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-NAfKC4Y9r96Cok7z4x5Tv-NXjLZCvDOiw_Z9HRSfWYR8g0OPFNnQGxpA9h8i5PoD9r0lzHrh31_-0j7mxXJdpqbTFwsW3zx3UgZK_ZSFqvmUQn1t1IIk2k1IleBi9VCt5x8sSJojVchj-vZOOiLhsnf2xhpL2eMYwDYl3p8x7nMnQ0K0F2m_JNJgT_XBruwPwIK1V78L-4JUJhLJrB2U-cjRjB3eMSFj2h8I_wdIxQ-jfNoxDp3Jt-CLAI2G4VFzHUVT9kPA',
        category: 'sweet-finales',
        tags: ['veg', 'sweet'],
        spiceLevel: 'mild',
    },
    {
        name: 'Ukadiche Modak',
        price: 150,
        description: 'Traditional steamed sweet dumplings stuffed with freshly grated coconut and jaggery, drizzled with warm Sajuk Toop (ghee).',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD00kU8GtJlT0bGuSgpvsyHSygnFJE0THxmNTmVcQrH0za4O8E1JLDDqdzaWNy3HEr1c_Mla9Tjgj6XNkaTkiwdDQg3gUYor-eeVZmgQ-T8Z1xXTMfM8Y4z5MdInTWr_XMJvY5h4jG-Rv-pIn7muS1XfpYFN1e-cpwBs4XIj6fTv-RL9kYsTxgr0ntJvW-gAt6m1eO08yZh6rb1ecqLopRImwIxHE93OR2kqZi7JOfrCfPXxtlgfGQ1oUIZI3lhKLBYjsR-AE3kvA',
        category: 'sweet-finales',
        tags: ['veg', 'sweet'],
        spiceLevel: 'mild',
    },
    // ===== Beverages =====
    {
        name: 'Masala Chai',
        price: 60,
        description: 'Hand-pounded ginger and cardamom brewed with Assam tea leaves and full-cream milk.',
        image: '',
        category: 'beverages',
        tags: ['veg'],
        spiceLevel: 'medium',
    },
    {
        name: 'Solkadhi',
        price: 80,
        description: 'Refreshing coconut milk drink with kokum, garlic, and cumin — the perfect digestive.',
        image: '',
        category: 'beverages',
        tags: ['veg', 'healthy'],
        spiceLevel: 'mild',
    },
];

async function seed() {
    try {
        await connectDB();

        // Clear existing items
        await MenuItem.deleteMany({});
        console.log('🗑️  Cleared existing menu items');

        // Insert new menu items
        const result = await MenuItem.insertMany(menuItems);
        console.log(`🌱 Seeded ${result.length} menu items into MongoDB`);

        // Print summary
        const categories = {};
        result.forEach(item => {
            categories[item.category] = (categories[item.category] || 0) + 1;
        });
        console.log('\n📋 Menu Summary:');
        Object.entries(categories).forEach(([cat, count]) => {
            console.log(`   ${cat}: ${count} items`);
        });

        // ----------------------------------------------------
        // SEED DUMMY TRANSACTIONS & ORDERS FOR AUDIT TESTING
        // ----------------------------------------------------
        const Order = require('./models/Order');
        const Transaction = require('./models/Transaction');

        await Order.deleteMany({});
        await Transaction.deleteMany({});
        console.log('🗑️  Cleared existing orders and transactions');

        const dummyOrders = [
            {
                orderNumber: 'AKP-58291',
                items: [{ name: 'Royal Heritage Thali', price: 450, quantity: 2 }],
                itemTotal: 900,
                tax: 45,
                totalAmount: 945,
                status: 'delivered',
                paymentMethod: 'upi'
            },
            {
                orderNumber: 'AKP-19432',
                items: [{ name: 'Mutton Rassa Thali', price: 520, quantity: 1 }],
                itemTotal: 520,
                tax: 26,
                totalAmount: 546,
                status: 'placed',
                paymentMethod: 'card'
            }
        ];

        for (const o of dummyOrders) {
            const order = new Order(o);
            await order.save();

            const txn = new Transaction({
                orderNumber: order.orderNumber,
                amount: order.totalAmount,
                type: 'order_placed',
                paymentMethod: order.paymentMethod,
                status: 'success',
                auditDetails: 'Dummy transaction for API testing'
            });
            await txn.save();
        }
        console.log(`🌱 Seeded ${dummyOrders.length} dummy orders and transactions for audit testing`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Seed failed:', error.message);
        process.exit(1);
    }
}

seed();
