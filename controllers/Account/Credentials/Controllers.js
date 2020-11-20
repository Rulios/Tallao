"use strict";

const credentials = require("express").Router();

require("./fetchAccountCreds").set(credentials);


credentials.post("/updateNewPassword", function(req,res){

});

credentials.post("/verifyPassword", function(req,res){

});

module.exports = credentials;
