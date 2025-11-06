const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { isLoggedIn } = require('../middleware/authMiddleware');
const { validateRegister, validateLogin } = require('../middleware/validation');

// Auth routes with validation
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/logout', logout);

// Protected route example
router.get('/profile', isLoggedIn, (req, res) => {
    res.json({
        status: 'success',
        user: {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        }
    });
});

module.exports = router;