"use strict";

require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        ChangePasswordPhaseInputs : "./reactComponents/ChangePasswordPhaseInputs",
        ChangePasswordComp: "./reactComponents/ChangePasswordComp",
        passwordLengthHandler: "./frontendModules/passwordLengthHandler",
        ajaxReqUserCreds: "./requestsModules/ajaxReqUserCreds"
    }
});
define(["react", "ChangePasswordPhaseInputs",
 "ChangePasswordComp", "ajaxReqUserCreds", "passwordLengthHandler"], 
function(React, ChangePasswordPhaseInputs, 
    ChangePasswordComp, ajaxReq, passwordLengthHandler){
    
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
                },
                canSubmit: false
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

        //enables or disables the second phase (new password)
        async checkActualPassword(password){
            let query = await ajaxReq.verifyPassword({inputPassword:password});
            let isSame = false;
            if(query === "true"){
                isSame = false;
            }else{
                isSame = true;
            }
            this.setState({
                newPassword: "",
                disabled: {
                    actualPassword: false,
                    newPassword: isSame,
                    rePassword: true
                }
            });
        }

        //enables or disables the third phase (repeat password)
        checkNewPassword(password){
            if(password !== this.state.actualPassword){
                this.setState({
                    disabled:{
                        actualPassword: false,
                        newPassword: false,
                        rePassword: !passwordLengthHandler("inputNewPassword",password)
                    }
                });
            }else{
                passwordLengthHandler("inputNewPassword", password, "new");
                this.setState({
                    rePassword: "",
                    disabled:{
                        actualPassword: false,
                        newPassword: false,
                        rePassword: true
                    }
                });
            }
        }
        //check if new password equals the repeated introduced password
        checkRePassword(password){
            if(password === this.state.newPassword){
                passwordLengthHandler("inputRePassword", password, "repeatTrue");
                this.setState({canSubmit: true});
            }else{
                passwordLengthHandler("inputRePassword", password, "repeatFalse");
                this.setState({canSubmit: false});
            }
            
        }

        inputHandlerPasswordPhase(value, passwordPhase){
            switch(passwordPhase){
                case "actualPassword":
                    this.checkActualPassword(value);
                    this.setState({
                        actualPassword: value});
                break;

                case "newPassword":
                    this.checkNewPassword(value);
                    this.setState({newPassword: value});
                break;

                case "rePassword":
                    this.checkRePassword(value);
                    this.setState({rePassword:value});
                break;
            }
        }

        updatePassword(){
            let that = this;
            require(["./requestsModules/ajaxReqUserCreds"],  function(ajaxReq){
                ajaxReq.newPassword({inputPassword: that.state.rePassword})
                .then(response =>{
                    if(response === "true"){
                        passwordLengthHandler("changePasswordLink", undefined, "passwordUpdateSuccess");
                        that.resetComponentState();
                    }
                }).catch(err =>{
                    console.error(err);
                })
            });
        }

        resetComponentState(){
            this.setState({
                actualPassword: "",
                newPassword :"",
                rePassword: "",
                isShow: false,
                disabled: {
                    actualPassword: true,
                    newPassword: true,
                    rePassword: true,
                },
                canSubmit: false
            });
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

            if(this.state.canSubmit){
                el2Render.push(
                    React.createElement(ChangePasswordComp.ChangePasswordSubmitButton, {
                        key:"submitChangePassword",
                        text: "Cambiar contraseña",
                        eventHandler: () =>{this.updatePassword();}
                    })
                );  
            }
            return el2Render.map(component =>{return component;});
        }
    }

    return ChangePassword;

});

