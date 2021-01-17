const {getLanguage} = require("./language-config");
const es = require("./languages/es.json");
const cn = require("./languages/cn.json");

const appendLanguagesToLanguagesStrings = require("../helpers/append-languages-to-languages-strings");

const {STATIC_STRINGS_PROP_NAME, VARIABLE_STRINGS_PROP_NAME} = require("../helpers/STRINGS_PROP_NAMES");

//we copy the languages obj because those strings are meant to be used
//in a language selector which needs to be on the same language that wants to select

const allLanguageWords = {
    es: appendLanguagesToLanguagesStrings(es),
    cn: appendLanguagesToLanguagesStrings(cn)
};

function getStaticText(string){

    try{
        let language = getLanguage();
        let languageStrings = allLanguageWords[language];
        let staticLanguageStrings = languageStrings[STATIC_STRINGS_PROP_NAME];
        let selectedString = staticLanguageStrings[string];

        return selectedString;
    }catch(err){
        console.log(err);
        return "Error";
    }
}

function getVariableText(context, string, extras){

    try{
        let language = getLanguage();
        let languageStrings = allLanguageWords[language];
        let variableLanguageStrings = languageStrings[VARIABLE_STRINGS_PROP_NAME];
        let contextStrings = variableLanguageStrings[context];
        let selectedString = contextStrings[string];
        let finalString = "";

        if(containsObjWithSubstrings(selectedString)){
            let subPropName = getSubPropNameOfExtras(extras);
            let tempString = contextStrings[string][extras[subPropName]];

            finalString = replaceSubstringsFormatsWithValues(tempString, extras);
        }else{
            finalString = replaceSubstringsFormatsWithValues(selectedString, extras);
        }

        console.log(finalString);

        return finalString;
    }catch(err){
        console.log(err);
        return "Error";
    }
}

function containsObjWithSubstrings(selectedString){
    if(typeof selectedString === "object"){
        return true;
    }else if(typeof selectedString === "string"){
        return false;
    }
}

function getSubPropNameOfExtras(extras){
    //the property taken by this function on extras obj parameter
    //to determine the nested substring should be named "SUB_PROP"
    const SUB_PROP_PROP_NAME = "SUB_PROP";
    return extras[SUB_PROP_PROP_NAME];
}


function replaceSubstringsFormatsWithValues(string, substringsObj){
    Object.keys(substringsObj).map(substring =>{
        let value =  substringsObj[substring];
        string = replaceAllSubstringsWithValue(string, substring, value);
    });
    return string;
}

function replaceAllSubstringsWithValue(string, substringProp, value){
    let format = `$${substringProp}`;
    string = string.replaceAll(format, value);
    return string;
}

module.exports = {
    getStaticText: getStaticText,
    getVariableText: getVariableText
};



