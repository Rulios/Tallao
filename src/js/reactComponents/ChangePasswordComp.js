"use strict";

const React = require("react");

/* This file contains the components used at the change password feature
at the lowest level.  */
const PasswordInput = ({id, placeholder, value, onChange, disabled}) =>{
    return React.createElement("input", {
        id: id,
        type:"password",
        className: `form-control ${(disabled) ? "disableInput" : ""}`,
        placeholder: placeholder,
        value: value,
        onChange: (e) =>{
            onChange(e.target.value);
        }
    });
};

const PasswordLabel = ({idFor, text}) =>{
    return React.createElement("label", {htmlFor: idFor}, text);
};

const ChangePasswordLink = ({text, handleClick}) =>{
    return React.createElement("a", {
        href:"", 
        className:"bold",
        id: "changePasswordLink",
        onClick: (e) =>{
            e.preventDefault();
            handleClick();
        }
    }, text);
};

const ChangePasswordSubmitButton = ({text, eventHandler}) =>{
    return React.createElement("button", {
        type: "submit",
        className: "submitButtonLogin formRowSeparation",
        onClick : () =>{
            eventHandler();}
    }, text);
};

const ChangePasswordSuccess = ({text}) =>{
    return React.createElement("span", {
        className: "bold",
        style: {
            color: "green"
        }
    }, text);
};

module.exports = {
    PasswordInput: PasswordInput,
    PasswordLabel: PasswordLabel,
    ChangePasswordLink: ChangePasswordLink,
    ChangePasswordSubmitButton: ChangePasswordSubmitButton,
    ChangePasswordSuccess: ChangePasswordSuccess
};
