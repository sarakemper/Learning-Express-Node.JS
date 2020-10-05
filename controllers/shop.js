const data = require('../models/product')
const Cart = require('../models/cart')

exports.getIndex = (req, res) => {
  data.findAll({raw: true}).then((rows) => {
    res.render('shop/index', {docTitle: 'My Shop', prods: rows, path: '/'})
    // console.log(rows)
  }
  ).catch(err => console.log(err))
} //find all returns an array.  This array that is returned is just an array with 1 element. In there you have the datavalues that you can access by .id and .title, etc.  Datavalues and product are undefined.  So in the array you can access the .title and stuff.  Note that each index in rows corresponds to 1 row.  Just has other stuff along with it 
//the extra shit is just sequelizes extra clutter for the databases.  .get({raw: true}) just returns the key value pairs.  It delivers the exact same answer just console.logging is cleaner
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
  data.findAll().then((rows) => {
    res.render('shop/product-list', {docTitle: 'Products', prods: rows, path: 'products'}) 
  }).catch(err => console.log(err))
}

exports.getOrders = (req, res) => {
    res.render('shop/orders', {docTitle: 'Orders', path: 'orders'})
}

exports.getDetails = (req, res) => {
  data.findByPk(req.params.productId).then((product) => {
    console.log(product)
    res.render('shop/product-detail', {docTitle: "Details", path: 'products', product: product})
  }).catch(err => console.log(err))
    
}

exports.postDeleteCart = (req, res) => {
  const prodId = req.body.productId
  data.fetchbyId(prodId, (product) => {
    Cart.deleteProduct(prodId, Number(product.price))
    res.redirect('/cart')
  })
}