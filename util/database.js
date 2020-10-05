const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete', //made new schema within the SQL workbench
    password: '!Louise12'
}) 

module.exports = pool.promise() //allow to use promises 


//creating pool of connections -> see oneNote for explanation
//you close the pool when you're done getting stuff from the database