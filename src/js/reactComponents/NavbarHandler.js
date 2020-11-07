"use strict";

const React= require("react");
const NavbarComp = require("./reactComponents/NavbarComp");
const ajaxReqLog = require("../js/requestsModules/ajaxReqLog");
const pageRedirection = require("../js/frontendModules/pageRedirection");

function Navbar({componentList}){
    //componentList = arr (index order should be same as render order)
    const languages = ["es", "en", "cn"];

    let [selectedLanguage, setSelectedLanguage] = React.useState("es");

    let clickHandler = function(componentID){
        if(componentID === "CloseSession"){
            ajaxReqLog.logout().then(() =>{ //get back to login
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

//example of Navbar
/* 
<nav class="navbar navbar-expand-lg navbar-light ">
    <div class="container">
        <a class="navbar-brand text-center" href="index.html">

            <img  style="width: 60%;"  src="imgs/Tallao-Complete-es.svg" alt="Talla'o">

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
