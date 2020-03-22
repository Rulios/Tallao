var verification = {
    inputActualPassword: false,
    inputPassword: false,
    inputRePassword: false
}

$(document).ready(function () {
    
    var cookieValue = getUserHashCode(document.cookie);
    
    console.log(window.location.pathname);

    if((typeof document.cookie == undefined) || (document.cookie == "")){

        alert("Vuelve a iniciar sesión");

        window.location.replace("./login.html");
        
    }else{
        //start to fetch values

        if((window.location.pathname == "/Tallao/myaccount.html")||(window.location.pathname == "myaccount.html")){

            formVerification("load", false);

            fetchMyAccountData(cookieValue, function(dataCallback){
                let id = dataCallback.id;
                let name = dataCallback.name;
                let lastname = dataCallback.lastname;
                let email = dataCallback.email;

                tagShowID(id);
                tagShowName(name);
                tagShowLastname(lastname);
                tagShowEmail(email);
                console.log(dataCallback);
            });

        }else if((window.location.pathname == "/Tallao/panel.html") || (window.location.pathname == "panel.html")){

            fetchPanelData(cookieValue, function(dataCallback){
                let id = dataCallback.id;
                let orders = dataCallback.orders;
                console.log(dataCallback);
                tagShowID(id);
            });

        }

        console.log(cookieValue);

    }   
    

    $("#changePassword").click(function(e){

        e.preventDefault();

        $("#divChangePassword").toggleClass("hide");
        $("#inputActualPassword").toggleClass("disableInput");
        



    });

    $("#inputActualPassword").change(function(e){

        let id = "inputActualPassword";
        let password = $("#inputActualPassword").val();
        let msg = "La contraseña no coincide";

        checkSamePassword(cookieValue, password, function(data){
            
            if(data == true){
                deleteAppendError(id);
                formVerification(id, true);
                $("#inputPassword").toggleClass("disableInput");
            }else{
                deleteAppendError(id);
                formVerification(id, false);
                formAppendError(id, msg, "red");
            }

        });
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

        if((verification.inputPassword == true) && ($("#inputRePassword").hasClass("disableInput") == true)){
            $("#inputRePassword").toggleClass("disableInput");
        }else if(($("#inputRePassword").hasClass("disableInput") == false) && (verification.inputPassword == false)){
            $("#inputRePassword").toggleClass("disableInput");
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


      $("#submitChange").click(function(e){
        let inputPassword = $("#inputPassword").val();
        
        formVerification("submit", false);

        if($("#submitChange").hasClass("disableButton") == false){

          $.ajax({
            type: "POST",
            url: "./php/newPassword.php",
            data: {
                inputUserHash: cookieValue,
                inputPassword: inputPassword
            },
            success: function (response) {
                $("#divChangePassword").toggleClass("hide");
                $("#changePassword").toggleClass("hide");
                $("#changePasswordSuccess").toggleClass("hide");
                $("#inputActualPassword").toggleClass("disableInput");
                $("#inputPassword").toggleClass("disableInput");
                $("#inputRePassword").toggleClass("disableInput");

                $("#inputActualPassword").val("");
                $("#inputPassword").val("");
                $("#inputRePassword").val("");
            },
            error: function(jqXHR, status, error){

                console.log('Status: ' + status);
                console.log('Error ' + error);
                alert("Error " + status + error);
      
            }
          });

        }

      });


});

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
  

function tagShowID(id){
    let title4IconToolTip = "Este ID es el que le vas a proveer a la Lavandería donde entregas tu orden.";
    let msg = "Tu ID: " + id;

    let icon = document.createElement('i');
    icon.setAttribute("class", "fa fa-question-circle");
    icon.setAttribute("data-toggle", "tooltip");
    icon.setAttribute("data-placement", "right");
    icon.setAttribute("aria-hidden", "true");
    icon.setAttribute("title", title4IconToolTip);

    $('#showID').append(msg);
    
}
function tagShowName(name){

    $("#showName").text(name);

}
function tagShowLastname(lastname){

    $("#showLastname").text(lastname);

}
function tagShowEmail(email){

    $("#showEmail").text(email);

}

function getUserHashCode(string){
    let hash = "";
    let userCode = "";
    hash = string.trim();

    hash = hash.split("=");

    userCode = hash[1];

    return userCode;
}

function fetchPanelData(userHash, callbackResult){

    $.ajax({
        type: "POST",
        url: "./php/fetchUserPanelData.php",
        data: {inputUserHash: userHash},
        dataType: 'json',
        error: function(jqXHR, status, error){
    
          console.log('Status: ' + status);
          console.log('Error ' + error);
          alert("Error " + status + error);
    
        }
      }).done(function(data){
      }, callbackResult);
}

function fetchMyAccountData(userHash, callbackResult){

    $.ajax({
        type: "POST",
        url: "./php/fetchMyAccountData.php",
        data: {inputUserHash: userHash},
        dataType: 'json',
        error: function(jqXHR, status, error){
    
          console.log('Status: ' + status);
          console.log('Error ' + error);
          alert("Error " + status + error);
    
        }
      }).done(function(data){
      }, callbackResult);

}
function checkSamePassword(userHash,password, callbackResult){

    $.ajax({
        type: "POST",
        url: "./php/checkSamePassword.php",
        data: {
            inputUserHash: userHash,
            inputPassword: password
        },
        dataType: 'json',
        error: function(jqXHR, status, error){
    
          console.log('Status: ' + status);
          console.log('Error ' + error);
          alert("Error " + status + error);
    
        }
      }).done(function(data){
      }, callbackResult);
};

