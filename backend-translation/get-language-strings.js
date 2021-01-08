const es = require("./languages/es.json");
const LANGUAGE_COOKIE_NAME = require("../meta/LANGUAGE_COOKIE_NAME");

const strings = {
    es: es
};

module.exports = function(req){

    const languageSelected = req.cookies[LANGUAGE_COOKIE_NAME];

    return strings[languageSelected];
}