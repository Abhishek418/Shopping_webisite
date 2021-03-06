const Sequelize = require('sequelize');
const sequelize = require('../util/database');

/*creating a cart-item model */
const cart = sequelize.define('cart',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})

/*exporting the model */
module.exports = cart;