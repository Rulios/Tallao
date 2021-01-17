const languages = require("../languages.json");
const {STATIC_STRINGS_PROP_NAME} = require("../helpers/STRINGS_PROP_NAMES");

module.exports = function(languageStrings) {
    if(containsStaticStrings(languageStrings)){
        return Object.assign(languageStrings, appendLanguagesToStaticStrings(languageStrings[STATIC_STRINGS_PROP_NAME]));
    }else{
        return Object.assign(languageStrings, appendLanguagesToStaticStrings(languageStrings));
    }
}

function containsStaticStrings(languageStrings){
    return Object.keys(languageStrings).includes(STATIC_STRINGS_PROP_NAME);
}

function appendLanguagesToStaticStrings(staticStrings){
    return Object.assign(staticStrings, languages);
}