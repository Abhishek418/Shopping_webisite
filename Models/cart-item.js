const Sequelize = require('sequelize');
const sequelize = require('../util/database');

/*creating a cart-item model */
const cartItem = sequelize.define('cartItem',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    qty: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

/*exporting the model */
module.exports = cartItem;