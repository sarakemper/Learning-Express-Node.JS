const Cart = require('./cart')
const db = require('../util/database')

module.exports = class Product {
  constructor(id, title, image, description, price) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute('INSERT INTO products(title, price,description, image) VALUES(?, ?, ?, ?)', 
    [this.title, this.price, this.description, this.image])
    
  } /*INSERT INTO command inserts into a table. ? allows you to safely insert values.  This is becasue there is an attack method wehre you can just insert values to access database or something*/
//the elements in the array replace the ?, ?, ?, ?  mySQL package does hidden query's or something 

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static fetchbyId(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
  } //again doing quesiton mark for security

  static deleteProduct(id){

  }
};
