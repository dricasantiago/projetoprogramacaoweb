const {Client} = require('pg');


const db = new Client({
    host: 'localhost',
    user: 'postgres',
    password: '12345',
    database: 'postgres',
    port:5432
})
db.connect(); 

module.exports = db;