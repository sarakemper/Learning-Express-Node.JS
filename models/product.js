const fs = require('fs');
const path = require('path');
const Cart = require('./cart')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, image, description, price) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id){
        const exisitngProductIndex = products.findIndex((product) => product.id === this.id)
        products[exisitngProductIndex] = this; //this refers to the object nad the object you would be passing in is the updated object 
      //keep in mind that it is considered good practice to create a new variable using the spread operator then replacing the updated product with the specified index.  However I didn't do this cuz I didn't want to.
      } //saying if there is already an existing product then just update it
      else{
        this.id = Math.random().toString();
        products.push(this);
      }
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static fetchbyId(id, cb) {
    getProductsFromFile(products => {
      products.forEach(product => {
        if (product.id === id){
          cb(product);
        }
      });
    })
  }

  static deleteProduct(id){
    getProductsFromFile((products) => {
      const productDelete = products.find(prod => prod.id === id)
      const newProducts = products.filter((product) => product.id !== id)
      fs.writeFile(p, JSON.stringify(newProducts), err => {
        if (!err){
          Cart.deleteProduct(id, productDelete.price)
        }
      })
    })
  }
};
