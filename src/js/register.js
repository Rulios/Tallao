'use strict';

require( "core-js/stable");
require("regenerator-runtime/runtime");

const $ = require("jquery");
const formVerification = require("./frontendModules/formVerification");
const {appendError, deleteError} = require("./frontendModules/appendError");


const {email: existsEmail, laundryInitials: existsLaundryInitials} = require("./ajax-requests/check-exists");
const {registerLaundry, registerUser} = require("./ajax-requests/register");
const passwordHandler = require("./frontendModules/passwordHandler");
const isEmail = require("validator/lib/isEmail");
const isEmpty = require("validator/lib/isEmpty");


let userType = "";


$(document).ready(function(){

    let pathLocation = window.location.pathname;
    if(pathLocation === "/laundryRegister"){
        //needs authentication & authorization mechanism
        userType = "laundry";
    }else if(pathLocation === "/register"){
        userType = "user";
    }    



    $("#submitUserRegister").click(async function(e){

        let name = capitalizeFirstLetter($("#inputName").val());
        let surname = capitalizeFirstLetter($("#inputSurname").val());
        let email = $("#inputEmail").val();
        let password = $("#inputPassword").val();
        let targetMarket = $("#inputTargetMarket").val();

        let user = {
            name: name,
            surname: surname,
            email: email,
            password: password,
            targetMarket: targetMarket
        };

        try{
            let {data, status} = await registerUser(user);

            if(status === 200){
                $("#frmUserRegister").toggleClass("hide");
                $("#congrSection").toggleClass("hide");
            }
        }catch(err){
            console.error(err);
            alert("¡DEBES ASEGURARTE QUE TODOS LOS CAMPOS ESTÉN LLENOS!");
        }


    });


    $("#submitLaundryRegister").click(async function(e){

        try{
            let laundry = {
                initials : $("#inputInitials").val(),
                laundryName : $("#inputLaundryName").val(),
                location : $("#inputLocation").val(),
                name : capitalizeFirstLetter($("#inputName").val()),
                surname : capitalizeFirstLetter($("#inputSurname").val()),
                email : $("#inputEmail").val(),
                password : $("#inputPassword").val()
            };
            
            let {status} = await registerLaundry(laundry);
            if(status == 200){
                $("#frmMasterUserRegister").toggleClass("hide");
                $("#congrSection").toggleClass("hide");
            }
        }catch(err){
            console.error(err);
            alert("¡DEBES ASEGURARTE QUE TODOS LOS CAMPOS ESTÉN LLENOS!");
        }
    });


    $('#inputName').change(function(e){
        let id = "inputName";
        let name = $('#inputName').val();
        let msg = "Escribe un nombre correcto";
    
        deleteError(id);
        if((name === "") || (name.length < 3)){
          appendError(id, msg, "red");
        }else{
          deleteError(id);
        }
    });


    $('#inputSurname').change(function(e){
        let id = "inputSurname";
        let surName = $('#inputSurname').val();
        let msg = "Escribe un apellido correcto";
    
        deleteError(id);
        if((surName === "") || (surName.length < 2)){
          appendError(id, msg, "red");
        }else{
          deleteError(id);
        }
    });


    $('#inputEmail').change(function(e){
        let email = $("#inputEmail").val();
        let id = "inputEmail";

        if(!isEmail(email)){
          deleteError(id);
          appendError(id, "¡Escribe un correo válido!" ,"red");
        }else{

            existsEmail({
                inputEmail: $("#inputEmail").val(),
                userType: userType
            }).then(({data: {exists}}) =>{
                if(exists){
                    deleteError(id);
                    appendError(id, "¡El correo existe!" , "red");
                }else{
                    deleteError(id);
                    appendError(id, "¡Correo válido!", "green");

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
          deleteError(id);
          appendError(id, msg, "red");
        }else{
          deleteError(id);
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
            appendError(id, msg, "red");
        }else{
            deleteError(id);
        }
    });


    $("#inputLocation").change(function(){
        let id= "inputLocation";
        let msg = "Escribe una ubicación válida";
    
        if($("#inputLocation").val().length < 50){
            appendError(id, msg, "red");
        }else{
            deleteError(id);
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

            existsLaundryInitials({
                inputInitials: $("#inputInitials").val()
            })
            .then(({data : {exists}}) =>{
            
                if(exists){
                    deleteError(id);
                    appendError(id, msg.msg1 , "red");
                }else{
                    deleteError(id);
                    appendError(id, msg.msg2 , "green");
                }
            }).catch(err => {
                
            });

        }else{ //when it doesn't has any input value
            deleteError(id);
            appendError(id, msg.msg3 , "red");
        }
    });
});


function capitalizeFirstLetter(string) { 

    if(!isEmpty(string)){
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
    
}


    

