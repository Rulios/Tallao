"use strict";

const search = require("express").Router();
require("./customer-by-id")(search);

module.exports = search;
