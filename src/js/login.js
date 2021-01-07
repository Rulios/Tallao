'use strict';

require( "core-js/stable");
require("regenerator-runtime/runtime");

const $ = require("jquery");
const formVerification = require("./frontendModules/formVerification");
const page = require("./frontendModules/pageRedirection");
const {login} = require("./ajax-requests/log");

$(document).ready(function(){
    formVerification.invokeVerify("load", false);

    $("#inputEmail").change(function(e){
        let id = "inputEmail";
        if($("#inputEmail").val() === ""){
            formVerification.invokeVerify(id, false);
        }else{
            formVerification.invokeVerify(id, true);
        }
    });

    $("#inputPassword").change(function(e){
        let id = "inputPassword";
        if($("#inputPassword").val() === ""){
            formVerification.invokeVerify(id, false);
        }else{
            formVerification.invokeVerify(id, true);
        }
    });

    $("#frmUserLogin").submit(function(e){
        e.preventDefault();
    });

    $("#submitLoginLaundry").click(function(e){
        checkLoginAJAX("laundry");
    });

    $("#submitLoginUser").click(function(e){
        checkLoginAJAX("user");
    });

    $('#inputEmail').change(function(e){

        let email = $("#inputEmail").val();
        let id = "inputEmail";
        let verSame = false;
    
        if(validateEmail(email) == false){
            formVerification.deleteAppendError(id);
            formVerification.formAppendError(id, "¡Escribe un correo válido!" ,"red");
            
            formVerification.invokeVerify(id, false);
        }else{
            formVerification.deleteAppendError(id);
        }
    });  
});




function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function checkLoginAJAX(userType){
    let inputEmail = $("#inputEmail").val();
    let inputPassword = $("#inputPassword").val();
    console.log("Login");
    if(formVerification.invokeVerify("submit")){
        let obj = {
            inputEmail: inputEmail,
            inputPassword: inputPassword,
            userType: userType
        };
        
        let query =  login(obj);
        query.then(({data, status}) =>{
            if(status === 200){
                page.redirectToPanel(data.userType);
            }else{
                throw new Error("Can't login");
            }
            
        }).catch(err => {
            console.log(err);
            const id = "inputPassword";
            formVerification.deleteAppendError(id);
            formVerification.formAppendError(id, "El usuario o la contraseña no coinciden", "red");
        });
    }
}