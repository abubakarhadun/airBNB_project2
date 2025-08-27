const {Pool} = require('pg');

const pool = new Pool({
    host: localhost,
    database: airbnb,
    user: abubakar,
    password: 122005,
    port: 5432
});

module.exports = pool;