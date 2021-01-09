const {getLanguage} = require("./language-config");

const allLanguageWords = {
};


function getStaticText(word){
    let language = getLanguage();
    
    return allLanguageWords[language][word];
}

module.exports = {
    getStaticText: getStaticText
};



