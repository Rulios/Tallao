'use strict';
require.config({
    paths:{
        jquery: [
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
            "./lib/jquery"],
        formVerification:["frontendModules/formVerification"],
        design: "design.new",
        bootstrap: ["./lib/bootstrap.bundle.min"]
    },
    shim: {
        bootstrap: {
            deps: ["jquery"]
        },
        
    }
});

require(["jquery", "formVerification","bootstrap", "design"],
function($, formVerification){

    (function(){

        $(document).ready(function(){

            let pathLocation = window.location.pathname;
            if((pathLocation === "/Tallao/masterRegister.html") || (pathLocation === "masterRegister.html")){
                formVerification.setUserType("superuser");
            }else if((pathLocation === "/Tallao/register.html") || (pathLocation === "register.html")){
                formVerification.setUserType("user");
            }    

            formVerification.invokeVerify("load", false);

            ///events

            $("#frmUserRegister").submit(function(e){
                e.preventDefault();
                formVerification.invokeVerify("submit", false);
                
                if(!$("#submitRegister").hasClass("disableButton")){
                    require(["./requestsModules/ajaxReqRegister"], function(ajaxRegister){
                        let obj = {
                            id : makeid(5),
                            inputName : capitalizeFirstLetter($("#inputName").val()),
                            inputLastname : capitalizeFirstLetter($("#inputLastname").val()),
                            inputEmail : $("#inputEmail").val(),
                            inputPassword : $("#inputPassword").val(),
                            inputTargetMarket : $("#inputTargetMarket").val()
                        };
                        
                        let query =  ajaxRegister.registerUser(obj);
                        query.then((data) => {
                            $("#frmUserRegister").toggleClass("hide");
                            $("#congrSection").toggleClass("hide");
                        })
                        .catch(err => console.error(err));
                    });
                }
            });


            $("#frmMasterUserRegister").submit(function(e){
                e.preventDefault();
                formVerification.invokeVerify("submit", false);

                if(!$("#submitRegister").hasClass("disableButton")){
                    require(["./requestsModules/ajaxReqRegister"], function(ajaxRegister){
                        let initials = $("#inputInitials").val();
                        let obj = {
                            inputInitials : $("#inputInitials").val(),
                            inputLaundryName : $("#inputLaundryName").val(),
                            inputLocation : $("#inputLocation").val(),
                            inputName : capitalizeFirstLetter($("#inputName").val()),
                            inputLastname : capitalizeFirstLetter($("#inputLastname").val()),
                            inputEmail : $("#inputEmail").val(),
                            inputPassword : $("#inputPassword").val()
                        };
                        
                        let query =  ajaxRegister.registerSuperUser(obj);
                        query.then(data =>{
                            $("#frmMasterUserRegister").toggleClass("hide");
                            $("#congrSection").toggleClass("hide");
                        })
                        .catch(err => console.error(err));
                    });
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


            $('#inputLastname').change(function(e){
                let id = "inputLastname";
                let lastName = $('#inputLastname').val();
                let msg = "Escribe un apellido correcto";
            
                formVerification.deleteAppendError(id);
                if((lastName === "") || (lastName.length < 2)){
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
            
                if(!validateEmail(email)){
                  formVerification.deleteAppendError(id);
                  formVerification.formAppendError(id, "¡Escribe un correo válido!" ,"red");
                  formVerification.invokeVerify(id, false);
                }else{

                    require(["./requestsModules/ajaxReqCheckExists"], function(ajaxCheckExists){
                        let query = ajaxCheckExists.email({
                            inputEmail: $("#inputEmail").val(),
                            userType: formVerification.getUserType()
                        });
                        query.then(dataJSON =>{
                            let data = JSON.parse(dataJSON);
                            //convert to integer to evaluate on if
                            data["length"] = parseInt(data["length"]);
                        
                            if(data["length"]){
                                formVerification.deleteAppendError(id);
                                formVerification.formAppendError(id, "¡El correo existe!" , "red");
                                formVerification.invokeVerify(id, false);
                            }else{
                                formVerification.deleteAppendError(id);
                                formVerification.invokeVerify(id, true);
                            }
                        }).catch(err => console.error(err));
                    });
                }
            });


            $("#inputPassword").on("input", function(){
                let id = "inputPassword";
                let text = $("#inputPassword").val();
                require(["./frontendModules/passwordHandle"], function(passwordHandle){
                    passwordHandle.passwordCategorization(id, text);
                });
            });


            $("#inputPassword").change(function(e){
                //trigger the rePass change to recheck same password
                $("#inputRePassword").change();
            });


            $("#inputRePassword").change(function(e){
                let id = "inputRePassword";
                let inputPassword = $("#inputPassword").val();
                let inputRePassword = $("#inputRePassword").val();
                require(["./frontendModules/passwordHandle"], function(passwordHandle){
                    passwordHandle.rePasswordVerify(id,inputPassword,inputRePassword);
                });
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

                    require(["./requestsModules/ajaxReqCheckExists"], function(ajaxCheckExists){
                        let query = ajaxCheckExists.laundryInitials({
                            inputInitials: $("#inputInitials").val()
                        });
                        query.then(dataJSON =>{
                            let data = JSON.parse(dataJSON);
                            //convert to integer to evaluate on if
                            data["length"] = parseInt(data["length"]);
                        
                            if(data["length"]){
                                formVerification.deleteAppendError(id);
                                formVerification.formAppendError(id, msg.msg1 , "red");
                                formVerification.invokeVerify(id, false);
                            }else{
                                formVerification.deleteAppendError(id);
                                formVerification.formAppendError(id, msg.msg2 , "green");
                                formVerification.invokeVerify(id, true);
                            }
                        }).catch(err => console.error(err));
                        
                    });

                }else{ //when it doesn't has any input value
                    formVerification.deleteAppendError(id);
                    formVerification.formAppendError(id, msg.msg3 , "red");
                    formVerification.invokeVerify(id, false);
                }
            });
        });


        //use-once-in-file functions

        function makeid(length) {
            const charLoopLength = 3;
            const numLoopLength = 2;
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            const num = '0123456789';
            let result = '';
            let char = "";
            let numSelected = "";
            let charactersLength = characters.length;
            let numLength = num.length;
          
            for ( var i = 0; i < charLoopLength; i++ ) {
                char += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            for ( var i = 0; i < numLoopLength; i++ ) {
                numSelected += num.charAt(Math.floor(Math.random() * numLength));
            }
          
            result = char + numSelected;
            return result.toUpperCase();
        }


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
        
        
        function validateEmail(email) {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    })();
});

    

