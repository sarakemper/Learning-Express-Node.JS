const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//express handlebars does not have the ability to tell express it exists so we have to do it manually


app.set('view engine', 'pug') //pug automatically "binds" itself to express so by saying pug it express recognizes it and automatically binds it to the pug engine
app.set('views','views' ) //automatically goes to view folder (which we set up) so you don't need this but you would need it if you put HTML somewhere else

const adminRoutes = require('./routes/admin');

const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public')); //connecting css (can't use sendFile must use static)

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page not found'});
});

app.listen(5000);

