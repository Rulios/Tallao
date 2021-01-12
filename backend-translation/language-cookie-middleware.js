const {isIn}  = require("validator");
const LANGUAGE_COOKIE_NAME = require("../meta/LANGUAGE_COOKIE_NAME");
const LANGUAGES = require("../meta/LANGUAGES");
const DEFAULT_LANGUAGE = require("../meta/DEFAULT_LANGUAGE");

module.exports = function(req, res, next){

    //THIS MODULE SETS THE RESPONSE COOKIE

    try{
        const languageSelected = req.cookies[LANGUAGE_COOKIE_NAME];

        if(typeof languageSelected === "undefined") setLanguageCookie(res);
        if(!isValidLanguage(languageSelected)) setLanguageCookie(res);
    }catch(err){
        setLanguageCookie(res);
    }

    next();
};


function isValidLanguage(language){
    return isIn(language, LANGUAGES);
}

function setLanguageCookie(res){
    res.cookie(LANGUAGE_COOKIE_NAME, DEFAULT_LANGUAGE);
}