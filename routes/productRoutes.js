const express = require('express');
const router = express.Router();
const { getAllProducts, createProducts, updateProduct, deleteProduct,getProductById } = require('../controllers/productController');
const { isadmin, isLoggedIn } = require('../middleware/authMiddleware');
// Check if file uploads are available
let uploadMiddleware;
try {
    const { createMulter } = require('../middleware/upload');
    uploadMiddleware = createMulter('products').array('image', 1);
} catch (error) {
    console.warn('⚠️  File upload middleware disabled:', error.message);
    uploadMiddleware = (req, res, next) => next(); // No-op middleware
}
const { validateCreateProduct, validateUpdateProduct, validatePagination } = require('../middleware/validation');

// Public routes
router.get('/', validatePagination, getAllProducts); // Remove isLoggedIn for public access
router.get('/:id', getProductById); // Remove isLoggedIn for public access

// Admin routes - require admin access
router.post('/create', isadmin, uploadMiddleware, createProducts);
router.put('/:id', isadmin, uploadMiddleware, updateProduct);
router.delete('/:id', isadmin, deleteProduct);

module.exports = router;