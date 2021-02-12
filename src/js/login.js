'use strict';

require( "core-js/stable");
require("regenerator-runtime/runtime");

const {appendError, deleteError} = require("./frontendModules/appendError");

const page = require("./frontendModules/pageRedirection");
const {login} = require("./ajax-requests/log");
const isEmail = require("validator/lib/isEmail");
const isEmpty = require("validator/lib/isEmpty");

const {getStaticText} =require("../../translation/frontend/translator");

window.onload = function(){

    const laundryLoginButton = document.getElementById("submitLoginLaundry");
    const userLoginButton = document.getElementById("submitLoginUser");

    const emailTextbox = document.getElementById("inputEmail");
    const passwordTextbox = document.getElementById("inputPassword");

    laundryLoginButton.addEventListener("click", function(e){
        checkLoginAJAX("laundry");
    });

    userLoginButton.addEventListener("click", function(e){
        checkLoginAJAX("user");
    });

    emailTextbox.addEventListener("change", function(e){
        let email = emailTextbox.value;
        let id = "inputEmail";

        if(isEmail(email)){
            deleteError(id);
        }else{
            deleteError(id);
            appendError(id, getStaticText("WriteACorrectEmail") ,"red");
        }
    }); 

    
    function checkLoginAJAX(userType){
        let inputEmail = emailTextbox.value;
        let inputPassword = passwordTextbox.value;


        if(!isEmpty(inputEmail) && !isEmpty(inputPassword)){
            let obj = {
                inputEmail: inputEmail,
                inputPassword: inputPassword,
                userType: userType
            };

        
            login(obj).then(({data, status}) =>{
                if(status === 200){
                    page.redirectToPanel(data.userType);
                }else{
                    throw new Error("Can't login");
                }
                
            }).catch(err => {
                console.log(err);
                wrongCredentialsError();
            });
        }else{
            emptyCredentialsError();
        }

        
    }

};

function wrongCredentialsError(){
    const id = "inputPassword";
    deleteError(id);
    appendError(id, getStaticText("ERR_WRONG_CREDENTIALS"), "red");
}

function emptyCredentialsError(){
    const id = "inputPassword";
    deleteError(id);
    appendError(id, getStaticText("emptyLoginCredentials"), "red");
}

