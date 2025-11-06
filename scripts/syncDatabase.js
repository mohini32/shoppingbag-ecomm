const { sequelize } = require('../config/db');
require('../models/associations'); // Import associations to set up relationships

async function syncDatabase() {
    try {
        console.log('🔄 Connecting to database...');
        
        // Test the connection
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully');

        // Sync all models (create tables)
        console.log('🔄 Creating tables...');
        await sequelize.sync({ force: false }); // Set to true to drop existing tables
        console.log('✅ All tables created successfully');

        console.log('🎉 Database setup complete!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error setting up database:', error);
        process.exit(1);
    }
}

syncDatabase();
