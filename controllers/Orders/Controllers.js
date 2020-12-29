"use strict";

const orders = require("express").Router();

require("./fetch")(orders);
require("./nextStatus")(orders);
require("./updateCustomerAffiliate")(orders);


module.exports = orders;
