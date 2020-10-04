const express = require('express');

const shopController = require('../controllers/shop');
 
const path = require('path');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/cart', shopController.getCart)

router.get('/checkout', shopController.getCheckout)

router.get('/products/:productId', shopController.getDetails)
// tell express router that there will be a dynamic parameter by doing / then any name of choice that begins with a colon.  You can later extract that info from the name you chose.
// Keep in mind that order matters.  Code is compiled from top to bottom and
// since /products is true for any URL that has http:/products and it doesnt matter what's after it 
// then it woul dnever get to ./products/:productId

router.get('/orders', shopController.getOrders)

router.get('/products', shopController.getProducts)

router.post('/cart', shopController.postCart)

module.exports = router;
