const user = require("express").Router();
const Auth = require("../libs/Auth");

const getLanguageStrings = require("../../translation/backend/get-language-strings");+

//middleware for authorization
user.use("/",async function(req, res, next){ 
    let {hashcode, userType} = req.session;
    if(userType !== "user") return res.redirect("/loginPage");
    if(await Auth(hashcode, userType)){ //validate hashcode w/ db
        next();
    }else{
        return res.redirect("/loginPage");
    }
});

user.get("/panel", function(req, res){
    return res.render("pages/userPanel", Object.assign(getLanguageStrings(req), {csrfToken: req.csrfToken()}));
});

user.get("/myaccount", function(req,res){
    return res.render("pages/myaccount", Object.assign(getLanguageStrings(req), {csrfToken: req.csrfToken()}));
});

user.get("/myorders", function(req,res){
    return res.render("pages/myorders", Object.assign(getLanguageStrings(req), {csrfToken: req.csrfToken()}));
});

module.exports = user;