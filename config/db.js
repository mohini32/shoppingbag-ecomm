require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize=new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host:process.env.DB_HOST,
        dialect:process.env.DB_DIALECT,
        port:process.env.DB_PORT,
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