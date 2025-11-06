const Joi = require('joi');

// Generic validation middleware
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message
            });
        }
        next();
    };
};

// Auth validation schemas
const registerSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

// Product validation schemas
const createProductSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().max(1000).required(),
    price: Joi.number().positive().precision(2).required(),
    stock: Joi.number().integer().min(0).required()
});

const updateProductSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    description: Joi.string().max(1000).optional(),
    price: Joi.number().positive().precision(2).optional(),
    stock: Joi.number().integer().min(0).optional()
});

// Cart validation schemas
const addToCartSchema = Joi.object({
    product_id: Joi.number().integer().positive().required(),
    quantity: Joi.number().integer().min(1).max(100).default(1)
});

const updateCartItemSchema = Joi.object({
    quantity: Joi.number().integer().min(1).max(100).required()
});

// Order validation schemas
const createOrderSchema = Joi.object({
    cart_id: Joi.number().integer().positive().optional(),
    paymentMethod: Joi.string().valid('card', 'cash', 'upi', 'wallet').required()
});

// Query validation schemas
const paginationSchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    search: Joi.string().max(100).allow('').optional(),
    minPrice: Joi.number().positive().optional(),
    maxPrice: Joi.number().positive().optional(),
    sortBy: Joi.string().valid('name', 'price', 'createdAt', 'stock').default('createdAt'),
    sortOrder: Joi.string().valid('ASC', 'DESC').default('DESC'),
    status: Joi.string().valid('pending', 'paid', 'shipped', 'delivered').optional()
});

// Validation middleware functions
const validateRegister = validate(registerSchema);
const validateLogin = validate(loginSchema);
const validateCreateProduct = validate(createProductSchema);
const validateUpdateProduct = validate(updateProductSchema);
const validateAddToCart = validate(addToCartSchema);
const validateUpdateCartItem = validate(updateCartItemSchema);
const validateCreateOrder = validate(createOrderSchema);

// Query validation middleware
const validateQuery = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.query);
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message
            });
        }
        req.query = value; // Replace with validated values
        next();
    };
};

const validatePagination = validateQuery(paginationSchema);

module.exports = {
    validate,
    validateRegister,
    validateLogin,
    validateCreateProduct,
    validateUpdateProduct,
    validateAddToCart,
    validateUpdateCartItem,
    validateCreateOrder,
    validatePagination
};
