// const mysql = require('mysql2');
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node_complete',
//     password: '123abc'
// });
 

// module.exports = pool.promise();


const Sequelize = require('sequelize');
const sequelize = new Sequelize('node_complete','root','123abc',{
    dialect: 'mysql',
    host: 'localhost',
    logging: false
})

module.exports = sequelize;