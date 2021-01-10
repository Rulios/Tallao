"use strict";

require( "core-js/stable");
require("regenerator-runtime/runtime");

const React = require("react");
const ReactDOM = require("react-dom");

const AccountCreds = require("./reactComponents/AccountCreds");
const ChangePasswordHandler	= require("./reactComponents/ChangePasswordHandler");
const ScheduleHandler = require("./reactComponents/ScheduleHandler");
const EditServiceOfferHandler = require("./reactComponents/EditServiceOfferHandler");
const EditCustomMessagesHandler = require("./reactComponents/EditCustomMessagesHandler");
const EditElementsPriceBundle = require("./reactComponents/EditElementsPriceBundle");
const Navbar = require("./reactComponents/NavbarHandler");
const {getUserType} = require("./ajax-requests/user-creds");
const {getStaticText} = require("./translation/translator");


window.onload = function(){
    try{
        getUserType().then(({data : userType}) =>{
            RenderNavbar(userType);
            RenderOnPage(userType);
        });
    }catch{
        alert(getStaticText("ERR_LOADING_DATA"));
    }
};

function RenderNavbar(userType){
    ReactDOM.render(
        React.createElement(Navbar, {
            userType: userType
        }), document.getElementById("NavbarContainer")
    );
}

function RenderOnPage(userType){
    ReactDOM.render(
        React.createElement(El2Render, {userType: userType}),
        document.getElementById("root")
    );
}

function El2Render({userType}){
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
    return (
        React.createElement("div", {
            className: "container montserrat_font paddingForm"
        },
            [
                React.createElement("div", {key: "TitleHeader",className: "row"},
                    React.createElement("div", {
                        className: "col-lg-12 karla_font text-center titleTxt"
                    }, getStaticText("myAccountMainTitle"))
                ),
                React.createElement("div", {
                    key: "AccountCredsContainer", className: "supTxt-TitleTxt-Separation"
                }, React.createElement(AccountCreds)),
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
    return(
        React.createElement("div", null, 
            [
                React.createElement("div", {
                    key: "ScheduleTitleHeader",
                    className: "karla_font text-center titleTxt small-mediumSeparation"
                }, getStaticText("scheduleOfService")),

                React.createElement("div", {
                    key: "ScheduleContainer",
                    className: "row supTxt-TitleTxt-Separation"
                }, React.createElement(ScheduleHandler, {mode :"edit"}))
            ]
        )
    );
}

function ServiceOfferContainer(){
    return(
        React.createElement("div", null, 
            [
                React.createElement("div", {
                    key: "ServiceOfferTitleHeader",
                    className: "karla_font text-center titleTxt small-mediumSeparation"
                }, getStaticText("servicesThatYouOffer")),

                React.createElement("div", {
                    key: "ServiceOfferContainer",
                    className: "row supTxt-TitleTxt-Separation"
                }, React.createElement(EditServiceOfferHandler), null)
            ]
        )
    );
}

function ElementsPriceContainer(){
    return(
        React.createElement("div", {className: "supTxt-TitleTxt-Separation"}, 
            [
                React.createElement("div", {
                    key: "ServiceOfferTitleHeader",
                    className: "karla_font text-center titleTxt small-mediumSeparation"
                }, getStaticText("priceElements")),

                React.createElement("div", {
                    key:"EditElementsPriceSubTitle",
                    className: "karla_font text-center subTxt"
                }, `(${getStaticText("myAccountPriceElementsSubtitle")})`), 

                React.createElement(EditElementsPriceBundle, {
                    key: "EditElementsPriceBundle"
                })
            ]
        )
    );
}

function CustomMessagesContainer(){
    return(
        React.createElement("div", {className: "supTxt-TitleTxt-Separation"}, 
            [
                React.createElement("div", {
                    key: "EditCustomMessagesTitleHeader",
                    className: "karla_font text-center titleTxt small-mediumSeparation"
                }, getStaticText("customMessages")),

                React.createElement("div", {
                    key:"EditCustomMessagesSubTitleHeader",
                    className: "karla_font text-center subTxt"
                }, getStaticText("myAccountCustomMessagesSubtitle")), 
                
                React.createElement(EditCustomMessagesHandler, {
                    key: "EditCustomMessagesContainer"
                })
            ]
        )
    );
}

