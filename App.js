"use strict";

require("dotenv").config();

const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');


const port= (process.env.PORT||8080);
const session = require("express-session");
const csurf = require("csurf");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

const languageCookieMiddleware = require("./backend-translation/language-cookie-middleware");
const getLanguageStrings = require("./backend-translation/get-language-strings");

const registerRouter = require("./controllers/Register/Controllers");
const logRouter = require("./controllers/Log/Controllers");
const checkExistsRouter = require("./controllers/CheckExists/Controllers");
const laundryRouter = require("./controllers/Laundry/Controllers");
const accountRouter = require("./controllers/Account/Controllers");
const emailVerificationRouter = require("./controllers/EmailVerification/Controllers");
const timeRouter = require("./controllers/ServerTime/Controllers");
const searchRouter = require("./controllers/Search/Controllers");
const ordersRouter = require("./controllers/Orders/Controllers");
const userRouter = require("./controllers/User/Controllers");
const notificationRouter = require("./controllers/Notification/Controllers");
const feedbackRouter = require("./controllers/Feedback/Controllers");

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
app.use(languageCookieMiddleware);

app.set("views", path.join(__dirname + "/public/views"));
app.set("view engine", "ejs");

//sessions
app.use(sessionMiddleware);

//main page serving

app.get("/", function(req,res){
    res.render("pages/index", getLanguageStrings(req));
});

app.get("/loginPage", csrfProtectionMiddleware, function(req,res){
    res.render("pages/login", Object.assign(getLanguageStrings(req), {csrfToken: req.csrfToken()}));
});

app.get("/register",csrfProtectionMiddleware, function(req,res){
    res.render("pages/register", Object.assign(getLanguageStrings(req), {csrfToken: req.csrfToken()}));
});

app.get("/laundryRegister", csrfProtectionMiddleware, function(req,res){
    res.render("pages/laundryRegister", {csrfToken: req.csrfToken()});
});



//404 - Page not found



//EXPRESS ROUTERS


app.use("/register", csrfProtectionMiddleware, registerRouter);
app.use("/CheckExists", csrfProtectionMiddleware, checkExistsRouter);
app.use("/log", csrfProtectionMiddleware, logRouter);
app.use("/laundry",csrfProtectionMiddleware, laundryRouter);
app.use("/account", csrfProtectionMiddleware, accountRouter);
app.use("/emailVerification",csrfProtectionMiddleware, emailVerificationRouter);
app.use("/time", timeRouter);
app.use("/search",csrfProtectionMiddleware, searchRouter);
app.use("/orders",csrfProtectionMiddleware, ordersRouter(io));
app.use("/user", csrfProtectionMiddleware, userRouter);
app.use("/notification", csrfProtectionMiddleware, notificationRouter);
app.use("/feedback", feedbackRouter);

/* app.use(function(req, res, next){
    res.status(404).end();
}); */

server.listen(port);

