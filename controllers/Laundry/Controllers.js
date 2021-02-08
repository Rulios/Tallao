"use strict";

const laundry = require("express").Router();
const Auth = require("../libs/Auth");
const configsRouter = require("./Configs/Controllers");
const customMessagesRouter = require("./CustomMessages/Controllers");
const getLanguageStrings = require("../../translation/backend/get-language-strings");

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

//views 

laundry.get("/panel", function(req, res){
    return res.render("./pages/laundry-panel", Object.assign(getLanguageStrings(req), {csrfToken: req.csrfToken()}));
});

laundry.get("/myaccount", function(req,res){
    return res.render("./pages/myaccount", Object.assign(getLanguageStrings(req), {csrfToken: req.csrfToken()}));
});

laundry.get("/myorders", function(req,res){
    return res.render("./pages/myorders", Object.assign(getLanguageStrings(req), {csrfToken: req.csrfToken()}));
});

// data banks

laundry.use("/configs", configsRouter);
laundry.use("/customMessages", customMessagesRouter);

//

module.exports = laundry;

