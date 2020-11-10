"use strict";

require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const port= 8080;
const ControllerHandler = require("./controllers/Handler.js");

let app = express();

const server = app.listen(port);


//use json bodyParser
app.use(bodyParser.json());
//use urlencoded bodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/login", function(req,res){
    res.sendFile(__dirname + "/public/login.html");
});

app.get("/register", function(req,res){
    res.sendFile(__dirname + "/public/register.html");
});

app.get("/laundryRegister", function(req,res){
    res.sendFile(__dirname + "/public/laundryRegister.html");
});

//pass express app to the ControllerHandlers
ControllerHandler.set(app);

