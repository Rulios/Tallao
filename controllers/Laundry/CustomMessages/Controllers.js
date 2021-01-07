"use strict";

const customMessages = require("express").Router();
 require("./delete-message")(customMessages);
 require("./fetch-messages")(customMessages);
 require("./update-messages")(customMessages);

module.exports = customMessages;