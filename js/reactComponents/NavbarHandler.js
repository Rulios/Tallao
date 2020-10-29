"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        "NavbarComp": "./reactComponents/NavbarComp",
        ajaxReqLogin: "../js/requestsModules/ajaxReqLogin",
        pageRedirection: "../js/frontendModules/pageRedirection"
    }
});
define(["react", "NavbarComp", "pageRedirection", "ajaxReqLogin"], 
function(React, NavbarComp,pageRedirection, ajaxReqLogin){

    function Navbar({componentList}){
        //componentList = arr (index order should be same as render order)
        const languages = ["es", "en", "cn"];

        let [selectedLanguage, setSelectedLanguage] = React.useState("es");

        let clickHandler = function(componentID){
            if(componentID === "CloseSession"){
                ajaxReqLogin.logout().then(() =>{ //get back to login
                    pageRedirection.bounceToLogin();
                })
            }
        };

        let selectHandler = function(componentID, value){
            if(componentID === "LanguageSelect") setSelectedLanguage(value);
        };


        return (
            React.createElement("nav" ,{
                className: "navbar navbar-expand-lg navbar-light"
            },
                React.createElement("div", {className: "container"},
                    componentList.map(component =>{
                        return React.createElement(NavbarComp[component],{
                            key: `${component}-Navbar`,
                            languages: languages,
                            onClick: (componentID) => clickHandler(componentID),
                            onSelect: (componentID, value) => selectHandler(componentID, value),
                            selectedLanguage: selectedLanguage
                        })
                    })
                )
            )
        );
    }

    return Navbar;
    
});
