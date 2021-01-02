"use strict";

require("dotenv").config();

const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

const port= (process.env.PORT||8080);
const ControllerHandler = require("./controllers/Handler.js");
const session = require("express-session");
const csurf = require("csurf");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

const laundryRouter = require("./controllers/Laundry/Controllers");
const accountRouter = require("./controllers/Account/Controllers");
const emailVerificationRouter = require("./controllers/EmailVerification/Controllers");
const timeRouter = require("./controllers/ServerTime/Controllers");
const searchRouter = require("./controllers/Search/Controllers");
const ordersRouter = require("./controllers/Orders/Controllers");
const userRouter = require("./controllers/User/Controllers");

const sessionMiddleware = session({
    secret: "tallao",
    resave: false,
    saveUninitialized: true,
});

const csrfProtectionMiddleware = csurf({cookie : true});

const socketioNamespaces = require("./controllers/libs/socketio/namespaces");
socketioNamespaces(io, [sessionMiddleware]); //for initial handshakes

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public')); //for static files serving

app.set("views", path.join(__dirname + "/public/views"));
app.set("view engine", "ejs");

//sessions
app.use(sessionMiddleware);



//main page serving


app.get("/", function(req,res){
    res.render("pages/index");
});

app.get("/loginPage", function(req,res){
    res.render("pages/login");
});

app.get("/register", function(req,res){
    res.render("pages/register");
});

app.get("/laundryRegister", function(req,res){
    res.render("pages/laundryRegister");
});


//DEFINITIONS OF EXPRESS ROUTERS

app.use("/laundry",csrfProtectionMiddleware, laundryRouter);
app.use("/account", csrfProtectionMiddleware, accountRouter);
app.use("/emailVerification",csrfProtectionMiddleware, emailVerificationRouter);
app.use("/time", timeRouter);
app.use("/search",csrfProtectionMiddleware, searchRouter);
app.use("/orders",csrfProtectionMiddleware, ordersRouter(io));
app.use("/user", csrfProtectionMiddleware, userRouter);

//pass express app to the ControllerHandlers
ControllerHandler.set(app);

server.listen(port);

