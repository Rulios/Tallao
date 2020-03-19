var verification = {
    inputEmail: false,
    inputPassword: false
};

var clickStatus = {
    user: false,
    superUser: false
}

$(document).ready(function(){

    formVerification("load", false);

    
      $("#frmUserLogin").submit(function(e){
        formVerification("submit", false);
        
        e.preventDefault();

        if(($("#submitRegister").hasClass("disableButton") == false) || ($("#submitLoginSuperUser").hasClass("disableButton") == false)){

        }
    
      });

      $("#inputEmail").change(function(e){
        let id = "inputEmail";

        if($("#inputEmail").val() == ""){
            formVerification(id, false);
        }else{
            formVerification(id,true);
        }
      });

      $("#inputPassword").change(function(e){
        let id = "inputPassword";

        if($("#inputPassword").val() == ""){
            formVerification(id, false);
        }else{
            formVerification(id,true);
        }
      });

      $("#submitLoginSuperUser").click(function(e){

        clickStatus.superUser = true;
        clickStatus.user = false;

      });

      $("#submitLogin").click(function(e){
        
        clickStatus.user = true;
        clickStatus.superUser = false;

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
          deleteAppendError(id);
        }
      });  

      

});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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