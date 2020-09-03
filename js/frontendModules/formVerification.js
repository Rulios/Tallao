require.config({

    paths:{

        jquery: [
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
            "../Tallao/js/lib/jquery"]
    }

});

define(["jquery"], function($){

  'use strict';
  let fieldVerification = {
    inputEmail: false,
    inputPassword: false
  };

  let userType = "";

  function setUserType(type){

    //data validation and set the fields to verify
    switch(type){

      case "superuser":

        fieldVerification = {
          inputLaundryName: false,
          inputLocation: false,
          inputName: false,
          inputLastname : false,
          inputEmail: false,
          inputPassword: false,
          inputRePassword: false
        };
        userType = type;
      break;

      case "user":

        fieldVerification = {
          inputName: false,
          inputLastname : false,
          inputEmail: false,
          inputPassword: false,
          inputRePassword: false,
          inputTargetMarket: false
        };
        userType = type;
      break;

      case "login":

        fieldVerification = {
          inputEmail:false,
          inputPassword: false
        }
        userType = type;
      break;

      default:
        throw "Error";
      break;
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
        //console.log(fieldVerification);
        if(!Object.values(fieldVerification).includes(false)){
          toggleSubmitButton(true);
        }else{
          toggleSubmitButton(false);
        }
    }
  }

  function invokeVerify(field, status){
    return verify(field, status );
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

});


