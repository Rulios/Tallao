"use strict";

const credentials = require("express").Router();

require("./fetchAccountCreds")(credentials);
require("./getUserType")(credentials);
require("./verifyPassword")(credentials);
require("./updatePassword")(credentials);




module.exports = credentials;
