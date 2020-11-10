"use strict";

const Account = require("./Account/Controllers.js");
const Laundry = require("./Laundry/Controllers.js");
const Log = require("./Log/Controllers.js");
const Orders = require("./Orders/Controllers.js");
const Register = require("./Register/Controllers.js");
const ServerTime = require("./ServerTime/Controllers.js");
const CheckExists = require("./CheckExists/Controllers.js");

module.exports.set = function(app){

  /*   Account(app);
    Laundry(app);
    Log(app);
    Orders(app);
    Register(app);
    ServerTime(app);
 */

    Register.set(app);
    CheckExists.set(app);

};
