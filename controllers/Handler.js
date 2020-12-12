"use strict";

const Log = require("./Log/Controllers.js");
const Register = require("./Register/Controllers.js");
const CheckExists = require("./CheckExists/Controllers.js");

module.exports.set = function(app){

    Register.set(app);
    CheckExists.set(app);
    Log.set(app);
};
