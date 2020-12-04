"use strict";

const orders = require("express").Router();
require("./submit")(orders);

module.exports = orders;