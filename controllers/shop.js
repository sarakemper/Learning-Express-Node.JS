const data = require('../models/product')
const Cart = require('../models/cart')

exports.shopGet = (req, res, next) => {
    data.fetchAll((products) => {
        res.render('shop/shop', {docTitle: 'My Shop', prods: products}) 
    })
}

exports.getIndex = (req, res) => {
    data.fetchAll((products) => {
        res.render('shop/index', {docTitle: 'My Shop', prods: products}) 
    })
}

exports.getCart = (req, res) => {
    Cart.getCart((cart) => {
      data.fetchAll(products => {
        const cartProducts = [];
        for (product of products){
          const findProduct = cart.products.find(prod => prod.id === product.id)
          if (findProduct){
            cartProducts.push({productData: product, quantity: findProduct.quantity})
          } //data.fetch all gets products from the products and getCart gets products from Cart.  If statement is cimparing to see if you can find the product id in the cart vs. the product id in the product.json
        }
        res.render('shop/cart', {
          path: 'cart',
          docTitle: 'My cart',
          products: cartProducts
      })
    })
    })
    
}

exports.postCart = (req, res) => {
  const prodId = req.body.productId; //getting this from input tag from HTML
  const prodPrice = req.body.productPrice
  console.log(req.body)
  console.log("in post")
  Cart.addProduct(prodId, prodPrice) 
  res.redirect('/cart')
  
}
//also note you can't return the object product becasue it is in a string weird form, i'm sure there's a way to turn it into an object but idk how

exports.getCheckout = (req, res) => {
    res.render('shop/checkout', {
        path: 'checkout',
        docTitle: 'Checkout'
    })
}

exports.getProducts = (req, res) => {
    data.fetchAll((products) => {
        res.render('shop/product-list', {docTitle: 'Products', prods: products}) 
    })
}

exports.getOrders = (req, res) => {
    res.render('shop/orders', {docTitle: 'Orders', path: 'orders'})
}

exports.getDetails = (req, res) => {
  data.fetchbyId(req.params.productId, (product) => {
    res.render('shop/product-detail', {docTitle: "Details", path: 'products', product: product})
    console.log(product)
  })
  //accessing the id number of the product
}

exports.postDeleteCart = (req, res) => {
  const prodId = req.body.productId
  data.fetchbyId(prodId, (product) => {
    Cart.deleteProduct(prodId, Number(product.price))
    res.redirect('/cart')
  })
}