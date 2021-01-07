"use strict";

const credentials = require("express").Router();

require("./fetch-account-creds")(credentials);
require("./get-user-type")(credentials);
require("./verify-password")(credentials);
require("./update-password")(credentials);




module.exports = credentials;
