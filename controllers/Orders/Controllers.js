"use strict";

const orders = require("express").Router();


module.exports = function(io){
    require("./submit")(orders, io);
    require("./fetch")(orders);
    require("./next-status")(orders, io);
    require("./update-customer-affiliate")(orders, io);

    return orders;
}
