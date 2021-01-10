"use strict";

const React= require("react");
const NavbarComp = require("./NavbarComp");
const {logout} = require("../ajax-requests/log");
const LANGUAGES = require("../../../meta/LANGUAGES");
const navbarToggleInteraction = require("../../js/design-interaction/navbar-interaction/interaction");
const useSelectedLanguage = require("../custom-hooks/useSelectedLanguage");

function Navbar({userType}){
    //componentList = arr (index order should be same as render order)

    const DEFAULT_STARTING_COMPONENTS = [
        "Logo", "ToggleButton"
    ];

    const DEFAULT_ENDING_COMPONENTS = [
        "LanguageSelect"
    ]

    const LINKS = {
        laundry: [
            "WriteOrders",
            "AffiliatedOrders",
            "MyAccount" ,
            "Logout",
        ],
        user: [
            "MyMain",
            "MyOrders",
            "MyAccount",
            "Logout",
        ]
    };

    let [selectedLanguage, setSelectedLanguage] = useSelectedLanguage();

    let clickHandler = function(componentID){
        if(componentID === "CloseSession"){
            logout().then(() =>{ //get back to login
                window.location = "/loginPage";
            })
        }
    };

    let selectHandler = function(componentID, value){
        if(componentID === "LanguageSelect"){
            if(selectedLanguage !== value) setSelectedLanguage(value);
            
        } 
    };


    React.useEffect(() =>{
        navbarToggleInteraction(); //bind event after mounting
    }, []);

    return (
        <div className="container">
            <nav className="navbar">
                {
                    DEFAULT_STARTING_COMPONENTS.map(component =>{
                        return React.createElement(NavbarComp[component], {
                            key: `${component}-Navbar`,
                        });
                    })
                }
                <NavbarComp.NavbarLinks links={LINKS[userType]} onClick={(componentID) => clickHandler(componentID)}></NavbarComp.NavbarLinks>
                {
                    DEFAULT_ENDING_COMPONENTS.map(component =>{
                        return React.createElement(NavbarComp[component], {
                            key: `${component}-Navbar`,
                            languages: LANGUAGES,
                            selectedLanguage: selectedLanguage,
                            onSelect: (componentID, value) => selectHandler(componentID, value)
                        });
                    })
                }
            </nav>
        </div>
    );
    

}


module.exports = Navbar;

