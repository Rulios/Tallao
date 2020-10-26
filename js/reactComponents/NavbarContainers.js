"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        "NavbarComp": "./NavbarComp"
    }
});
define(["react", "NavbarComp"], function(React, NavbarComp){

    function Navbar({componentList}){
        //componentList = arr (index order should be same as render order)
        const languages = ["es", "en", "cn"];

        let [selectedLanguage, setSelectedLanguage] = React.useState("es");

        let clickHandler = function(componentID){
            if(componentID === "CloseSession"){

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
                            languages: languages,
                            onClick: (componentID) => clickHandler(componentID),
                            onSelect: (componentID, value) => selectHandler(componentID, value),
                            selectedLanguage: selectedLanguage
                        })
                    })
                )
            )

        )

    }

    return Navbar;
    
});
