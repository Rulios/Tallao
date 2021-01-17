const navbarEventListener = require("./design-interaction/navbar-interaction/interaction");
const {getLanguage, setLanguage} = require("../../translation/frontend/language-config");

window.onload = function(){

    let languageSelector = document.getElementById("language-selector");

    languageSelector.value = getLanguage();

    languageSelector.addEventListener("change", (e) =>{
        let newLanguage = e.target.value;

        setLanguage(newLanguage);

        location.reload();
    })

    navbarEventListener();
};
