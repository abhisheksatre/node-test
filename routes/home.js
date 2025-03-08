const express = require('express');
const router = express.Router();

// Sample data (replace with database in real project)
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

router.get('/', (req, res) => {
    res.render('home', { menuItems, cart: [] });
});

module.exports = router;