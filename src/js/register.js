'use strict';

require( "core-js/stable");
require("regenerator-runtime/runtime");

const $ = require("jquery");
const formVerification = require("./frontendModules/formVerification");
const ajaxCheckExists = require("./requestsModules/ajaxReqCheckExists");
const ajaxRegister = require("./requestsModules/ajaxReqRegister");
const passwordHandler = require("./frontendModules/passwordHandler");
const isEmail = require("validator/lib/isEmail");
const validator = require("validator");

$(document).ready(function(){

    let pathLocation = window.location.pathname;
    if(pathLocation === "/laundryRegister"){
        //needs authentication & authorization mechanism
        formVerification.setUserType("laundry");
    }else if(pathLocation === "/register"){
        formVerification.setUserType("user");
    }    

    formVerification.invokeVerify("load", false);


    $("#frmUserRegister").submit(function(e){
        e.preventDefault();
        formVerification.invokeVerify("submit", false);
        
        if(!$("#submitRegister").hasClass("disableButton")){
            let obj = {
                name : capitalizeFirstLetter($("#inputName").val()),
                surname : capitalizeFirstLetter($("#inputSurname").val()),
                email : $("#inputEmail").val(),
                password : $("#inputPassword").val(),
                targetMarket : $("#inputTargetMarket").val()
            };
            
            let query =  ajaxRegister.registerUser(obj);
            query.then((data) => {
                $("#frmUserRegister").toggleClass("hide");
                $("#congrSection").toggleClass("hide");
            }).catch(err => console.error(err));
        }
    });


    $("#frmMasterUserRegister").submit(function(e){
        e.preventDefault();
        formVerification.invokeVerify("submit", false);

        if(!$("#submitRegister").hasClass("disableButton")){
            let obj = {
                initials : $("#inputInitials").val(),
                laundryName : $("#inputLaundryName").val(),
                location : $("#inputLocation").val(),
                name : capitalizeFirstLetter($("#inputName").val()),
                surname : capitalizeFirstLetter($("#inputSurname").val()),
                email : $("#inputEmail").val(),
                password : $("#inputPassword").val()
            };
            
            let query =  ajaxRegister.registerLaundry(obj);
            query.then(({status}) =>{
                if(status == 200)
                    $("#frmMasterUserRegister").toggleClass("hide");
                    $("#congrSection").toggleClass("hide");
            })
            .catch(err => console.error(err));
        }
    });


    $('#inputName').change(function(e){
        let id = "inputName";
        let name = $('#inputName').val();
        let msg = "Escribe un nombre correcto";
    
        formVerification.deleteAppendError(id);
        if((name === "") || (name.length < 3)){
          formVerification.formAppendError(id, msg, "red");
          formVerification.invokeVerify(id, false);
        }else{
          formVerification.deleteAppendError(id);
          formVerification.invokeVerify(id, true);
        }
    });


    $('#inputSurname').change(function(e){
        let id = "inputSurname";
        let surName = $('#inputSurname').val();
        let msg = "Escribe un apellido correcto";
    
        formVerification.deleteAppendError(id);
        if((surName === "") || (surName.length < 2)){
          formVerification.formAppendError(id, msg, "red");
          formVerification.invokeVerify(id, false);
        }else{
          formVerification.deleteAppendError(id);
          formVerification.invokeVerify(id, true);
        }
    });


    $('#inputEmail').change(function(e){
        let email = $("#inputEmail").val();
        let id = "inputEmail";

        if(!isEmail(email)){
          formVerification.deleteAppendError(id);
          formVerification.formAppendError(id, "¡Escribe un correo válido!" ,"red");
          formVerification.invokeVerify(id, false);
        }else{

            let query = ajaxCheckExists.email({
                inputEmail: $("#inputEmail").val(),
                userType: formVerification.getUserType()
            });
            query.then(data =>{
                //convert to integer to evaluate on if
                if(data.exists){
                    formVerification.deleteAppendError(id);
                    formVerification.formAppendError(id, "¡El correo existe!" , "red");
                    formVerification.invokeVerify(id, false);
                }else{
                    formVerification.deleteAppendError(id);
                    formVerification.formAppendError(id, "¡Correo válido!", "green");
                    formVerification.invokeVerify(id, true);

                }
            }).catch(err => console.error(err));
        }
    });


    $("#inputPassword").on("input", function(){
        let id = "inputPassword";
        let text = $("#inputPassword").val();
        passwordHandler.passwordCategorization(id, text);
    });


    $("#inputPassword").change(function(e){
        //trigger the rePass change to recheck same password
        $("#inputRePassword").change();
    });


    $("#inputRePassword").change(function(e){
        let id = "inputRePassword";
        let inputPassword = $("#inputPassword").val();
        let inputRePassword = $("#inputRePassword").val();
        passwordHandler.rePasswordVerify(id,inputPassword,inputRePassword);
    });


    $("#inputTargetMarket").change(function(e){
        const id = "inputTargetMarket";
        const inputTargetMarket = $("#inputTargetMarket").val();
        const msg = "Escoge una opción";
    
        if(inputTargetMarket == "none"){
          formVerification.deleteAppendError(id);
          formVerification.formAppendError(id, msg, "red");
          formVerification.invokeVerify(id, false);
        }else{
          formVerification.deleteAppendError(id);
          formVerification.invokeVerify(id,true);
        }
    });
    
    
    $("#inputLaundryName").focus(function(){
        $("#inputLaundryName").change();
    });


    $("#inputLaundryName").change(function(){ 
        const id = "inputLaundryName";
        let startString = "Lavandería" + " ";
        let startStringLength = startString.length;
        let minLength = startStringLength + 2;
        let msg = "Escribe el nombre de la lavandería";
    
        if($("#inputLaundryName").val().search(startString) == -1){
            $("#inputLaundryName").val(startString + $("#inputLaundryName").val());
        }
    
        if($("#inputLaundryName").val().length < minLength){
            formVerification.formAppendError(id, msg, "red");
            formVerification.invokeVerify(id, false);
        }else{
            formVerification.deleteAppendError(id);
            formVerification.invokeVerify(id, true);
        }
    });


    $("#inputLocation").change(function(){
        let id= "inputLocation";
        let msg = "Escribe una ubicación válida";
    
        if($("#inputLocation").val().length < 50){
            formVerification.formAppendError(id, msg, "red");
            formVerification.invokeVerify(id, false);
        }else{
            formVerification.deleteAppendError(id);
            formVerification.invokeVerify(id, true);
        }
    });


    $("#inputInitials").on("input", function(){
        $("#inputInitials").val($("#inputInitials").val().toUpperCase());
    });


    $("#inputInitials").change( function(){
        const id = "inputInitials";
        const msg = {
            msg1: "¡Abreviatura existente! Escribe otra",
            msg2: "¡Abreviatura válida!",
            msg3: "Ingrese una Abreviatura válida"
        };
    
        //data validation
        if($("#inputInitials").val()){

            let query = ajaxCheckExists.laundryInitials({
                inputInitials: $("#inputInitials").val()
            });
            query.then(data =>{
            
                if(data.exists){
                    formVerification.deleteAppendError(id);
                    formVerification.formAppendError(id, msg.msg1 , "red");
                    formVerification.invokeVerify(id, false);
                }else{
                    formVerification.deleteAppendError(id);
                    formVerification.formAppendError(id, msg.msg2 , "green");
                    formVerification.invokeVerify(id, true);
                }
            }).catch(err => {
                
            });

        }else{ //when it doesn't has any input value
            formVerification.deleteAppendError(id);
            formVerification.formAppendError(id, msg.msg3 , "red");
            formVerification.invokeVerify(id, false);
        }
    });
});


function capitalizeFirstLetter(string) { 
    //set all string to lowCase
    let arr = [];
    let result = "";
    string = string.toLowerCase().trim();
    arr = string.split(" ");
  
    arr.map(function(value, i){
        result += arr[i][0].toUpperCase() + value.slice(1) + " ";
    });
    return result;
}


    

