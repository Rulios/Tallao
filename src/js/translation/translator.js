const {getLanguage} = require("./language-config");
const languages = require("./languages/languages.json");
const es = require("./languages/es.json");

//we copy the languages obj because those strings are meant to be used
//in a language selector which needs to be on the same language that wants to select

const allLanguageWords = {
    es: Object.assign(es, languages),
};


function getStaticText(word){

    try{
        let language = getLanguage();

        return allLanguageWords[language][word];
    }catch(err){
        return "Error";
    }
}

module.exports = {
    getStaticText: getStaticText
};



