"use strict";

require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        ChangePasswordComp : "./reactComponents/ChangePasswordComp"
    }
});

define(["react", "ChangePasswordComp"], function(React, ChangePasswordComp){

    /* This file contains middle level components, and the higher level container
    which handles all the operations and requests to change password */

    //middle level components 

    function FirstInputChangePassword({value, onChange, disabled}){ //renders the input container for actual password
        return(
            React.createElement("div", {className: "form-row formRowSeparation"},
                React.createElement("div", {className: "col-lg-12"},
                    [
                        React.createElement(ChangePasswordComp.PasswordLabel, {
                            key: "LabelActualPassword",
                            idFor: "inputActualPassword",
                            text: "Ingresa tu contraseña actual"
                        }),
                        React.createElement(ChangePasswordComp.PasswordInput, {
                            key: "inputActualPassword",
                            id:"inputActualPassword",
                            placeholder:"Contraseña actual",
                            value: value,
                            disabled: disabled,
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
                            text: "Ingresa una contraseña nueva"
                        }),
                        React.createElement(ChangePasswordComp.PasswordInput, {
                            key: "inputNewPassword",
                            id:"inputNewPassword",
                            placeholder:"Contraseña nueva",
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
                            text: "Reingresa la nueva contraseña"
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
        actualPassword, newPassword, rePassword, phase, inputHandler}){ //renders the three phases
            console.log(phase);
        return(
            [
                React.createElement(FirstInputChangePassword,{
                    key: "FirstInputChangePassword",
                    value: actualPassword,
                    disabled: phase.actualPassword,
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

    return InputChangePasswordsPhases;
});

