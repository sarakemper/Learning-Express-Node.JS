const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//express handlebars does not have the ability to tell express it exists so we have to do it manually

const db = require('./util/database') //requiring database 
const Product = require('./models/product')
const User = require('./models/user')

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

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product)

//belongs to created a relation between the two tables.  if user is deleted what happens to connected products -> cascade (if user is deleted then all the relations to the user are also deleted ) 
db.sync({force: true}).then(
    // result => console.log(result)
    ).catch(err => console.log(err)) //it is away of all your models and then creates tables for them and if you have them then relations
// it does not override the existent table when you restart the server or something re renders.  This is becasue the SQL query that says only make a table if it already does not exist.

//had to set force to true becasue already made a product table and made changes by addng new relations so have to force it to true to take into account new changes
app.listen(5000);

/* promise gives us the ability to work with async stuff. usually you have to use callbacks, however
promsies allow you to write more structured code.  Rememebr you need callbacks because some stuff is async. In the function
above you would have to put a callback in execute, which will be invoked once the data is selected from database.  However.then() just makes
stuff cleaner.  .catch is executed in case of an error */

