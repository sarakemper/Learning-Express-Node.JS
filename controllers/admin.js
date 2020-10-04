const data = require('../models/product')

exports.addProductGet = (req, res, next) => {
    res.render('admin/edit-product', {pageTitle: 'Add Product', isActive: true, path: 'add-product', editing: false})
}

exports.addProductPost = (req, res, next) => {
    const product = new data(req.body.title, req.body.imageURL, req.body.price, req.body.description) //got this info from name field in input 
    product.save()
    res.redirect('/');
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
        console.log(product.description)
        res.render('admin/edit-product', {pageTitle: 'Edit Product', isActive: true, editing: true, product: product, path: 'edit-product'}) //note can also make editing = editMode -> it's the same thing since it returns true

    })

}



