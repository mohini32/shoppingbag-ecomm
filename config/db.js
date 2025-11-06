require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE || process.env.DB_NAME,
    process.env.MYSQL_USER || process.env.DB_USER,
    process.env.MYSQL_PASSWORD || process.env.DB_PASS,
    {
        host: process.env.MYSQL_HOST || process.env.DB_HOST,
        dialect: 'mysql', // Always mysql for Railway
        port: process.env.MYSQL_PORT || process.env.DB_PORT,
        logging: console.log, // Enable SQL logging for debugging
        sync: { force: false } // Disable auto-sync
    }
)

const connectDB=async ()=>{
    try{
        await sequelize.authenticate();
        console.log("connected to DB");


    } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { sequelize, connectDB };