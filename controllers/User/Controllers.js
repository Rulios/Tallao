const user = require("express").Router();
const Auth = require("../libs/Auth");
const path = require("path");

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
    return res.status(200).sendFile(path.resolve("public/userPanel.html"));
});

user.get("/myaccount", function(req,res){
    return res.status(200).sendFile(path.resolve("public/myaccount.html"));
});

user.get("/myorders", function(req,res){
    return res.status(200).sendFile(path.resolve("public/myorders.html"));
});

module.exports = user;