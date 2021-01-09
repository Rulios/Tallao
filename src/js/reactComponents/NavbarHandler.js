"use strict";

const React= require("react");
const NavbarComp = require("./NavbarComp");
const {logout} = require("../ajax-requests/log");
const pageRedirection = require("../frontendModules/pageRedirection");
const LANGUAGES = require("../../../meta/LANGUAGES");
const navbarToggleInteraction = require("../../js/design-interaction/navbar-interaction/interaction");

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

    let [selectedLanguage, setSelectedLanguage] = React.useState("es");

    let clickHandler = function(componentID){
        if(componentID === "CloseSession"){
            logout().then(() =>{ //get back to login
                window.location = "/loginPage";
            })
        }
    };

    let selectHandler = function(componentID, value){
        if(componentID === "LanguageSelect") setSelectedLanguage(value);
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
    
    /* (
        React.createElement("nav" ,{
            className: "navbar navbar-expand-lg navbar-light"
        },
            React.createElement("div", {className: "container"},
                COMPONENTS_LIST[userType].map(component =>{
                    return React.createElement(NavbarComp[component],{
                        key: `${component}-Navbar`,
                        languages: LANGUAGES,
                        onClick: (componentID) => clickHandler(componentID),
                        onSelect: (componentID, value) => selectHandler(componentID, value),
                        selectedLanguage: selectedLanguage
                    })
                })
            )
        )
    ); */
}


module.exports = Navbar;

//example of Navbar
/* 
<nav class="navbar navbar-expand-lg navbar-light ">
    <div class="container">
        <a class="navbar-brand text-center" href="index.html">

            <img  style="width: 60%;"  src="/imgs/tallao-logo-complete-es.svg" alt="Talla'o">

        </a>
        

        <a href="masterpanel.html" id="receiptPanel" class="bottomLineLinkAnimation navBarText">
            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
            <b>Escritura de recibos</b>
        </a>

        <a href="myorders.html" id="myOrders" class="bottomLineLinkAnimation navBarText">
            <i class="fa fa-th-list" aria-hidden="true"></i>
            <b>Órdenes afiliadas a mi lavandería</b>
        </a>

        <a href="myaccount.html"class="bottomLineLinkAnimation navBarText" id="myAccount">
            <i class="fa fa-user-circle" aria-hidden="true"></i>
            <b>Mi cuenta</b>
        </a>

        <a href=""class="bottomLineLinkAnimation redTxt" id="signout">
            <i class="fa fa-sign-out" aria-hidden="true"></i>
            <b>Cerrar Sesión</b>
        </a>

        <div class="leftSeparation  centerOnXs">
            <b>Idioma:</b> 
            <select name="" id="">
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="cn">中文</option>
            </select>
        </div>
    </div>    
</nav>
 */
