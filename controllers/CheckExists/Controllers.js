"use strict";
const client = require("../libs/DBConnect");
const validator = require("validator");
const ExistsPublicID = require("../libs/ExistsPublicID");

const userTypeRange = ["laundry", "user"];

module.exports.set = function(app){

    //validate if exists the same email on db
    app.get("/CheckExists/Email", function(req, res){
        try{
            let inputEmail = req.query.inputEmail;
            let userType = req.query.userType;
            let tableName = "";
            //check if exists inputEmail
            if(validator.isEmpty(inputEmail)) return res.status(400).json({error: "MISSING_FIELD", field:"inputEmail"});
            //check if inputEmail is email
            if(!validator.isEmail(inputEmail)) return res.status(400).json({error: "NOT_EMAIL", field:"inputEmail"});
            //check if exists userType
            if(validator.isEmpty(userType)) return res.status(403).end();
            //check if userType falls in the range
            if(!validator.isIn(userType, userTypeRange)) return res.status(403).end();

            //escape characters
            inputEmail = validator.escape(inputEmail);
            userType = validator.escape(userType);


            let query = "";
            let values = [inputEmail];
            //set tablename depending on the userType
            if(userType === "user"){
                query = "SELECT 1 FROM users WHERE email = $1 LIMIT 1";
            }else if (userType === "laundry"){
                query = "SELECT 1 FROM laundries WHERE email = $1 LIMIT 1";
            }
            
            client.query(query,values)
            .then(result =>{
                if(result.rowCount){
                    return res.json({exists: true});
                } else{
                    return res.json({exists: false});
                }
            }).catch((err) => {console.log(err);throw Error(err);});

        }catch(err){
            return res.status(500).send({error: "THERES_A_PROBLEM"});
        } 
    });

    //validate if exists same laundryInitials on db
    app.get("/CheckExists/LaundryInitials", function(req, res){

        try{
            let inputInitials = req.query.inputInitials;
            //check if exists inputInitials
            if(validator.isEmpty(inputInitials)) return res.status(400).json({error: "MISSING_FIELD", field:"laundryInitials"});
            //escape characters
            inputInitials = validator.escape(inputInitials);
            //check if all uppercase
            if(!validator.isUppercase(inputInitials)) return res.status(400).json({error: "NOT_UPPERCASE", field: "laundryInitials"});
            //check if falls into the range of 4-6 characters 
            if(!validator.isByteLength(inputInitials, {min: 4, max:6})) return res.status(400).json({error: "NOT_IN_RANGE", min: 4, max:6});
     
            //query
            ExistsPublicID(inputInitials, "laundry").then(result =>{
                if(result.rowCount){
                    return res.json({exists: true});
                } else{
                    return res.json({exists: false});
                }
            }).catch((err) => {throw Error(err)});

        }catch(err){
            return res.status(500).send({error: "THERES_A_PROBLEM"});
        } 

    });

};