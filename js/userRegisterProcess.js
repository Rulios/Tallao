var verification = {};
var status = "";
$(document).ready(function () {

  console.log(window.location.pathname);
  
  if((window.location.pathname === "/Tallao/masterRegister.html") || (window.location.pathname === "masterRegister.html")){
      
      formVerification.setUserType("superuser");

  }else if((window.location.pathname === "/Tallao/register.html") || (window.location.pathname === "register.html")){
      
      formVerification.setUserType("user");
  }

  

  formVerification.invokeVerify("load", false);

  $("#frmUserRegister").submit(function(e){

    

    formVerification.invokeVerify("submit", false);
    e.preventDefault();

    //Securities issue solver

    if(formVerification.invokeVerify("submit")){

      let id = makeid(5);
      let inputName = capitalizeFirstLetter($("#inputName").val());
      let inputLastname = capitalizeFirstLetter($("#inputLastname").val());
      let inputEmail = $("#inputEmail").val();
      let inputPassword = $("#inputPassword").val();
      let inputTargetMarket = $("#inputTargetMarket").val();



      var obj = {
        id : id,
        inputName: inputName,
        inputLastname:inputLastname,
        inputEmail: inputEmail,
        inputPassword: inputPassword,
        inputTargetMarket : inputTargetMarket,
      };
      
      $.ajax({
        type: "POST",
        url: "./php/register.php",
        data: 
        {
        id : id,
        inputName: inputName,
        inputLastname: inputLastname,
        inputEmail: inputEmail,
        inputPassword: inputPassword,
        inputTargetMarket : inputTargetMarket
        }
        ,
    
        success: function (response) {
          console.log("enviado");
          console.log(obj);
          $("#frmUserRegister").toggleClass("hide");
          $("#congrSection").toggleClass("hide");
          
        },

        error: function(jqXHR, status, error){

          console.log('Status: ' + status);
          console.log('Error ' + error);
          alert("Error " + status + error);

        }
        
      });

    }

  });

  $("#frmMasterUserRegister").submit(function(e){

    e.preventDefault();

    //Securities issue solver

    if(formVerification.invokeVerify("submit")){

      let initials = $("#inputInitials").val();
      let inputLaundryName = $("#inputLaundryName").val();
      let inputLocation = $("#inputLocation").val();
      let inputName = capitalizeFirstLetter($("#inputName").val());
      let inputLastname = capitalizeFirstLetter($("#inputLastname").val());
      let inputEmail = $("#inputEmail").val();
      let inputPassword = $("#inputPassword").val();
        
      $.ajax({
        type: "POST",
        url: "./php/masterRegister.php",
        data: 
        {
        inputInitials : initials,
        inputLaundryName: inputLaundryName,
        inputLocation: inputLocation,
        inputName: inputName,
        inputLastname: inputLastname,
        inputEmail: inputEmail,
        inputPassword: inputPassword
        }
        ,
    
        success: function (response) {

          //input a obligatory tag

          let obligatoryFirstCustomMsg = {};

          let firstCustomMsgID = initials + "1";
          obligatoryFirstCustomMsg[firstCustomMsgID] = {};

          obligatoryFirstCustomMsg[firstCustomMsgID]["msgTagName"] = "Sin pliegue / 不折";
          obligatoryFirstCustomMsg[firstCustomMsgID]["msgColor"] = "white";
          obligatoryFirstCustomMsg[firstCustomMsgID]["msgText"] = "Sin pliegue";
          obligatoryFirstCustomMsg[firstCustomMsgID]["status"] = "blocked";

          let str = JSON.stringify(obligatoryFirstCustomMsg);
          console.log(str);
          $.ajax({
            type: "POST",
            url: "./php/submitUpdateCustomMessage.php",
            data: {initials: initials, messageObj: str},
            
            success: function (response) {
              
              console.log("enviado");
              $("#frmMasterUserRegister").toggleClass("hide");
              $("#congrSection").toggleClass("hide");

            },


            error: function(jqXHR, status, error){

              console.log('Status: ' + status);
              console.log('Error ' + error);
              alert("Error " + status + error);
    
            }

          });
        },

        error: function(jqXHR, status, error){

          console.log('Status: ' + status);
          console.log('Error ' + error);
          alert("Error " + status + error);

        }
        
      });
    }
    
  });



  $('#inputName').change(function(e){

    let id = "inputName";
    let name = $('#inputName').val();
    let msg = "Escribe un nombre correcto";


    formVerification.deleteAppendError(id);
    if((name == "") || (name.length < 3)){
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
    if((lastName == "") || (lastName.length < 2)){
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

      checkRepEmail(email).then(data => {
        //convert to integer to evaluate on if
        data["length"] = parseInt(data["length"]);

        if(data["length"]){
          formVerification.deleteAppendError(id);
          formVerification.formAppendError(id, "¡El correo existe!", "red");
          formVerification.invokeVerify(id, false);
        }else{
          formVerification.deleteAppendError(id);
          formVerification.invokeVerify(id, true);
        }

      }).catch(err => console.error(err));
      
    }
  });

  $("#inputPassword").on('input', function(){
    let id = "inputPassword";
    let weakLength = 6;
    let mediumLength = 10;
    let strongLength = 14;
    let actualLength = $("#inputPassword").val().length;
    let msg = {
      msg1: "Contraseña muy débil, inserta una contraseña más fuerte",
      msg2: "Contraseña moderada",
      msg3: "Contraseña moderadamente fuerte",
      msg4: "Contraseña fuerte"
    };

    formVerification.deleteAppendError(id);

    switch (true) {

      case (actualLength < weakLength):
          formVerification.formAppendError(id, msg.msg1, "red");
          formVerification.invokeVerify(id, false);
      break;
    
      case ((actualLength >= weakLength) && (actualLength <= mediumLength)):
          formVerification.formAppendError(id, msg.msg2, "yellow");
          formVerification.invokeVerify(id, true);
      break;

      case ((actualLength > mediumLength) && (actualLength <= strongLength)):
          formVerification.formAppendError(id, msg.msg3, "yellowGreen");
          formVerification.invokeVerify(id, true);
      break;

      case (actualLength > strongLength):
          formVerification.formAppendError(id, msg.msg4, "green");
          formVerification.invokeVerify(id, true);
      break;
    }

    

  });

  $("#inputPassword").change(function(e){

    //trigger the rePass change to recheck same password
    $("#inputRePassword").change();

  });


  $("#inputRePassword").change(function(e){
    let id = "inputRePassword";
    let inputPassword = $("#inputPassword").val();
    let inputRepassword = $("#inputRePassword").val();
    let msg = {
      msg1: "¡Las contraseñas no coinciden!",
      msg2: "¡Las contraseñas coinciden!"
    };

    formVerification.deleteAppendError(id);
    if(inputRepassword != inputPassword){
      formVerification.formAppendError(id, msg.msg1, "red");
      formVerification.invokeVerify(id, false);
    }else{
      formVerification.formAppendError(id, msg.msg2, "green");
      formVerification.invokeVerify(id, true);
    }
  });


  $("#inputTargetMarket").change(function(e){

    let id = "inputTargetMarket";
    let inputTargetMarket = $("#inputTargetMarket").val();
    let msg = "Escoge una opción";

    

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
    
    let id = "inputLaundryName";
    let startString = "Lavandería" + " ";
    let startStringLength = startString.length;
    
    let minLength = startStringLength + 2;

    if($("#inputLaundryName").val().search(startString) == -1){
      $("#inputLaundryName").val("");
      $("#inputLaundryName").val(startString);
    }
  });

  $("#inputLaundryName").change(function(){ 
    let id = "inputLaundryName";
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

    let id = "inputInitials";
    let msg = {
      msg1: "¡Abreviatura existente! Escribe otra",
      msg2: "¡Abreviatura válida!",
      msg3: "Ingrese una Abreviatura válida"
    };

    //data validation
    if($("#inputInitials").val() !== ""){

      checkRepInitials($("#inputInitials").val()).then(data =>{
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
      })
      .catch(err => console.error(err));

    }else{ //when it doesn't has any input value
      formVerification.deleteAppendError(id);
      formVerification.formAppendError(id, msg.msg3 , "red");
      formVerification.invokeVerify(id, false);
    }

    
  });


});


function makeid(length) {

  let charLoopLength = 3;
  let numLoopLength = 2;
  let result = '';
  let char = "";
  let numSelected = "";
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let num = '0123456789'
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

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function checkRepEmail(email){

  return $.ajax({
    type: "POST",
    url: "./php/checkRepEmail.php",
    data: {
      inputEmail: email,
      userType: formVerification.getUserType()
    },
    dataType: 'json',
  })  

}

function checkRepInitials(initials, callbackResult){

  return $.ajax({
    type: "POST",
    url: "./php/checkRepInitials.php",
    data: {inputInitials: initials},
    dataType: 'json',
    error: function(jqXHR, status, error){

      console.log('Status: ' + status);
      console.log('Error ' + error);
      alert("Error " + status + error);

    }
  });

}
function capitalizeFirstLetter(string) { 
  //set all string to lowCase
  let arr = [];
  let result = "";
  string = string.toLowerCase();
  string = string.trim();
  arr = string.split(" ");

  for(let i = 0; i < arr.length; i++){
    result += arr[i][0].toUpperCase() + arr[i].slice(1) + " "; 
  }

  return result;
} 


var formVerification  = (function(){
  'use strict';

  let fieldVerification = {};

  let userType = "";

  function setUserType(type){

    //data validation and set the fields to verify
    if(type === "superuser"){

      fieldVerification = {
        inputLaundryName: false,
        inputLocation: false,
        inputName: false,
        inputLastname : false,
        inputEmail: false,
        inputPassword: false,
        inputRePassword: false
      };

      //set for later use
      userType = type;
    }else if(type === "user"){

      fieldVerification = {
        inputName: false,
        inputLastname : false,
        inputEmail: false,
        inputPassword: false,
        inputRePassword: false,
        inputTargetMarket: false
      };

      //set for later use
      userType = type;
    }
    
  }

  function getUserType(){
    return userType;
  }

  function toggleSubmitButton(status){
    //status = true | enables the button
    //status = false | disables the button

    //status dictates the condition of the disableButton class, so if it exists
    //it will toggle it.
    if($('button[type="submit"]').hasClass("disableButton") === status){
      $('button[type="submit"]').toggleClass("disableButton");
    }
  
  
  }

  function formAppendError(id, message, color){
    let txtColor = "";
    switch (color) {
        case "red":
          txtColor = "redTxt";
        break;
  
        case "yellow":
          txtColor = "yellowTxt";
        break;
  
        case "yellowGreen":
          txtColor = "yellowGreenTxt";
        break;
    
        case "green":
          txtColor = "greenTxt";
        break;
      
    }
    if($("#msg4"+ id).length == 0){
      $("#"+ id).parent().append("<span id='msg4" + id+ "' class='"+txtColor+"'>" + message + "</span>" );
    }
  }

  function verify(field, status){
    
    if((field === "load")){
      fieldVerification["load"] = true;
    }else{  
      fieldVerification[field] = status;
    } 

    Object.keys(fieldVerification).map(value =>{

      if(fieldVerification[value]){
        fieldVerification["submit"] = true;
      }else{
        fieldVerification["submit"] = false;
      }

    }); 

    

    if(field === "submit"){ 
        //exception, it disables HTTP operation if it fieldVerification includes false
        //else, it will return true, so it will enable the operation
        return (!Object.values(fieldVerification).includes(false)) ? true: false;

    }else{

        if(!Object.values(fieldVerification).includes(false)){
          toggleSubmitButton(true);
        }else{
          toggleSubmitButton(false);
        }
    }
  }

  function invokeVerify(field, status){
    return verify(field, status);
  }

  function invokeSetUserType(type){
    setUserType(type);
  }

  function deleteAppendError(id){
    $("#msg4"+ id).remove();
  }

  return{
    invokeVerify : invokeVerify,
    deleteAppendError: deleteAppendError,
    formAppendError: formAppendError,
    invokeSetUserType: invokeSetUserType,
    getUserType: getUserType,
    setUserType: setUserType
  };
})();