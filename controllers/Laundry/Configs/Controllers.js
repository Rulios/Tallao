"use strict";

const configs = require("express").Router();
const schedule = require("./schedule");
const serviceOffer = require("./service-offer");
const elementsPrice = require("./elements-price");

require("./current-order-id")(configs);

configs.use("/schedule", schedule);
configs.use("/serviceOffer", serviceOffer);
configs.use("/elementsPrice", elementsPrice);

module.exports = configs;