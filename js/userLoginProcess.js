var verification = {
    inputEmail: false,
    inputPassword: false
};

var clickStatus = {
    user: false,
    superUser: false
}

var cookie = getCookieData(document.cookie);
$(document).ready(function(){

    if((cookie.userhash != "") && (cookie.usertype == "user")){
      window.location.replace("./panel.html");
    }else if((cookie.userhash != "") && (cookie.usertype == "superuser")){
      window.location.replace("./masterpanel.html");
    }

    formVerification("load", false);

    
      $("#frmUserLogin").submit(function(e){
        formVerification("submit", false);
        
        e.preventDefault();

        if(($("#submitRegister").hasClass("disableButton") == false) || ($("#submitLoginSuperUser").hasClass("disableButton") == false)){
          
          let inputEmail = $("#inputEmail").val();
          let inputPassword = $("#inputPassword").val();
          

          if(clickStatus.user == true){

            
            $.ajax({
              type: "POST",
              url: "./php/userLoginProcess.php",
              data: {
                inputEmail: inputEmail,
                inputPassword: inputPassword
              },
              dataType: "json ",

              success: function (data) {
                let status = convertStringToBoolean(data.status);
                
                pageRedirection(status, "user");
              },
              error: function(jqXHR, status, error){

                console.log('Status: ' + status);
                console.log('Error ' + error);
                alert("Error " + status + error);

                deleteAppendError(id);
                formAppendError(id, "Error en realizar la operación", "red");
          
              }
            });

          }else if(clickStatus.superUser == true){
          
            $.ajax({
              type: "POST",
              url: "./php/superUserLoginProcess.php",
              data: {
                inputEmail: inputEmail,
                inputPassword: inputPassword
              },
              dataType: "json ",

              success: function (data) {
                let status = convertStringToBoolean(data.status);
                
                pageRedirection(status, "superuser");
              },
              error: function(jqXHR, status, error){

                console.log('Status: ' + status);
                console.log('Error ' + error);
                alert("Error " + status + error);

                deleteAppendError(id);
                formAppendError(id, "Error en realizar la operación", "red");
          
              }
            });

          }

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


function pageRedirection(data, type){
  //type: user, superuser

  let id = "inputPassword";
 
  if(data === true){

    console.log(data);
    deleteAppendError(id);
    if(type == "user"){

      window.location.replace("./panel.html");

    }else if (type == "superuser"){
      window.location.replace("./masterpanel.html");
    }

  }else{
    deleteAppendError(id);
    formAppendError(id, "El usuario o la contraseña no coinciden", "red");
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
function convertStringToBoolean(string){
  let boolean = false;

  if(string == "true"){
    boolean = true;
  }else if(string == "false"){
    boolean = false;
  }

  return boolean;
}

function getCookieData(string){
  let hash = "";
  let userCode = "";
  let obj = {};
  let arr = [];
  hash = string.trim();

  hash = hash.split(";");
  

  for (let i = 0; i < hash.length; i++){

    arr = hash[i].trim().split("=");
    obj[arr[0]] = arr[1];

  }

  return obj;
}