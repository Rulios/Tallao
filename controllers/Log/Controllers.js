"use strict";

const log = require("express").Router();

require("./login")(log);
require("./logout")(log);

module.exports = log;