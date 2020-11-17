"use strict";

const laundry = require("express").Router();
const Auth = require("../libs/Auth");
const path = require("path");
const validator = require("validator");


//middleware for authorization
laundry.use("/",async function(req, res, next){ 
    let {hashcode, userType} = req.session;
    if(userType !== "laundry") return res.redirect("/loginPage");
    if(await Auth(hashcode, userType)){ //validate hashcode w/ db
        next();
    }else{
        return res.redirect("/loginPage");
    }
});

laundry.get("/panel", function(req, res){
    return res.status(200).sendFile(path.resolve("public/laundryPanel.html"));
});

module.exports = laundry;

