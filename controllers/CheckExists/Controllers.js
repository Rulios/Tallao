"use strict";

const checkExists = require("express").Router();

require("./email")(checkExists);
require("./laundry-initials")(checkExists);


module.exports = checkExists;