"use strict";

const login = require("./login");
const logout = require("./logout");

module.exports.set = function(app){

    login.set(app);
    logout.set(app);

};