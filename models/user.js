const db = require('../util/database')
const sequelize = require('sequelize')

const userModel = db.define('user', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allNull: false,
        primaryKey: true,
    },
    name: sequelize.STRING,
    email: sequelize.STRING
})

module.exports = userModel