const fs = require('fs')
const path = require ('path')

const p = path.join(
    __dirname, '../',
    'data',
    'cart.json'
  );
  

module.exports = class Cart {
    constructor() {
        this.products = [];
        this.totalPrice = 0;
    }

    static addProduct(id, productPrice){
        //get the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0}
            if (!err){
                cart = JSON.parse(fileContent)
            }
            console.log(cart)

            //analyze cart 
            //.find loops through array and returns product index  that returns true from callback function
            const existingProductIndex = cart.products.findIndex((product) => {
                return product.id === id
            })
            const existingProduct = cart.products[existingProductIndex] //finding product at that specific index (note you can also use .find instead of .findIndex to find the elemnt, however we need the index later)
            console.log(existingProduct)
            console.log(cart.totalPrice)
            let updatedProduct; //creating a new variable if there is an existing product
            if (existingProduct){
                updatedProduct = {...existingProduct} //copying elements into updatedProduct
                console.log(updatedProduct)
                updatedProduct.quantity += 1; // making a quantity variable within the updatedProduct object or you are adding 1 to it depending on how many times you added something to cart
                cart.products[existingProductIndex] = updatedProduct //updating exisiting product
                console.log(cart.products)
                console.log(cart)
            }
            else{
                updatedProduct = {id: id, quantity: 1}
                cart.products = [...cart.products, updatedProduct] //updating cart with new product
            }
            console.log(cart)
            cart.totalPrice = cart.totalPrice+ Number(productPrice)
            console.log(cart)

            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err)
            })
        })
        
    }

    static deleteProduct(id, productPrice){
        fs.readFile(p, (err, fileContent) => {
            if (err){
                res.status(404).render('404', {pageTitle: 'No products to delete!'})
            }
            let cart = JSON.parse(fileContent)
            const updatedCart = {...cart}
            let deleteProduct = cart.products.filter((product) => product.id === id)
            console.log("dete this product", deleteProduct)
            if (deleteProduct[0].quantity !== null)
                console.log(updatedCart.totalPrice, "updated cart total price", deleteProduct.quantity)
                updatedCart.totalPrice =  updatedCart.totalPrice - productPrice * deleteProduct[0].quantity
                console.log(updatedCart.totalPrice, "new updated cart")
            updatedCart.products = cart.products.filter((product) => product.id !== id)
            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log(err)
            })

        }) //note that this function works even if the product is not in the cart.  This is becasue deletedProduct will be an empty array.  Also adding the if statemnet makes sure the total price doesnt change
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            if (err){
                res.status(404).render('404', {pageTitle: "No products found"})
            }
            let cart = JSON.parse(fileContent)
            cb(cart)
        })
    }
}