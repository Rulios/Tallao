
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
        checkLoginAJAX("superuser");
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

function pageRedirection(data, type){
  //type: user, superuser

  let id = "inputPassword";
 
  if(data){
    formVerification.deleteAppendError(id);
    if(type == "user"){

      window.location.replace("./panel.html");

    }else if (type == "superuser"){
      window.location.replace("./masterpanel.html");
    }

  }else{
    formVerification.deleteAppendError(id);
    formVerification.formAppendError(id, "El usuario o la contraseña no coinciden", "red");
  }

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

  //submit button reference is used to toggle the submit button
  if(formVerification.invokeVerify("submit")){
    
    $.ajax({
      type: "POST",
      url: "./php/loginProcess.php",
      data: {
        inputEmail: inputEmail,
        inputPassword: inputPassword,
        userType: userType
      },
      dataType: "json",
  
      success: function (data) {
        let status = convertStringToBoolean(data.status);
        pageRedirection(status, userType);
      },
      error: function(jqXHR, status, error){
  
        console.log('Status: ' + status);
        console.log('Error ' + error);
        alert("Error " + status + error);
  
        formVerification.deleteAppendError(id);
        formVerification.formAppendError(id, "Error en realizar la operación", "red");
  
      }
    });

  }

  

}

var formVerification  = (function(){
  'use strict';

  let fieldVerification = {
    inputEmail: false,
    inputPassword: false
  };

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
    return verify(field, status );
  }

  function deleteAppendError(id){
    $("#msg4"+ id).remove();
  }

  return{
    invokeVerify : invokeVerify,
    deleteAppendError: deleteAppendError,
    formAppendError: formAppendError
  };
})();

