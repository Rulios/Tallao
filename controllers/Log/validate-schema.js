"use strict";

const client = require("../libs/DB_CONNECT");
const bcrypt = require("bcrypt");

module.exports = async function(email,password, userType){

    let query = "";

    if(userType=== "user"){
        query = `
            SELECT hashcode, password FROM users 
            WHERE email = $1
            LIMIT 1;
        `;
    }else if(userType === "laundry"){
        query = `
            SELECT hashcode, password FROM laundries 
            WHERE email = $1
            LIMIT 1;
        `;
    } 

    let result = await client.query(query, [email]);
    //check if exists
    if(!result.rowCount) return false;
    //
    let {hashcode, password: passwordHash} = result.rows[0];

    //return hashcode and the compare status with bcrypt
    return {
        hashcode: hashcode,
        validated: await bcrypt.compare(password, passwordHash)
    };

};
