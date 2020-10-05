const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//express handlebars does not have the ability to tell express it exists so we have to do it manually

const db = require('./util/database') //requiring database 

app.set('view engine', 'pug') //pug automatically "binds" itself to express so by saying pug it express recognizes it and automatically binds it to the pug engine
app.set('views','views' ) //automatically goes to view folder (which we set up) so you don't need this but you would need it if you put HTML somewhere else

const adminRoutes = require('./routes/admin');

const shopRoutes = require('./routes/shop');
db.execute('SELECT * FROM products').then((result) => {
    // console.log(result)
}).catch(err => {
    consolelog(err)
}) //now can write SQL syntax (syaing elect everything from products)

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public')); //connecting css (can't use sendFile must use static)

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page not found'});
});

app.listen(5000);

/* promise gives us the ability to work with async stuff. usually you have to use callbacks, however
promsies allow you to write more structured code.  Rememebr you need callbacks because some stuff is async. In the function
above you would have to put a callback in execute, which will be invoked once the data is selected from database.  However.then() just makes
stuff cleaner.  .catch is executed in case of an error */

