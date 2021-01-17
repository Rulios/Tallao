"use strict";

const React = require("react");
const FieldDisplayDiv = require("./FieldDisplayDiv");
const {getStaticText} = require("../../../translation/frontend/translator");

function UserNameSurnameContainer({name, surname}){
    return(
        React.createElement(FieldDisplayDiv.TwoFieldDisplay,{
            field1: `${getStaticText("name")}:`,
            value1: name,
            field2: `${getStaticText("surname")}:`,
            value2: surname
        })
    );
}

function LaundryReprNameSurnameContainer({name, surname}){
    return(
        React.createElement(FieldDisplayDiv.TwoFieldDisplay,{
            field1: `${getStaticText("legalReprName")}:`,
            value1: name,
            field2: `${getStaticText("legalReprSurname")}:`,
            value2: surname
        })
    );
}

function LaundryInitialsContainer({initials}){
    return React.createElement(FieldDisplayDiv.OneFieldDisplay, {
        field: `${getStaticText("laundryInitials")}:`,
        value: initials
    })
}

function LaundryNameContainer({name}){
    return React.createElement(FieldDisplayDiv.OneFieldDisplay,{
        field: `${getStaticText("laundryName")}:`,
        value: name
    })
}

function EmailContainer({email}){
    return(
        React.createElement(FieldDisplayDiv.OneFieldDisplay,{
            field: `${getStaticText("email")}:`,
            value: email
        })
    );
}  

function LocationContainer({location}){
    return(
        React.createElement(FieldDisplayDiv.OneFieldDisplay, {
            field: `${getStaticText("location")}:`,
            value: location
        })
    );
}

module.exports = {
    UserNameSurname:UserNameSurnameContainer,
    LaundryReprNameSurname: LaundryReprNameSurnameContainer,
    Email: EmailContainer,
    Location: LocationContainer,
    LaundryInitials: LaundryInitialsContainer,
    LaundryName: LaundryNameContainer,
    LaundryInitials: LaundryInitialsContainer
}

