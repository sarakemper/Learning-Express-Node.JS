const path = require('path');

const productsController = require('../controllers/admin')

const express = require('express');

const router = express.Router();


router.get('/add-product', productsController.addProductGet);

router.post('/add-product', productsController.addProductPost);

router.get('/adminProducts', productsController.getAdminProducts);

router.get('/edit-product/:prodId', productsController.getEditProduct)


module.exports = router;

