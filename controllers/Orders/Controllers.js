"use strict";

const orders = require("express").Router();


module.exports = function(io){
    require("./submit")(orders, io);
    require("./fetch")(orders);
    require("./nextStatus")(orders, io);
    require("./updateCustomerAffiliate")(orders, io);

    return orders;
}
