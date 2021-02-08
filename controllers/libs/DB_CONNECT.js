 "use strict";
require("dotenv").config();

const {Client} = require('pg');

let client;

if(isDeploymentEnvironmentLocal()){
    client = new Client({
        user: process.env.DATABASE_USER,
        host: process.env.DATABASE_URL,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASS,
        port: process.env.DATABASE_PORT,
    });
}else{
    client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
    });
}

client.connect();

module.exports = {
    query: (text, params, callback) => {
        return client.query(text, params, callback);
    }
}

function isDeploymentEnvironmentLocal(){
    return process.env.DEPLOYMENT_ENVIRONMENT === "local";
}


