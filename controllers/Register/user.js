"use strict";

const client = require("../libs/DBConnect");
const validator = require("validator");
const bcrypt = require("bcrypt");
const {v4 : uuidv4} = require("uuid");
const ExistsUUID = require("../libs/ExistsUUID");
const ExistsPublicID = require("../libs/ExistsPublicID");
const inputs = require("../libs/Inputs");

const saltRounds = 10;

const targetMarketRange = [
    "none","social-media", "internet-advertisement",
    "real-advertisement", "people-recommendation",
    "hear-someone"
];


module.exports.set = function(app){
    app.post("/register/userRegister", function(req,res){
        try{
            let {
                inputName, inputSurname,
                inputEmail, inputPassword, inputTargetMarket
            } = req.body;

            let Inputs = {
                inputName: inputName,
                inputSurname: inputSurname,
                inputEmail: inputEmail,
                inputPassword: inputPassword,
                inputTargetMarket: inputTargetMarket
            };
          
            //check if exists the inputs
            let {exists, field} = inputs.checkIfEmpty(Inputs);
            if(!exists) return res.status(400).json({error:"MISSING_FIELD", field:field});
            //check if inputEmail is email
            if(!validator.isEmail(Inputs.inputEmail)) return res.status(400).json({error: "NOT_EMAIL", field:"inputEmail"});
            //check if target market falls in the range
            if(!validator.isIn(inputTargetMarket, targetMarketRange)) return res.status(400).json({error: "NOT_IN_RANGE", field: "inputTargetMarket"});

            //escape all the inputs
            inputs.escapeAll(Inputs);

            bcrypt.hash(Inputs.inputPassword, saltRounds, async function(err, passwordWHash){
                let {
                    inputName: escName, inputSurname: escSurname,
                    inputEmail: escEmail, inputTargetMarket: escTargetMarket 
                } = Inputs;

                //generate random id
                let publicID = "";
                //check for publicId collisions
                //generate for every collision
                try{
                    let rowCountPublicID = 1;
                    do{
                        publicID = generatePublicID();
                        //check if public ID exists
                        let queryCountPublicID = await ExistsPublicID(publicID, "user"); 
                        rowCountPublicID = queryCountPublicID.rowCount;
                    }while(rowCountPublicID);
                }catch(err){
                    console.log(err);
                    throw new Error();
                }

                //generate uuid to hashcode
                let hashcode = "";
                //check for uuid collisions
                //generate for every collision
                try{
                    let rowCountUUID = 1;
                    do{
                        hashcode = uuidv4();

                        let queryCountUUID = await ExistsUUID(hashcode, "user"); //check if exists the uuid
                        rowCountUUID = queryCountUUID.rowCount;
                    }while(rowCountUUID);
                }catch(err){
                    throw new Error();
                }
                

                let query = `
                    INSERT INTO users(public_id, hashcode, name, surname, email, password)
                    VALUES($1, $2, $3, $4, $5, $6)
                    LIMIT 1;

                    
                `;
                let values = [
                    publicID, hashcode,
                    escName, escSurname, escEmail, passwordWHash
                ];
                //can't insert multiple queries in a prepared statement
                let query2 = `
                    INSERT INTO target_market(reason)
                    VALUES($1)
                    LIMIT 1;
                `;
                let values2 = [escTargetMarket];

                await client.query(query,values); //first query
                await client.query(query2, values2); //second query
                return res.status(200).json({status:"OK"});
            }); 

        }catch(err){
            console.log(err);
            return res.status(500).send({error: "THERES_A_PROBLEM"});
        }
  
    });
}

function generatePublicID(){
    const idLength = 5;
    var text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (var i = 0; i < idLength; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
