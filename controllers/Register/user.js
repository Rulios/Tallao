"use strict";

const client = require("../libs/DBConnect");
const validator = require("validator");
const bcrypt = require("bcrypt");
const GenerateUniqueUUID = require("../libs/GenerateUniqueUUID");
const ExistsPublicID = require("../libs/ExistsPublicID");
const {checkIfEmpty, escapeAll, trimAllExceptPassword} = require("../libs/Inputs");

const SALT_ROUNDS = require("../libs/SALT_ROUNDS");

const TARGET_MARKET_RANGE = [
    "none","social-media", "internet-advertisement",
    "real-advertisement", "people-recommendation",
    "hear-someone"
];


module.exports.set = function(app){
    app.post("/register/user", async function(req,res){
        try{

            let inputs = req.body;

            let {exists, field} = checkIfEmpty(inputs);
            if(!exists) return res.status(400).json({error:"MISSING_FIELD", field:field});

            if(!validator.isEmail(inputs.email)) return res.status(400).json({error: "NOT_EMAIL", field:"email"});
            if(!validator.isIn(inputs.targetMarket, TARGET_MARKET_RANGE)) return res.status(400).json({error: "NOT_IN_RANGE", field: "targetMarket"});

            trimAllExceptPassword(inputs);
            escapeAll(inputs);

            let hashedPassword = await bcrypt.hash(inputs.password, SALT_ROUNDS); 

            let {
                name, surname, email, targetMarket
            } = inputs;

            //generate random id
            let publicID = await generateUniquePublicID();

            //generate uuid to hashcode
            let hashcode = await GenerateUniqueUUID("user");

            let query = `
                INSERT INTO users(public_id, hashcode, name, surname, email, password)
                VALUES($1, $2, $3, $4, $5, $6)
                LIMIT 1;
            `;
            let values = [
                publicID, hashcode,
                name, surname, email, hashedPassword
            ];

            await client.query(query,values); 
            await insertTargetMarket(targetMarket); 
            
            return res.status(200).json({status:"OK"});

        }catch(err){
            console.log(err);
            return res.status(500).send({error: "THERES_A_PROBLEM"});
        }
  
    });
}


async function generateUniquePublicID(){
    let rowCountPublicID = 1;
    const POSSIBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const ID_LENGTH = 5;
    let publicID = "";

    do{
        for (let i = 0; i < ID_LENGTH; i++)
            publicID += POSSIBLE.charAt(Math.floor(Math.random() * POSSIBLE.length));

        rowCountPublicID = await ExistsPublicID(publicID, "user");
    }while(rowCountPublicID);
    
    return publicID;
}



async function insertTargetMarket(targetMarket){
    let query = `
        INSERT INTO target_market(reason)
        VALUES($1)
        LIMIT 1;
    `;
    await client.query(query, [targetMarket]);
}
