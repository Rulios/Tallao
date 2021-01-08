const LANGUAGE_COOKIE_NAME = require("../meta/LANGUAGE_COOKIE_NAME");
const LANGUAGES = require("../meta/LANGUAGES");
const {isIn}  = require("validator");

module.exports = function(req, res, next){
    
    const languageSelected = req.cookies[LANGUAGE_COOKIE_NAME];
    if(typeof languageSelected === "undefined") setLanguageCookie(res);
    if(!isValidLanguage(languageSelected)) setLanguageCookie(res);

    next();
};


function isValidLanguage(language){
    return isIn(language, LANGUAGES);
}

function setLanguageCookie(res){
    res.cookie(LANGUAGE_COOKIE_NAME, getDefaultLanguage());
}

function getDefaultLanguage(){
    return LANGUAGES[0];
}