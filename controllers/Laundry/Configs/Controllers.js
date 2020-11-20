"use strict";

const configs = require("express").Router();
const schedule = require("./schedule");
const serviceOffer = require("./serviceOffer");
const elementsPrice = require("./elementsPrice");

configs.use("/schedule", schedule);
configs.use("/serviceOffer", serviceOffer);
configs.use("/elementsPrice", elementsPrice);

module.exports = configs;