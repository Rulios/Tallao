const {isIn} = require("validator");
const Cookies = require("js-cookie");

const LANGUAGES = require("../../../meta/LANGUAGES");
const LANGUAGE_COOKIE_NAME = require("../../../meta/LANGUAGE_COOKIE_NAME");
const DEFAULT_LANGUAGE = require("../../../meta/DEFAULT_LANGUAGE");


function getLanguage(){
    const selectedLanguage = Cookies.get(LANGUAGE_COOKIE_NAME);

    if(!isLanguageSelected() && !isLanguageAvailable(selectedLanguage)) setDefaultLanguage();
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
    return typeof Cookies.get(LANGUAGE_COOKIE_NAME) === "undefined";
}

function setDefaultLanguage(){
    Cookies.set(LANGUAGE_COOKIE_NAME, DEFAULT_LANGUAGE);
}



module.exports = {
    getLanguage: getLanguage,
    setLanguage: setLanguage
};