const sequelize = require('sequelize')
const db = require('../util/database') //has not just a pool but all the features ex. making relations, etc.

const Product = db.define('product', {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allNull: false,
    primaryKey: true,
  },
  title: sequelize.STRING,
  price: {
    type: sequelize.DOUBLE,
    allowNull: false
  },
  image: {
    type: sequelize.STRING,
    allowNull: false
  },
  description: {
    type: sequelize.STRING,
    allowNull: false
  }

})

module.exports = Product;
//makes a model (db.define).  Making restrictions for the different columns.  The meaning of hte restrictions is in oneNote but under the form in the workbench.
//cautomatically adds createdAT and updatedAt which turn out to be columns in the table.  They are time stamps.