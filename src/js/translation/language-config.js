const { Cookie } = require("express-session");
const {isIn} = require("validator");
const LANGUAGES = require("../../../meta/LANGUAGES");
const LANGUAGE_COOKIE_NAME = require("../../../meta/LANGUAGE_COOKIE_NAME");

function getLanguage(){
    if(!isLanguageSelected()) setDefaultLanguage();
    return Cookies.get(LANGUAGE_COOKIE_NAME);
}

function setLanguage(language){
    if(isLanguageAvailable(language)){
        Cookies.set(LANGUAGE_COOKIE_NAME, language);
    }else{
        setDefaultLanguage();
    }
}

function isLanguageAvailable(language){
    return isIn(language, LANGUAGES);
}

function isLanguageSelected(){
    return typeof Cookies.get(LANGUAGE_COOKIE_NAME) === undefined;
}

function setDefaultLanguage(){
    Cookies.set(LANGUAGE_COOKIE_NAME, getDefaultLanguage());
}

function getDefaultLanguage(){
    return LANGUAGES[0];
}

module.exports = {
    getLanguage: getLanguage,
    setLanguage: setLanguage
};