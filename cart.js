// cart.js
// Shared cart logic for Akshaypatra prototype

const CART_KEY = 'akshaypatra_cart';

function getCart() {
    const cartStr = localStorage.getItem(CART_KEY);
    return cartStr ? JSON.parse(cartStr) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(item) {
    const cart = getCart();
    
    // Check if item already exists
    const existingItem = cart.find(i => i.name === item.name);
    if (existingItem) {
        existingItem.quantity += item.quantity || 1;
    } else {
        item.quantity = item.quantity || 1;
        cart.push(item);
    }
    
    saveCart(cart);
    updateCartIcon();
}

function removeFromCart(itemName) {
    let cart = getCart();
    cart = cart.filter(i => i.name !== itemName);
    saveCart(cart);
    updateCartIcon();
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateCartIcon();
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCartIcon() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // 1. Attempt to update floating view cart button if it exists
    const viewCartBtn = document.querySelector('button .font-label-md');
    if (viewCartBtn && viewCartBtn.innerText.includes('View Cart')) {
        viewCartBtn.innerText = `View Cart (${totalItems})`;
    }

    // 2. Update Mobile Cart Badge in Header (if it exists)
    const mobileCartBadge = document.getElementById('mobile-cart-badge');
    if (mobileCartBadge) {
        mobileCartBadge.innerText = totalItems;
        if (totalItems > 0) {
            mobileCartBadge.classList.remove('hidden');
        } else {
            mobileCartBadge.classList.add('hidden');
        }
    }

    // 3. Update Mobile Floating View Cart Bar (if it exists)
    const mobileFloatingCart = document.getElementById('mobile-floating-cart-bar');
    if (mobileFloatingCart) {
        if (totalItems > 0) {
            mobileFloatingCart.classList.remove('hidden');
            
            // Update items count
            const countBadge = mobileFloatingCart.querySelector('.cart-count-badge');
            if (countBadge) countBadge.innerText = totalItems;
            
            // Update count text
            const countText = mobileFloatingCart.querySelector('.cart-count-text');
            if (countText) countText.innerText = `${totalItems} Item${totalItems > 1 ? 's' : ''} Added`;
            
            // Update price text
            const priceText = mobileFloatingCart.querySelector('.cart-price-text');
            if (priceText) priceText.innerText = `₹${totalPrice.toFixed(2)} plus taxes`;
        } else {
            mobileFloatingCart.classList.add('hidden');
        }
    }
}

// Initialize icon on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartIcon();
});
