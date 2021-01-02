"use strict";

const client = require("../../libs/DBConnect");

module.exports = function(credentials){
    credentials.get("/fetch", async function(req,res){

        try{
            const  {hashcode, userType} = req.session;
            if(!hashcode || !userType) {
                throw new Error("No hashcode or usertype");
            }
            let query = "";
            let results = {};
            if(userType === "user"){
                query = `
                    SELECT public_id, name, surname, email 
                    FROM users 
                    WHERE hashcode= $1
                    LIMIT 1;
                `;

            }else if(userType === "laundry"){
                query = `
                    SELECT initials,name, location,schedule, serviceoffer, legalreprname, legalreprsurname, email 
                    FROM laundries 
                    WHERE hashcode= $1
                    LIMIT 1;
                `;
            }
            results = await client.query(query, [hashcode]);
         
            //console.log(results);
            return res.json(Object.assign(results.rows[0], {userType: userType}));
        }catch(err){
            console.error(err);
            res.status(500).end();
        }

        
    });
}