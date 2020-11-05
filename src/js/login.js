'use strict';

const $ = require("jquery");
const formVerification = require("./frontendModules/formVerification");
const page = require("./frontendModules/pageRedirection");
const ajaxReqLog = require("./requestsModules/ajaxReqLog");

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

    $("#submitLoginSuperUser").click(function(e){
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

function convertStringToBoolean(string){
  let boolean = false;

  if(string === "true"){
    boolean = true;
  }else if(string === "false"){
    boolean = false;
  }

  return boolean;
}

function checkLoginAJAX(userType){
    let inputEmail = $("#inputEmail").val();
    let inputPassword = $("#inputPassword").val();
    
    if(formVerification.invokeVerify("submit")){
        let obj = {
            inputEmail: inputEmail,
            inputPassword: inputPassword,
            userType: userType
        };
        
        let query =  ajaxReqLog.login(obj);
        query.then(dataJSON =>{
            const id = "inputPassword";
            console.log(dataJSON);
            let data = JSON.parse(dataJSON);
         
            if(convertStringToBoolean(data.status)){
                page.loginRedirection(data.url);
            }else{
                formVerification.deleteAppendError(id);
                formVerification.formAppendError(id, "El usuario o la contraseña no coinciden", "red");
            }
        }).catch(err => console.error(err));
    }
}