const User = require('./usermodel');
const Product = require('./productmodel');
const Cart = require('./cartmodel');
const CartItem = require('./cartitemmodel');
const Order = require('./ordermodel');
const OrderItem = require('./orderitemmodel');

// User associations
User.hasOne(Cart, { foreignKey: 'user_id', as: 'cart' });
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });

// Cart associations
Cart.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Cart.hasMany(CartItem, { foreignKey: 'cart_id', as: 'cartItems' });

// CartItem associations
CartItem.belongsTo(Cart, { foreignKey: 'cart_id', as: 'cart' });
CartItem.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
CartItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// Product associations
Product.hasMany(CartItem, { foreignKey: 'product_id', as: 'cartItems' });
Product.hasMany(OrderItem, { foreignKey: 'product_id', as: 'orderItems' });

// Order associations
Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'orderItems' });

// OrderItem associations
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

module.exports = {
    User,
    Product,
    Cart,
    CartItem,
    Order,
    OrderItem
};
