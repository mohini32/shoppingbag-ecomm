const express = require('express');
const router = express.Router();
const { getAllOrders, createOrder, getOrderById,cancelOrder } = require('../controllers/orderController');
const { isLoggedIn } = require('../middleware/authMiddleware');

// Get all orders for user
router.get('/', isLoggedIn, getAllOrders);

// Create new order
router.post('/create', isLoggedIn, createOrder);

// Get specific order by ID
router.get('/:orderId', isLoggedIn, getOrderById);

// TODO: Add these routes when functions are implemented
// router.patch('/:orderId/status', isadmin, updateOrderStatus);
router.patch('/:orderId/cancel', isLoggedIn, cancelOrder);

module.exports = router;