const {getLanguage} = require("./language-config");
const {staticWords: es_staticWords} = require("./languages/es");

const allLanguageWords = {
    es: {...es_staticWords}
};


function getStaticText(word){
    let language = getLanguage();
    
    return allLanguageWords[language][word];
}

module.exports = {
    getStaticText: getStaticText
};



