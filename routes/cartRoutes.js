const express = require('express');
const cartController = require('../controllers/cartController');
const { isLoggedIn } = require('../middleware/authMiddleware');
const router = express.Router();

// Get cart items with product details
router.get('/', isLoggedIn, cartController.getCart);

// Add item to cart
router.post('/add', isLoggedIn, cartController.addToCart);

// Update cart item quantity
router.put('/update/:cartItemId', isLoggedIn, cartController.updateCartItem);

// Remove item from cart
router.delete('/remove/:cartItemId', isLoggedIn, cartController.removeFromCart);

// Clear entire cart
router.delete('/clear', isLoggedIn, cartController.clearCart);

module.exports = router;