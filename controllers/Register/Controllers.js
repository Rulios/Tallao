"use strict";

const register = require("express").Router();

require("./laundry")(register);
require("./user")(register);



module.exports = register;

