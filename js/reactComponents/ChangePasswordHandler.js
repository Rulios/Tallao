"use strict";

require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        ChangePasswordPhaseInputs : "./reactComponents/ChangePasswordPhaseInputs",
        ChangePasswordComp: "./reactComponents/ChangePasswordComp",
        ajaxReqUserCreds: "./requestsModules/ajaxReqUserCreds"
    }
});
define(["react", "ChangePasswordPhaseInputs", "ChangePasswordComp", "ajaxReqUserCreds"], 
function(React, ChangePasswordPhaseInputs, ChangePasswordComp, ajaxReq){
    
    function ChangePasswordLink({onClick}){
        return(
            React.createElement("div",{className: "row"},
                React.createElement("div", {
                    className: "col-lg-12"
                },
                    React.createElement(ChangePasswordComp.ChangePasswordLink,{
                        text: "Cambiar contraseña",
                        handleClick: () =>{
                            onClick();
                        }
                    })
                )
            )
        );
    }

    class ChangePassword extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                actualPassword: "",
                newPassword :"",
                rePassword: "",
                isShow: false,
                disabled: {
                    actualPassword: true,
                    newPassword: true,
                    rePassword: true,
                }
            }
        }

        toggleChangePassword(){
            this.setState({
                isShow: !this.state.isShow,
                disabled: {
                    actualPassword: false,
                    newPassword: true,
                    rePassword: true
                }
            });
        }

        async checkActualPassword(password){
            let query = await ajaxReq.verifyPassword({inputPassword:password});
            console.log(query);
        }

        inputHandlerPasswordPhase(value, passwordPhase){
            switch(passwordPhase){
                case "actualPassword":
                    this.checkActualPassword(value);
                    this.setState({actualPassword: value});
                break;

                case "newPassword":
                    this.setState({newPassword: value});
                break;

                case "rePassword":
                    this.setState({rePassword:value});
                break;
            }
        }

        render(){
            let el2Render = []

            el2Render.push(
                React.createElement(ChangePasswordLink,{
                    key: "ChangePasswordLink",
                    onClick: () =>{this.toggleChangePassword();}
                })
            );

            if(this.state.isShow){
                el2Render.push(
                    React.createElement(ChangePasswordPhaseInputs,{
                        key: "ChangePasswordPhaseInputs",
                        actualPassword: this.state.actualPassword,
                        newPassword: this.state.newPassword,
                        rePassword: this.state.rePassword,
                        phase: this.state.disabled,
                        inputHandler: (value, passwordPhase) =>{
                            this.inputHandlerPasswordPhase(value, passwordPhase);
                        }
                    })
                );
            }
            return el2Render.map(component =>{return component;});
        }
    }

    return ChangePassword;

});

