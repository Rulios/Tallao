 "use strict";
require("dotenv").config();

const {Client} = require('pg');

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

client.connect();

module.exports = {
    query: (text, params, callback) => {
        return client.query(text, params, callback);
    }
}


