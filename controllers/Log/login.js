"use strict";

const validator = require("validator");
const ValidateSchema = require("./validate-schema");
const USER_TYPES = require("../../meta/USER_TYPES");

module.exports= function(log){

    log.post("/login", async function(req,res){
            
        try{
            let {inputEmail, inputPassword, userType} = req.body;
            let Inputs = {
                inputEmail: inputEmail,
                inputPassword: inputPassword,
                userType: userType
            };
            //check if the userType falls in the range
            if(!validator.isIn(userType, USER_TYPES)) throw new Error();
            //check if inputEmail is email
            if(!validator.isEmail(Inputs.inputEmail)) return res.status(400).json({error: "NOT_EMAIL", field:"inputEmail"});

            let validate = await ValidateSchema(Inputs.inputEmail, Inputs.inputPassword, userType);
            let {hashcode, validated} = validate;

            if(validated){
                //create session cookie
                let sess = req.session;
                sess.hashcode = hashcode;
                sess.userType = Inputs.userType;
                return res.status(200).json({login: "OK", userType: Inputs.userType});

            }else{
                //unauthorized
                return res.status(401).send({error: "WRONG_CREDENTIALS"});
            }
        }catch(err){
            console.log(err);
            return res.status(500).send({error: "THERES_A_PROBLEM"});
        }

    });


};