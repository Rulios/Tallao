"use strict";

const laundryRegister = require("./laundry");
const userRegister = require("./user");

module.exports.set = function(app){
    //controllers 

    //laundry register
    laundryRegister.set(app);

    //userRegister
    userRegister.set(app);
};

