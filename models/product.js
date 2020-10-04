const fs = require('fs');
const path = require('path');

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
  constructor(title, image, description, price) {
    this.title = title;
    this.image = image;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.randon().toString();
    getProductsFromFile(products => {
      products.push(this);
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
};
