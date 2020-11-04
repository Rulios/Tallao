"use strict";
require.config({
    paths: {
        jquery: [
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
            "./lib/jquery"],
        design: "design.new",
        bootstrap: "./lib/bootstrap.bundle.min",
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development',
        formVerification:["frontendModules/formVerification"],
        sessionHandler: "frontendModules/sessionHandler",
        AccountCreds: "./reactComponents/AccountCreds",
        ChangePasswordHandler: "./reactComponents/ChangePasswordHandler",
        ScheduleHandler: "./reactComponents/ScheduleHandler",
        EditServiceOfferHandler: "./reactComponents/EditServiceOfferHandler",
        EditCustomMessagesHandler: "./reactComponents/EditCustomMessagesHandler",
        EditElementsPriceBundle: "./reactComponents/EditElementsPriceBundle",
        Navbar: "./reactComponents/NavbarHandler"
    },
    shim: {
        bootstrap: {
            deps: ["jquery"]
        },
    }
});
require(["jquery", "react", "react-dom", "design", "bootstrap"], 
function($,React, ReactDOM){ 

    let userType = null;

    $(document).ready(() =>{

        require(["sessionHandler"], function(session){
            session.check();

            try{
                require(["AccountCreds", "ChangePasswordHandler", "ScheduleHandler", 
                    "EditElementsPriceBundle", "EditServiceOfferHandler", "EditCustomMessagesHandler"], 
                    (AccountCreds, ChangePassword, Schedule, 
                    EditElementsPriceBundle, EditServiceOfferHandler, EditCustomMessagesHandler) =>{

                    RenderOnPage();

                });
            }catch{
                alert("Error al cargar datos");
            }
        });
    });

    function RenderNavbar(){
        require(["Navbar"], function(Navbar){
            if(userType === "laundry"){
                ReactDOM.render(
                    React.createElement(Navbar, {
                        componentList: [
                            "Logo", 
                            "WriteOrders",
                            "AffiliatedOrders",
                            "MyAccount" ,
                            "Logout",
                            "LanguageSelect"
                        ]
                    }), document.getElementById("NavbarContainer")
                )
            }
        });
    }

    function RenderOnPage(){
        ReactDOM.render(
            React.createElement(El2Render),
            document.getElementById("root")
        );
    }
    
    function El2Render(){
        let el2Render = [];
        el2Render.push( //render the static header (this goes always)
            React.createElement(StaticHeader, {key: "StaticHeader"})
        );
        if(userType === "laundry"){
            el2Render.push(
                React.createElement(LaundryRoot, {key:"LaundryRoot"})
            )
        }
        return el2Render;
    }

    function StaticHeader(){
        //static header, it always go even if the userType is laundry or user
        let AccountCreds = require("AccountCreds");
        let ChangePasswordHandler = require("ChangePasswordHandler");
        return (
            React.createElement("div", {
                className: "container montserrat_font paddingForm"
            },
                [
                    React.createElement("div", {key: "TitleHeader",className: "row"},
                        React.createElement("div", {
                            className: "col-lg-12 karla_font text-center titleTxt"
                        }, "Todo lo que debes saber de tu cuenta. Aquí.")
                    ),
                    React.createElement("div", {
                        key: "AccountCredsContainer", className: "supTxt-TitleTxt-Separation"
                    }, React.createElement(AccountCreds, {
                            getUserType: (type) => { 
                                //THIS IS CRITICAL
                                //TO RENDER THE MISSING ROOT IT FIRSTS NEEDS TO DETERMINE
                                //THE USERTYPE. THEN IT MODIFIES THE GLOBAL VARIABLE 
                                //AND TRIGGERS RenderOnPage to render the correspondent userType root
                                userType = type;
                                RenderOnPage();
                                RenderNavbar();
                            }
                        })
                    ),
                    React.createElement("div", {
                        key: "ChangePasswordContainer", className: "formRowSeparation"
                    }, React.createElement(ChangePasswordHandler))
                ]
            )
        );
    }

    function LaundryRoot(){
        //laundry root display containers
        return (
            React.createElement("div", {className: "container sectionSeparation"},
                [
                    React.createElement(ScheduleContainer, {key: "EditScheduleContainer"}),
                    React.createElement(ServiceOfferContainer, {key: "EditServiceOfferContainer"}),
                    React.createElement(ElementsPriceContainer, {key: "EditElementsPriceContainer"}),
                    React.createElement(CustomMessagesContainer, {key: "EditCustomMesagesContainer"})
                ]
            
            )
        );
    }

    function ScheduleContainer(){
        let Schedule = require("ScheduleHandler");
        return(
            React.createElement("div", null, 
                [
                    React.createElement("div", {
                        key: "ScheduleTitleHeader",
                        className: "karla_font text-center titleTxt small-mediumSeparation"
                    }, "Horario de Servicio"),
                    React.createElement("div", {
                        key: "ScheduleContainer",
                        className: "row supTxt-TitleTxt-Separation"
                    }, React.createElement(Schedule, {mode :"edit"}))
                ]
            )
        );
    }

    function ServiceOfferContainer(){
        let EditServiceOfferHandler = require("EditServiceOfferHandler");
        return(
            React.createElement("div", null, 
                [
                    React.createElement("div", {
                        key: "ServiceOfferTitleHeader",
                        className: "karla_font text-center titleTxt small-mediumSeparation"
                    }, "Oferta de Servicios"),
                    React.createElement("div", {
                        key: "ServiceOfferContainer",
                        className: "row supTxt-TitleTxt-Separation"
                    }, React.createElement(EditServiceOfferHandler), null)
                ]
            )
        );
    }

    function ElementsPriceContainer(){
        let EditElementsPriceBundle = require("EditElementsPriceBundle");
        return(
            React.createElement("div", {className: "supTxt-TitleTxt-Separation"}, 
                [
                    React.createElement("div", {
                        key: "ServiceOfferTitleHeader",
                        className: "karla_font text-center titleTxt small-mediumSeparation"
                    }, "Precios de los elementos"),
                    React.createElement("div", {
                        key:"EditElementsPriceSubTitle",
                        className: "karla_font text-center subTxt"
                    }, "(Estos precios son los usuales, cuando se ordena se le puede cambiar el precio a uno deseado)"), 
                    React.createElement(EditElementsPriceBundle, {
                        key: "EditElementsPriceBundle"
                    })
                ]
            )
        );
    }

    function CustomMessagesContainer(){
        let EditCustomMessagesHandler = require("EditCustomMessagesHandler");
        return(
            React.createElement("div", {className: "supTxt-TitleTxt-Separation"}, 
                [
                    React.createElement("div", {
                        key: "EditCustomMessagesTitleHeader",
                        className: "karla_font text-center titleTxt small-mediumSeparation"
                    }, "Mensajes personalizados"),
                    React.createElement("div", {
                        key:"EditCustomMessagesSubTitleHeader",
                        className: "karla_font text-center subTxt"
                    }, "Texto que puedes introducir rápidamente con un click"), 
                    React.createElement(EditCustomMessagesHandler, {
                        key: "EditCustomMessagesContainer"
                    })
                ]
            )
        );
    }

});

