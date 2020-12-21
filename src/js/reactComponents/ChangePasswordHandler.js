"use strict";

const React= require("react");
const ChangePasswordPhaseInputs= require("./ChangePasswordPhaseInputs");
const ChangePasswordComp= require("./ChangePasswordComp");
const passwordLengthHandler= require("../frontendModules/passwordLengthHandler");
const {verifyPassword, newPassword}= require("../requestsModules/ajaxReqUserCreds");
const {bounceToLogin} = require("../frontendModules/pageRedirection");

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
    async checkActualPassword(){
        try{
            let {data: isSame} = await verifyPassword({inputPassword:this.state.actualPassword});
            this.setState({
                newPassword: "",
                disabled: {
                    actualPassword: false,
                    newPassword: !isSame,
                    rePassword: true
                }
            });
        }catch(err){
            console.error(err);
        }
        
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
                this.setState({actualPassword: value});
            break;

            case "newPassword":
                //prevent from writing when disabled
                if(!this.state.disabled.newPassword){
                    this.checkNewPassword(value);
                    this.setState({newPassword: value});
                }
            break;

            case "rePassword":
                if(!this.state.disabled.rePassword){
                    this.checkRePassword(value);
                    this.setState({rePassword: value});
                }
            break;
        }
    }

    updatePassword(){
        let that = this;
        newPassword({inputPassword: that.state.rePassword})
            .then(({status}) =>{
                if(status === 200){
                    alert("CONTRASEÑA CAMBIADA CON ÉXITO");
                    bounceToLogin();
                    /* passwordLengthHandler("changePasswordLink", undefined, "passwordUpdateSuccess");
                    that.resetComponentState(); */
                }
            }).catch(err =>{
                console.error(err);
            })
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
                    onBlurFirstInput: () => this.checkActualPassword(),
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

module.exports = ChangePassword;
