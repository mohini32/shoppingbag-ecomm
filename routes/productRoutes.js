const express = require('express');
const router = express.Router();
const { getAllProducts, createProducts, updateProduct, deleteProduct,getProductById } = require('../controllers/productController');
const { isadmin, isLoggedIn } = require('../middleware/authMiddleware');
const { createMulter } = require('../middleware/upload');
const { validateCreateProduct, validateUpdateProduct, validatePagination } = require('../middleware/validation');

// Public routes
router.get('/', validatePagination, getAllProducts); // Remove isLoggedIn for public access
router.get('/:id', getProductById); // Remove isLoggedIn for public access

// Admin routes - require admin access
router.post('/create', isadmin, createMulter('products').array('image', 1), createProducts);
router.put('/:id', isadmin, createMulter('products').array('image', 1), updateProduct);
router.delete('/:id', isadmin, deleteProduct);

module.exports = router;