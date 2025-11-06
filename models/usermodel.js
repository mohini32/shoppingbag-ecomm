const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const Users = sequelize.define('users',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:DataTypes.STRING,
    email:DataTypes.STRING,
    password:DataTypes.STRING,
    createdAt:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull:false,
        Comment:"auto update"
    },
    updatedAt:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull:false,
        Comment:"auto update"
    }

})

module.exports=Users
