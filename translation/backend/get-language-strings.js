const es = require("./languages/es.json");
const cn = require("./languages/cn.json");
const LANGUAGE_COOKIE_NAME = require("../../meta/LANGUAGE_COOKIE_NAME");
const DEFAULT_LANGUAGE = require("../../meta/DEFAULT_LANGUAGE");
const appendLanguagesToLanguagesStrings = require("../helpers/append-languages-to-languages-strings");

const strings = {
    es: appendLanguagesToLanguagesStrings(es),
    cn: appendLanguagesToLanguagesStrings(cn)
};

/* THIS MODULE WORKS WITH THE REQUEST OBJ
SO IF IT'S THE FIRST TIME THAT THE USER ENTERS THE PAGE
WITHOUT HAVING THE SELECTED LANGUAGE Cookie, IT'LL TAKE THE DEFAULT LANGUAGE AND OUTPUT
BUT THIS WON'T SET THE RESPONSE COOKIE. IT'S UP TO THE MIDDLEWARE TO DO IT. */

module.exports = function(req){ 

    try{
        let languageSelected = req.cookies[LANGUAGE_COOKIE_NAME];

        languageSelected = setDefaultLanguageIfUndefined(languageSelected);

        return strings[languageSelected];
    }catch(err){
        console.log(err);
        return "ERROR";
    }

}

function setDefaultLanguageIfUndefined(languageSelected){
    if(typeof languageSelected === "undefined"){
        return DEFAULT_LANGUAGE;
    }
    return languageSelected;
}

