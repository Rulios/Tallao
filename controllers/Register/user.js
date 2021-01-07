"use strict";

const client = require("../libs/DB_CONNECT");
const validator = require("validator");
const bcrypt = require("bcrypt");
const GenerateUniqueUUID = require("../libs/generate/unique-uuid");
const ExistsPublicID = require("../libs/exists/public-id");
const {checkIfEmpty,  trimAllExceptPassword} = require("../libs/inputs");
const createAndSaveToken = require("../libs/email-verification/create-and-save-token");
const sendEmailVerification = require("../libs/email-verification/send-email-verification");

const SALT_ROUNDS = require("../libs/SALT_ROUNDS");

const TARGET_MARKET_RANGE = [
    "none","social-media", "internet-advertisement",
    "real-advertisement", "people-recommendation",
    "hear-someone"
];


module.exports = function(register){
    register.post("/user", async function(req,res){
        try{

            let inputs = req.body;

            let {exists, field} = checkIfEmpty(inputs);
            if(!exists) return res.status(400).json({error:"MISSING_FIELD", field:field});

            if(!validator.isEmail(inputs.email)) return res.status(400).json({error: "NOT_EMAIL", field:"email"});
            if(!validator.isIn(inputs.targetMarket, TARGET_MARKET_RANGE)) return res.status(400).json({error: "NOT_IN_RANGE", field: "targetMarket"});

            trimAllExceptPassword(inputs);

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

            //transaction
            await client.query("BEGIN");

            await client.query(query,values); 
            await insertTargetMarket(targetMarket); 

            await sendEmailVerification(req.headers.host ,email, await createAndSaveToken(hashcode));

            await client.query("COMMIT;");
            
            return res.status(200).json({status:"OK"});

        }catch(err){
            console.log(err);
            if(err.response) console.log(err.response.body); //for email verification
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
