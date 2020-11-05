require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const port= 8080;

let app = express();
// create application/json parser
let jsonParser = bodyParser.json();

const server = app.listen(port);


//app.use(jsonParser);
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


