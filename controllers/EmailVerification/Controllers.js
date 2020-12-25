const { email } = require("../../src/js/requestsModules/ajaxReqCheckExists");

const emailVerification = require("express").Router();


require("./confirmation")(emailVerification);


emailVerification.get("/", function(req,res){
    return res.redirect("/");
});

module.exports = emailVerification;