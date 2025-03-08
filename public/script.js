// Menu items data
const menuItems = [
    {
        id: 1,
        name: "Classic Burger",
        price: 12.99,
        description: "Juicy beef patty with fresh lettuce, tomatoes, and special sauce",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
    },
    {
        id: 2,
        name: "Margherita Pizza",
        price: 14.99,
        description: "Fresh mozzarella, tomatoes, and basil on crispy crust",
        image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500"
    },
    {
        id: 3,
        name: "Caesar Salad",
        price: 9.99,
        description: "Crisp romaine lettuce, parmesan cheese, and creamy Caesar dressing",
        image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500"
    },
    {
        id: 4,
        name: "Sushi Roll",
        price: 16.99,
        description: "Fresh salmon, avocado, and cucumber wrapped in sushi rice",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500"
    },
    {
        id: 5,
        name: "Pasta Carbonara",
        price: 13.99,
        description: "Creamy pasta with pancetta, egg, and parmesan cheese",
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500"
    },
    {
        id: 6,
        name: "Chicken Tacos",
        price: 11.99,
        description: "Grilled chicken with fresh salsa and guacamole",
        image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=500"
    },
    {
        id: 7,
        name: "Greek Salad",
        price: 10.99,
        description: "Fresh vegetables, olives, and feta cheese with olive oil",
        image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=500"
    },
    {
        id: 8,
        name: "Steak Frites",
        price: 24.99,
        description: "Grilled ribeye steak with crispy french fries",
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500"
    }
];

// Cart state
let cartItems = [];
let isCartOpen = false;

// Initialize Lucide icons
lucide.createIcons();

// Toggle cart sidebar
function toggleCart() {
    isCartOpen = !isCartOpen;
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('overlay');
    
    if (isCartOpen) {
        sidebar.classList.remove('closed');
        sidebar.classList.add('open');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        sidebar.classList.remove('open');
        sidebar.classList.add('closed');
        overlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Update cart count
function updateCartCount() {
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count.toString();
}

// Render menu items
function renderMenuItems() {
    const menuContainer = document.getElementById('menu-items');
    menuContainer.innerHTML = menuItems.map(item => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img 
                src="${item.image}" 
                alt="${item.name}" 
                class="w-full h-48 object-cover"
            />
            <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-lg font-semibold">${item.name}</h3>
                    <span class="text-green-600 font-semibold">$${item.price.toFixed(2)}</span>
                </div>
                <p class="text-gray-600 text-sm mb-4">${item.description}</p>
                <button
                    onclick="addToCart(${item.id})"
                    class="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                    <i data-lucide="plus" class="w-5 h-5"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

// Add item to cart
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    const existingItem = cartItems.find(i => i.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ ...item, quantity: 1 });
    }
    
    renderCart();
    updateCartCount();
    if (!isCartOpen) toggleCart();
}

// Update item quantity
function updateQuantity(itemId, newQuantity) {
    cartItems = cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: parseInt(newQuantity) } : item
    );
    renderCart();
    updateCartCount();
}

// Remove item from cart
function removeItem(itemId) {
    cartItems = cartItems.filter(item => item.id !== itemId);
    renderCart();
    updateCartCount();
}

// Calculate total price
function calculateTotal() {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Render cart
function renderCart() {
    const cartContainer = document.getElementById('cart');
    console.log(cartItems);
    
    if (cartItems.length === 0) {
        cartContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full gap-4 text-gray-500">
                <i data-lucide="shopping-cart" class="w-12 h-12"></i>
                <p class="text-lg">Your cart is empty</p>
            </div>
        `;
    } else {
        cartContainer.innerHTML = `
            <div class="space-y-4">
                ${cartItems.map(item => `
                    <div class="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                        <div class="flex items-center gap-3">
                            <img 
                                src="${item.image}" 
                                alt="${item.name}" 
                                class="w-16 h-16 object-cover rounded"
                            />
                            <div>
                                <h3 class="font-medium">${item.name}</h3>
                                <p class="text-gray-600">$${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <select
                                value="${item.quantity}"
                                onchange="updateQuantity(${item.id}, this.value)"
                                class="border rounded p-1"
                            >
                                ${[1, 2, 3, 4, 5].map(num => `
                                    <option value="${num}" ${item.quantity === num ? 'selected' : ''}>
                                        ${num}
                                    </option>
                                `).join('')}
                            </select>
                            <button
                                onclick="removeItem(${item.id})"
                                class="text-red-500 hover:text-red-700"
                            >
                                <i data-lucide="x" class="w-5 h-5"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
                <div class="flex justify-between items-center mb-4">
                    <span class="font-semibold text-lg">Total:</span>
                    <span class="font-semibold text-green-600 text-lg">$${calculateTotal().toFixed(2)}</span>
                </div>
                <button class="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition-colors font-medium">
                    Proceed to Checkout
                </button>
            </div>
        `;
    }
    lucide.createIcons();
}

// Initialize the page
renderMenuItems();
renderCart();
updateCartCount();