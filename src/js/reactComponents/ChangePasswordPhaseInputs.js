"use strict";

const React = require("react");
const ChangePasswordComp = require("./ChangePasswordComp");
const {getStaticText} = require("../../../translation/frontend/translator");

/* This file contains middle level components, and the higher level container
which handles all the operations and requests to change password */

//middle level components 

function FirstInputChangePassword({value, onChange,onBlur, disabled}){ //renders the input container for actual password
    return(
        React.createElement("div", {className: "form-row formRowSeparation"},
            React.createElement("div", {className: "col-lg-12"},
                [
                    React.createElement(ChangePasswordComp.PasswordLabel, {
                        key: "LabelActualPassword",
                        idFor: "inputActualPassword",
                        text: getStaticText("enterYourActualPassword")
                    }),
                    React.createElement(ChangePasswordComp.PasswordInput, {
                        key: "inputActualPassword",
                        id:"inputActualPassword",
                        placeholder: getStaticText("actualPassword"),
                        value: value,
                        disabled: disabled,
                        onBlur: (e) => onBlur(),
                        onChange: (password) =>{
                            onChange(password, "actualPassword");
                        }
                    })
                ]
            )
        )
    );
}

function SecondInputChangePassword({value, onChange, disabled}){ //renders the input container for new password
    return(
        React.createElement("div", {className: "form-row formRowSeparation"},
            React.createElement("div", {className: "col-lg-12"},
                [
                    React.createElement(ChangePasswordComp.PasswordLabel, {
                        key: "LabelNewPassword",
                        idFor: "inputNewPassword",
                        text: getStaticText("enterANewPassword")
                    }),
                    React.createElement(ChangePasswordComp.PasswordInput, {
                        key: "inputNewPassword",
                        id:"inputNewPassword",
                        placeholder: getStaticText("newPassword"),
                        value: value,
                        disabled: disabled,
                        onChange: (password) =>{
                            onChange(password, "newPassword");
                        }
                    })
                ]
            )
        )
    );
}

function ThirdInputChangePassword({value, onChange, disabled}){ //renders the input container for re-entering password
    return(
        React.createElement("div", {className: "form-row formRowSeparation"},
            React.createElement("div", {className: "col-lg-12"},
                [
                    React.createElement(ChangePasswordComp.PasswordLabel, {
                        key: "LabelRePassword",
                        idFor: "inputRePassword",
                        text: getStaticText("reEnterTheNewPassword")
                    }),
                    React.createElement(ChangePasswordComp.PasswordInput, {
                        key: "inputRePassword",
                        id:"inputRePassword",
                        placeholder:"",
                        value: value,
                        disabled: disabled,
                        onChange: (password) =>{
                            onChange(password, "rePassword");
                        }
                    })
                ]
            )
        )
    );
}

/* ince this components doesn't handles the states, the higher component
passes a function called inputHandler that requires the text value 
and the passwordPhase, which will explain from what origin it's coming. */

function InputChangePasswordsPhases({
    actualPassword, newPassword, rePassword, phase, inputHandler, onBlurFirstInput}){ //renders the three phases
    return(
        [
            React.createElement(FirstInputChangePassword,{
                key: "FirstInputChangePassword",
                value: actualPassword,
                disabled: phase.actualPassword,
                onBlur: () =>onBlurFirstInput(),
                onChange: (value, passwordPhase) =>{inputHandler(value, passwordPhase);}
            }, null),
            React.createElement(SecondInputChangePassword, {
                key:"SecondInputChangePassword",
                value: newPassword,
                disabled: phase.newPassword,
                onChange: (value, passwordPhase) =>{inputHandler(value, passwordPhase);}
            }, null),
            React.createElement(ThirdInputChangePassword, {
                key:"ThirdInputChangePassword",
                value: rePassword,
                disabled: phase.rePassword,
                onChange: (value, passwordPhase) =>{inputHandler(value, passwordPhase);}
            })
        ]
    );
}

module.exports =  InputChangePasswordsPhases;

