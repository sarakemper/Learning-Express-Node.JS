const data = require('../models/product')

exports.addProductGet = (req, res, next) => {
    res.render('admin/edit-product', {pageTitle: 'Add Product', isActive: true, path: 'add-product', editing: false})
}

exports.addProductPost = (req, res, next) => {
    const product = new data(null, req.body.title, req.body.imageURL, req.body.description, req.body.price,) //got this info from name field in input 
    //have to put null cuz id is null
    product.save().then(() => {
        res.redirect('/');
    }).catch(err => console.log(err))
}

exports.getAdminProducts = (req, res) => {
    data.fetchAll((products) => {
        res.render('admin/admin-products', {docTitle: 'My Admin Products', prods: products, path: 'admin products'}) 
    })
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.editing //passing edit = true into the url so can access it by doing res.query. This returns a true/false in string form. 
    if (!editMode){
        res.status(404).render('404', {pageTitle: 'Product not found'})
    } //just being careful to make sure you ahve query parameter in URL.  Keep in mind tha tin this case it's not necassary to have a query parameter cuz you cna just make editing true or false and pass it to the pug.  However, it is a good learning experience.
    const prodId = req.params.prodId;
    data.fetchbyId(prodId, (product) => {
        if (!product){
            return res.status(404).render('404', {pageTitle: 'Product not found'});
        }
        res.render('admin/edit-product', {pageTitle: 'Edit Product', isActive: true, editing: true, product: product, path: 'edit-product'}) //note can also make editing = editMode -> it's the same thing since it returns true

    })

}

exports.postEditProduct = (req, res) => {
    const prodId = req.body.productId
    console.log(prodId)
    const updatedProduct = new data(prodId, req.body.title, req.body.imageURL, req.body.description, req.body.price)
    updatedProduct.save();
    res.redirect('/admin/adminProducts')
}

exports.postDelete = (req, res) => {
    const prodId = req.body.productId;
    const productPrice = req.body.productPrice
    data.deleteProduct(prodId, productPrice)
    res.redirect('/admin/adminProducts')
}



