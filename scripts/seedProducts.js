const { Sequelize } = require('sequelize');
require('dotenv').config();

// Database connection
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        logging: false
    }
);

// Import your product model
const Product = require('../models/productmodel');

// Sample product data
const sampleProducts = [
    {
        name: "iPhone 15 Pro",
        description: "Latest Apple iPhone with advanced camera system and A17 Pro chip",
        price: 999.99,
        stock: 50,
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400"
    },
    {
        name: "Samsung Galaxy S24",
        description: "Premium Android smartphone with AI-powered features",
        price: 899.99,
        stock: 30,
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"
    },
    {
        name: "MacBook Air M3",
        description: "Ultra-thin laptop with M3 chip and all-day battery life",
        price: 1299.99,
        stock: 25,
        category: "Computers",
        imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"
    },
    {
        name: "Dell XPS 13",
        description: "Premium Windows laptop with InfinityEdge display",
        price: 1099.99,
        stock: 20,
        category: "Computers",
        imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"
    },
    {
        name: "Sony WH-1000XM5",
        description: "Industry-leading noise canceling wireless headphones",
        price: 399.99,
        stock: 40,
        category: "Audio",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    },
    {
        name: "AirPods Pro 2",
        description: "Active noise cancellation with spatial audio",
        price: 249.99,
        stock: 60,
        category: "Audio",
        imageUrl: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400"
    },
    {
        name: "iPad Pro 12.9",
        description: "Most advanced iPad with M2 chip and Liquid Retina XDR display",
        price: 1099.99,
        stock: 15,
        category: "Tablets",
        imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400"
    },
    {
        name: "Samsung Galaxy Tab S9",
        description: "Premium Android tablet with S Pen included",
        price: 799.99,
        stock: 18,
        category: "Tablets",
        imageUrl: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400"
    },
    {
        name: "Apple Watch Series 9",
        description: "Advanced health and fitness tracking with always-on display",
        price: 399.99,
        stock: 35,
        category: "Wearables",
        imageUrl: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400"
    },
    {
        name: "Nike Air Max 270",
        description: "Comfortable running shoes with Max Air cushioning",
        price: 149.99,
        stock: 100,
        category: "Footwear",
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
    },
    {
        name: "Levi's 501 Jeans",
        description: "Classic straight-fit jeans in premium denim",
        price: 89.99,
        stock: 75,
        category: "Clothing",
        imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400"
    },
    {
        name: "Canon EOS R5",
        description: "Professional mirrorless camera with 8K video recording",
        price: 3899.99,
        stock: 8,
        category: "Cameras",
        imageUrl: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400"
    }
];

async function seedProducts() {
    try {
        console.log('🌱 Starting to seed products...');
        
        // Test database connection
        await sequelize.authenticate();
        console.log('✅ Database connection established');
        
        // Sync the Product model
        await Product.sync();
        console.log('✅ Product model synced');
        
        // Clear existing products (optional)
        await Product.destroy({ where: {} });
        console.log('🗑️ Cleared existing products');
        
        // Insert sample products
        const createdProducts = await Product.bulkCreate(sampleProducts);
        console.log(`✅ Successfully created ${createdProducts.length} products`);
        
        // Display created products
        console.log('\n📦 Created Products:');
        createdProducts.forEach((product, index) => {
            console.log(`${index + 1}. ${product.name} - $${product.price}`);
        });
        
        console.log('\n🎉 Database seeding completed successfully!');
        
    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        await sequelize.close();
        console.log('🔌 Database connection closed');
    }
}

// Run the seeder
seedProducts();
