const sequelize = require('../util/database');
const { Sequelize, Model, DataTypes } = require('sequelize');


const order = sequelize.define('order',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
})


module.exports = order;