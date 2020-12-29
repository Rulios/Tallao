"use strict";

require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const port= (process.env.PORT||8080);
const ControllerHandler = require("./controllers/Handler.js");
const session = require("express-session");

const app = express();
const server = require("http").createServer(app);

const laundryRouter = require("./controllers/Laundry/Controllers");
const accountRouter = require("./controllers/Account/Controllers");
const emailVerificationRouter = require("./controllers/EmailVerification/Controllers");
const timeRouter = require("./controllers/ServerTime/Controllers");
const searchRouter = require("./controllers/Search/Controllers");
const ordersRouter = require("./controllers/Orders/Controllers");
const userRouter = require("./controllers/User/Controllers");

const io = require("socket.io")(server);

const sessionMiddleware = session({
    secret: "tallao",
    resave: false,
    saveUninitialized: true,
});

const socketioNamespaces = require("./controllers/libs/socketio/namespaces");
socketioNamespaces(io, [sessionMiddleware]);


//use json bodyParser
app.use(bodyParser.json());
//use urlencoded bodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

//sessions
app.use(sessionMiddleware);


//main page serving

app.get("/", function(req,res){
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/loginPage", function(req,res){
    res.sendFile(__dirname + "/public/login.html");
});

app.get("/register", function(req,res){
    res.sendFile(__dirname + "/public/register.html");
});

app.get("/laundryRegister", function(req,res){
    res.sendFile(__dirname + "/public/laundryRegister.html");
});


//DEFINITIONS OF EXPRESS ROUTERS

app.use("/laundry", laundryRouter);
app.use("/account", accountRouter);
app.use("/emailVerification", emailVerificationRouter);
app.use("/time", timeRouter);
app.use("/search", searchRouter);
app.use("/orders", ordersRouter);
app.use("/user", userRouter);
//pass express app to the ControllerHandlers
ControllerHandler.set(app);

server.listen(port);

