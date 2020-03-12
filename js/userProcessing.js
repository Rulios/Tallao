$(document).ready(function () {


  $("#frmUserRegister").submit(function(e){

    
    e.preventDefault();
    

    let id = makeid(5);
    let inputName = $("#inputName").val();
    let inputLastname = $("#inputLastname").val();
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
        
      },

      error: function(jqXHR, status, error){

        console.log('Status: ' + status);
        console.log('Error ' + error);
        alert("Error " + status + error);

      }
      
    });

  });

  $('#inputEmail').change(function(e){

    let email = $("#inputEmail").val();
    let id = "inputEmail";

    

    if(validateEmail(email) == false){
      formAppendError(id, "¡Escribe un correo válido!");
    }else{
      deleteAppendError(id);
    }
    

  });


});

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;

    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

  return result.toUpperCase();
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function formAppendError(id, message){

  console.log($("#msg4"+ id).length);

  if($("#msg4"+ id).length == 0){
    $("#"+ id).parent().append("<span id='msg4" + id+ "' class='redTxt'>" + message + "</span>" );
  }
  

}
function deleteAppendError(id){
  $("#msg4"+ id).remove();
}
