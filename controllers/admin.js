const Product = require('../models/product')
const data = require('../models/product')

exports.addProductGet = (req, res, next) => {
    res.render('admin/edit-product', {pageTitle: 'Add Product', isActive: true, path: 'add-product', editing: false})
}

exports.addProductPost = (req, res, next) => {
    Product.create({
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description
    }).then(res.redirect('/admin/adminProducts')).catch(err => console.log(err)) //add a row to the table
}

exports.getAdminProducts = (req, res) => {
    data.findAll().then((products) => {
        res.render('admin/admin-products', {docTitle: 'My Admin Products', prods: products, path: 'admin products'}) 
    }).catch(err => console.log(err))
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.editing //passing edit = true into the url so can access it by doing res.query. This returns a true/false in string form. 
    if (!editMode){
        res.status(404).render('404', {pageTitle: 'Product not found'})
    } //just being careful to make sure you ahve query parameter in URL.  Keep in mind tha tin this case it's not necassary to have a query parameter cuz you cna just make editing true or false and pass it to the pug.  However, it is a good learning experience.
    const prodId = req.params.prodId;
    data.findByPk(prodId).then((product) => {
        if (!product){
            return res.status(404).render('404', {pageTitle: 'Product not found'});
        }
        res.render('admin/edit-product', {pageTitle: 'Edit Product', isActive: true, editing: true, product: product, path: 'edit-product'}) //note can also make editing = editMode -> it's the same thing since it returns true
    }).catch(err => console.log(err))
}

exports.postEditProduct = (req, res) => {
    const prodId = req.body.id
    data.findByPk(prodId).then((product) =>{
        product.title = req.body.title
        product.price = req.body.price
        product.description = req.body.description
        console.log(product.description)
        product.image = req.body.image
        return product.save() 
    }).then(res.redirect('/admin/adminProducts')).catch(err => console.log(err))
    
    
} //DONT WANT TO NEST PROMISES also catch catches errors from both.then()'s

exports.postDelete = (req, res) => {
    const prodId = req.body.productId;
    const productPrice = req.body.productPrice
    Product.findByPk(prodId).then((product)=> {
      return product.destroy() //destroys an object instance 
    }).then(result => {
        res.redirect('/admin/adminProducts')
    }).catch(err => console.log(err))
}



