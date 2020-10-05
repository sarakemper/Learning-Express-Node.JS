const Sequelize = require('sequelize')

const sequelize = new Sequelize('node-complete', 'root', '!Louise12', {
    dialect: 'mysql',
    host: 'localhost' //automatically connects to localhost and creates a pool
})
//dialect says to say it s a mysql database

module.exports = sequelize;

