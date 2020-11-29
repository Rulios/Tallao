"use strict";

const search = require("express").Router();
require("./customerByID")(search);

module.exports = search;
