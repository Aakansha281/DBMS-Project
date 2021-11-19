const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "Aakansha281",
    host: "localhost",
    port: "5432",
    database: "resume"
})

module.exports = pool;