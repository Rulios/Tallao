"use strict";

const account = require("express").Router();
const credentials = require("./Credentials/Controllers");

account.use("/credentials", credentials);


module.exports = account;
