"use strict";

const customMessages = require("express").Router();
 require("./deleteMessage")(customMessages);
 require("./fetchMessages")(customMessages);
 require("./updateMessages")(customMessages);

module.exports = customMessages;