"use strict";

const client = require("../../libs/DBConnect");

module.exports.set = function(credentials){
    credentials.get("/fetch", async function(req,res){
        let {hashcode, userType} = req.session;
        let query = "";
        let results = {};
        if(userType === "user"){
            query = `
                SELECT id, name, lastname, email 
                FROM users 
                WHERE hashcode= $1
            `;

        }else if(userType === "laundry"){
            query = `
                SELECT initials,name, location,schedule, serviceOffer, legalReprName, legalReprSurname, email 
                FROM laundries 
                WHERE hashcode= $1
            `;
        }
        results = await client.query(query, [hashcode]);
      
        return res.json(Object.assign(results.rows[0], {userType: userType}));
    });
}