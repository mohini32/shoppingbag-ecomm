const { Order, OrderItem, Product, Cart, CartItem } = require('../models/associations');
const sequelize = require('../config/db');

exports.getAllOrders = async (req, res) => {
    const { status } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const user_id = req.user.id;

    try {
        // Build where clause
        const whereClause = { user_id: user_id };
        if (status) {
            whereClause.status = status;
        }

        // Get orders with pagination and filtering
        const { count, rows: orders } = await Order.findAndCountAll({
            where: whereClause,
            include: [{
                model: OrderItem,
                as: 'orderItems',
                include: [{
                    model: Product,
                    as: 'product',
                    attributes: ['id', 'name', 'price', 'imageUrl']
                }]
            }],
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']]
        });

        // Format response with pagination info
        res.status(200).json({
            status: "success",
            orders: orders,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(count / limit),
                totalOrders: count,
                hasNextPage: page < Math.ceil(count / limit),
                hasPrevPage: page > 1
            }
        });
    }
    catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({
            status: "error",
            message: "Failed to fetch orders"
        });
    }
}
// Create order
exports.createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { cart_id, paymentMethod } = req.body;
        const cart = await Cart.findByPk(cart_id);
        if (!cart) {
            return res.status(404).json({
                status: 'error',
                message: 'Cart not found'
            });
        }
        if (cart.user_id !== userId) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
        // Get cart items with product details
        const cartItems = await CartItem.findAll({
            where: { cart_id: cart_id },
            include: [{
                model: Product,
                as: 'product',
                attributes: ['id', 'name', 'price', 'stock']
            }]
        });

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({
                status: 'error',
                message: 'Cart is empty'
            });
        }

        // Check stock availability for all items
        for (const cartItem of cartItems) {
            if (cartItem.product.stock < cartItem.quantity) {
                return res.status(400).json({
                    status: 'error',
                    message: `Insufficient stock for ${cartItem.product.name}. Available: ${cartItem.product.stock}, Required: ${cartItem.quantity}`
                });
            }
        }

        // Use transaction to ensure data consistency
        const transaction = await sequelize.transaction();

        try {
            // Create the order
            const order = await Order.create({
                user_id: userId,
                total: cart.total,
                status: 'pending',
                paymentMethod: paymentMethod
            }, { transaction });

            // Create order items from cart items
            const orderItemsData = cartItems.map(cartItem => ({
                order_id: order.id,
                user_id: userId,
                product_id: cartItem.product_id,
                quantity: cartItem.quantity,
                price: cartItem.product.price
            }));

            const orderItems = await OrderItem.bulkCreate(orderItemsData, { transaction });

            // Update product stock
            for (const cartItem of cartItems) {
                await Product.update(
                    { stock: cartItem.product.stock - cartItem.quantity },
                    {
                        where: { id: cartItem.product_id },
                        transaction
                    }
                );
            }

            // Clear the cart
            await CartItem.destroy({
                where: { cart_id: cart_id },
                transaction
            });

            await Cart.update(
                { total: 0 },
                {
                    where: { id: cart_id },
                    transaction
                }
            );

            // Commit transaction
            await transaction.commit();

            // Return success response with order details
            res.status(201).json({
                status: 'success',
                message: 'Order created successfully',
                order: {
                    id: order.id,
                    user_id: order.user_id,
                    total: order.total,
                    status: order.status,
                    paymentMethod: order.paymentMethod,
                    createdAt: order.createdAt,
                    itemCount: orderItems.length,
                    items: orderItemsData.map((item, index) => ({
                        id: orderItems[index].id,
                        product_id: item.product_id,
                        product_name: cartItems.find(ci => ci.product_id === item.product_id).product.name,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            });

        } catch (error) {
            // Rollback transaction on error
            await transaction.rollback();
            throw error;
        }
        res.status(501).json({
            status: 'error',
            message: 'Order creation not implemented yet'
        });
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to create order'
        });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user.id;

        // Find order with order items and product details
        const order = await Order.findOne({
            where: {
                id: orderId,
                user_id: userId  // Ensure user can only access their own orders
            },
            include: [{
                model: OrderItem,
                as: 'orderItems',
                include: [{
                    model: Product,
                    as: 'product',
                    attributes: ['id', 'name', 'price', 'imageUrl', 'description']
                }]
            }]
        });

        if (!order) {
            return res.status(404).json({
                status: 'error',
                message: 'Order not found'
            });
        }

        // Format the response
        const formattedOrder = {
            id: order.id,
            user_id: order.user_id,
            total: order.total,
            status: order.status,
            paymentMethod: order.paymentMethod,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            itemCount: order.orderItems.length,
            items: order.orderItems.map(item => ({
                id: item.id,
                product_id: item.product_id,
                product_name: item.product.name,
                product_price: item.product.price,
                product_image: item.product.imageUrl,
                product_description: item.product.description,
                quantity: item.quantity,
                price: item.price,
                subtotal: (parseFloat(item.price) * item.quantity).toFixed(2)
            }))
        };

        res.status(200).json({
            status: 'success',
            order: formattedOrder
        });

    } catch (error) {
        console.error('Get order by ID error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch order details'
        });
    }
};

exports.cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user.id;

        // Find order with order items and product details
        const order = await Order.findOne({
            where: {
                id: orderId,
                user_id: userId  // Ensure user can only access their own orders
            }
        });

        if (!order) {
            return res.status(404).json({
                status: 'error',
                message: 'Order not found'
            });
        }

        if (order.status !== 'pending') {
            return res.status(400).json({
                status: 'error',
                message: 'Order cannot be cancelled'
            });
        }
        
        await order.update({ status: 'cancelled' });

        res.status(200).json({
            status: 'success',
            message: 'Order cancelled successfully'
        });

    } catch (error) {
        console.error('Cancel order error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to cancel order'
        });
    }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user.id;

        // Find the order
        const order = await Order.findOne({
            where: {
                id: orderId,
                user_id: userId
            }
        });

        if (!order) {
            return res.status(404).json({
                status: 'error',
                message: 'Order not found'
            });
        }

        // Check if order can be cancelled (only pending orders)
        if (order.status !== 'pending') {
            return res.status(400).json({
                status: 'error',
                message: `Cannot cancel order with status: ${order.status}`
            });
        }

        // Update order status to cancelled
        await order.update({ status: 'cancelled' });

        res.status(200).json({
            status: 'success',
            message: 'Order cancelled successfully',
            order: {
                id: order.id,
                status: order.status,
                updatedAt: order.updatedAt
            }
        });

    } catch (error) {
        console.error('Cancel order error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to cancel order'
        });
    }
};