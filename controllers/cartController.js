const { Cart, CartItem, Product } = require('../models/associations');

// Get cart items with product details
exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user is attached to req from auth middleware

        // Find or create cart for user
        let cart = await Cart.findOne({
            where: { user_id: userId }
        });

        if (!cart) {
            cart = await Cart.create({ user_id: userId, total: 0 });
        }

        // Get cart items with product details
        const cartItems = await CartItem.findAll({
            where: {
                cart_id: cart.id,
                user_id: userId
            },
            include: [
                {
                    model: Product,
                    as: 'product',
                    attributes: ['id', 'name', 'price', 'imageUrl', 'stock']
                }
            ],
            attributes: ['id', 'product_id', 'quantity', 'subtotal', 'createdAt']
        });

        // Format response data
        const formattedCartItems = cartItems.map(item => ({
            id: item.id,
            product_id: item.product_id,
            product_name: item.product.name,
            product_price: item.product.price,
            product_image: item.product.imageUrl,
            quantity: item.quantity,
            subtotal: item.subtotal,
            stock_available: item.product.stock,
            createdAt: item.createdAt
        }));

        // Calculate total
        const total = cartItems.reduce((sum, item) => sum + parseFloat(item.subtotal), 0);

        res.status(200).json({
            status: 'success',
            cart: {
                id: cart.id,
                user_id: userId,
                total: total.toFixed(2),
                items: formattedCartItems,
                itemCount: cartItems.length
            }
        });

    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch cart items'
        });
    }
};

// Add item to cart
exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { product_id, quantity = 1 } = req.body;

        // Validate product exists and has stock
        const product = await Product.findByPk(product_id);
        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Product not found'
            });
        }

        if (product.stock < quantity) {
            return res.status(400).json({
                status: 'error',
                message: 'Insufficient stock available'
            });
        }

        // Find or create cart
        let cart = await Cart.findOne({ where: { user_id: userId } });
        if (!cart) {
            cart = await Cart.create({ user_id: userId, total: 0 });
        }

        // Check if item already exists in cart
        let cartItem = await CartItem.findOne({
            where: {
                cart_id: cart.id,
                user_id: userId,
                product_id: product_id
            }
        });

        const subtotal = parseFloat(product.price) * quantity;

        if (cartItem) {
            // Update existing item
            const newQuantity = cartItem.quantity + quantity;
            const newSubtotal = parseFloat(product.price) * newQuantity;

            await cartItem.update({
                quantity: newQuantity,
                subtotal: newSubtotal
            });
        } else {
            // Create new cart item
            cartItem = await CartItem.create({
                cart_id: cart.id,
                user_id: userId,
                product_id: product_id,
                quantity: quantity,
                subtotal: subtotal
            });
        }

        // Update cart total
        const allCartItems = await CartItem.findAll({ where: { cart_id: cart.id } });
        const newTotal = allCartItems.reduce((sum, item) => sum + parseFloat(item.subtotal), 0);
        await cart.update({ total: newTotal });

        res.status(200).json({
            status: 'success',
            message: 'Item added to cart successfully',
            cartItem: {
                id: cartItem.id,
                product_id: cartItem.product_id,
                quantity: cartItem.quantity,
                subtotal: cartItem.subtotal
            }
        });

    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to add item to cart'
        });
    }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { cartItemId } = req.params;
        const { quantity } = req.body;

        if (quantity <= 0) {
            return res.status(400).json({
                status: 'error',
                message: 'Quantity must be greater than 0'
            });
        }

        // Find cart item
        const cartItem = await CartItem.findOne({
            where: {
                id: cartItemId,
                user_id: userId
            },
            include: [{ model: Product, as: 'product' }]
        });

        if (!cartItem) {
            return res.status(404).json({
                status: 'error',
                message: 'Cart item not found'
            });
        }

        // Check stock availability
        if (cartItem.product.stock < quantity) {
            return res.status(400).json({
                status: 'error',
                message: 'Insufficient stock available'
            });
        }

        // Update cart item
        const newSubtotal = parseFloat(cartItem.product.price) * quantity;
        await cartItem.update({
            quantity: quantity,
            subtotal: newSubtotal
        });

        // Update cart total
        const cart = await Cart.findByPk(cartItem.cart_id);
        const allCartItems = await CartItem.findAll({ where: { cart_id: cart.id } });
        const newTotal = allCartItems.reduce((sum, item) => sum + parseFloat(item.subtotal), 0);
        await cart.update({ total: newTotal });

        res.status(200).json({
            status: 'success',
            message: 'Cart item updated successfully',
            cartItem: {
                id: cartItem.id,
                quantity: cartItem.quantity,
                subtotal: cartItem.subtotal
            }
        });

    } catch (error) {
        console.error('Update cart item error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to update cart item'
        });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { cartItemId } = req.params;

        // Find and delete cart item
        const cartItem = await CartItem.findOne({
            where: {
                id: cartItemId,
                user_id: userId
            }
        });

        if (!cartItem) {
            return res.status(404).json({
                status: 'error',
                message: 'Cart item not found'
            });
        }

        const cartId = cartItem.cart_id;
        await cartItem.destroy();

        // Update cart total
        const cart = await Cart.findByPk(cartId);
        const remainingItems = await CartItem.findAll({ where: { cart_id: cartId } });
        const newTotal = remainingItems.reduce((sum, item) => sum + parseFloat(item.subtotal), 0);
        await cart.update({ total: newTotal });

        res.status(200).json({
            status: 'success',
            message: 'Item removed from cart successfully'
        });

    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to remove item from cart'
        });
    }
};

// Clear entire cart
exports.clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ where: { user_id: userId } });
        if (!cart) {
            return res.status(404).json({
                status: 'error',
                message: 'Cart not found'
            });
        }

        // Delete all cart items
        await CartItem.destroy({ where: { cart_id: cart.id } });

        // Reset cart total
        await cart.update({ total: 0 });

        res.status(200).json({
            status: 'success',
            message: 'Cart cleared successfully'
        });

    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to clear cart'
        });
    }
};