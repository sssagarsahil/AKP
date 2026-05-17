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
    
    // Attempt to update floating view cart button if it exists
    const viewCartBtn = document.querySelector('button .font-label-md');
    if (viewCartBtn && viewCartBtn.innerText.includes('View Cart')) {
        viewCartBtn.innerText = `View Cart (${totalItems})`;
    }
}

// Initialize icon on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartIcon();
});
