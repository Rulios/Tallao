var verification = {
  inputName: false,
  inputLastname : false,
  inputEmail: false,
  inputPassword: false,
  inputRePassword: false,
  inputTargetMarket: false
};

$(document).ready(function () {

  
  formVerification("load", false);

  $("#frmUserRegister").submit(function(e){

    

    formVerification("submit", false);
    console.log(verification);
    e.preventDefault();

    //Securities issue solver
    if($("#submitRegister").hasClass("disableButton") == false){


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

  $('#inputName').change(function(e){

    let id = "inputName";
    let name = $('#inputName').val();
    let msg = "Escribe un nombre correcto";


    deleteAppendError(id);
    if((name == "") || (name.length < 3)){
      formAppendError(id, msg, "red");
      formVerification(id, false);
    }else{
      deleteAppendError(id);
      formVerification(id, true);
    }

  });

  $('#inputLastname').change(function(e){

    let id = "inputLastname";
    let lastName = $('#inputLastname').val();
    let msg = "Escribe un apellido correcto";


    deleteAppendError(id);
    if((lastName == "") || (lastName.length < 3)){
      formAppendError(id, msg, "red");
      formVerification(id, false);
    }else{
      deleteAppendError(id);
      formVerification(id, true);
    }

  });

  $('#inputEmail').change(function(e){

    let email = $("#inputEmail").val();
    let id = "inputEmail";
    let verSame = false;

    if(validateEmail(email) == false){
      deleteAppendError(id);
      formAppendError(id, "¡Escribe un correo válido!" ,"red");
      formVerification(id, false);
    }else{

      checkRepEmail(email, function(dataCallback){
        
        if(dataCallback["length"] == 1){
          verSame = true;
          //formAppendError(id, "¡El correo existe!");
        }else{
          verSame = false;
          //deleteAppendError(id);
        }

        
        if(verSame == true){
          deleteAppendError(id);
          formAppendError(id, "¡El correo existe!", "red");
          formVerification(id, false);
        }else{
          deleteAppendError(id);
          formVerification(id, true);
        }
       
      });
      
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

    deleteAppendError(id);

    switch (true) {

      case (actualLength < weakLength):
          formAppendError(id, msg.msg1, "red");
          formVerification(id, false);
      break;
    
      case ((actualLength >= weakLength) && (actualLength <= mediumLength)):
          formAppendError(id, msg.msg2, "yellow");
          formVerification(id, true);
      break;

      case ((actualLength > mediumLength) && (actualLength <= strongLength)):
          formAppendError(id, msg.msg3, "yellowGreen");
          formVerification(id, true);
      break;

      case (actualLength > strongLength):
          formAppendError(id, msg.msg4, "green");
          formVerification(id, true);
      break;
    }

  });



  $("#inputRePassword").change(function(e){
    let id = "inputRePassword";
    let inputPassword = $("#inputPassword").val();
    let inputRepassword = $("#inputRePassword").val();
    let msg = {
      msg1: "¡Las contraseñas no coinciden!",
      msg2: "¡Las contraseñas coinciden!"
    };

    deleteAppendError(id);
    if(inputRepassword != inputPassword){
      formAppendError(id, msg.msg1, "red");
      formVerification(id, false);
    }else{
      formAppendError(id, msg.msg2, "green");
      formVerification(id, true);
    }
  });


  $("#inputTargetMarket").change(function(e){

    let id = "inputTargetMarket";
    let inputTargetMarket = $("#inputTargetMarket").val();
    let msg = "Escoge una opción";

    

    if(inputTargetMarket == "none"){
      deleteAppendError(id);
      formAppendError(id, msg, "red");
      formVerification(id, false);
    }else{
      deleteAppendError(id);
      formVerification(id,true);
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
function deleteAppendError(id){
  $("#msg4"+ id).remove();
}

function checkRepEmail(email, callbackResult){
  let verifySame = false;

  $.ajax({
    type: "POST",
    url: "./php/checkRepEmail.php",
    data: {inputEmail: email},
    dataType: 'json',
    error: function(jqXHR, status, error){

      console.log('Status: ' + status);
      console.log('Error ' + error);
      alert("Error " + status + error);

    }
  }).done(function(data){

    
    
  }, callbackResult);

}

function toggleSubmitButton(status){

  //status = false | enables the button
  //status = true | disables the button

  if(status == true){
    if($('button[type="submit"]').hasClass("disableButton") == false){
      $('button[type="submit"]').addClass("disableButton");
    }
  } else{
    $('button[type="submit"]').removeClass("disableButton");
  }

}

function formVerification(field, status){

  let objectValues = [];
 
  if((field == "load") || (field == "submit")){
    
    verification["load"] = true;
    verification["submit"] = true;

  }else{  

    if(status == false){
      verification[field] = false;
    }else{
      verification[field] = true;
    }
  }  
  
  objectValues = Object.values(verification);

  if(objectValues.includes(false) == true){
    
    toggleSubmitButton(true);
  }else{
    toggleSubmitButton(false);
  }
}
function capitalizeFirstLetter(string) { 
  //set all string to lowCase
  string = string.toLowerCase();
  let result = string[0].toUpperCase() + string.slice(1); 
  return result;
} 
