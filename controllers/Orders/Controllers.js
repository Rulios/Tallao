"use strict";

const orders = require("express").Router();
require("./submit")(orders);
require("./fetch")(orders);


module.exports = orders;