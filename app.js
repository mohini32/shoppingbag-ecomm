const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

// Import associations to set up model relationships
require('./models/associations');

// CORS configuration
const allowedOrigins = [
    'http://localhost:3000', // Development
    process.env.FRONTEND_URL, // Production (will be set in Railway)
    'https://shopping-bag-frontend.vercel.app', // Add your Vercel URL here
    /\.vercel\.app$/ // Allow all Vercel subdomains
].filter(Boolean); // Remove undefined values

app.use(cors({
    origin: allowedOrigins,
    credentials: true // Allow cookies to be sent
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Global error handling middleware
const { errorHandler } = require('./middleware/errorHandler');
app.use(errorHandler);


const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

// Handle server errors
server.on('error', (error) => {
  console.error('❌ Server error:', error);
});
