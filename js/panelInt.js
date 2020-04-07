var verification = {
    inputActualPassword: false,
    inputPassword: false,
    inputRePassword: false
}
var cookie = getCookieData(document.cookie);
var serviceOffer = [];
var serviceOfferString = {
  iron: "Planchado",
  washiron: "Lavado y planchado",
  wash: "Lavado",
  dryclean: "Lavado en seco"
};

//key = string to id
//value = string to show
var elementsString = {
 shirt: "Camisa",
 pants: "Pantalon",
 skirt: "Falda",
 coat: "Saco",
 sweater: "Suéter",
 pleatedSkirt: "Falda Plizada",
 overall: "Overol",
 jumper: "Jumper",
 blouse: "Blusa",
 largeSuit: "Vestido",
 quilt: "Colcha",

};


var sessionPrice = {};
var quantity = {

  total: 0,

  updateQuantity: function(id, cQuantity){

    let totalUpdate = 0;

    if((typeof this[id] == undefined) || (typeof this[id] == "undefined") || (this[id] == "") || (this[id] == 0)){
      this[id] = cQuantity;
    }else{

      totalUpdate = cQuantity - this[id];
      this[id] = cQuantity;

      this.total = this.total + totalUpdate;
      $("#inputHookQuantity").val(this.total);

    }
  },

  closeQuantity: function(id, cQuantity){
    this[id] = 0;
    this.total = this.total - cQuantity;
    $("#inputHookQuantity").val(this.total);

  }

}; //used to check the quantity hook equals the quantity 
$(document).ready(function () {
    
   
    
    console.log(window.location.pathname);

    if((typeof document.cookie == undefined) || (document.cookie == "")){

        alert("Vuelve a iniciar sesión");

        window.location.replace("./login.html");
        
    }else{
        //start to fetch values

        if((window.location.pathname == "/Tallao/myaccount.html")||(window.location.pathname == "myaccount.html")){

            formVerification("load", false);

            if(cookie.usertype == "user"){

              $("#userForm").toggleClass("hide");

              fetchMyAccountData(cookie.userhash, cookie.usertype, function(dataCallback){
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
              
              

            }else if(cookie.usertype == "superuser"){
              

              $("#superuserForm").toggleClass("hide");  

              fetchMyAccountData(cookie.userhash, cookie.usertype, function(dataCallback){
                
                let initials = dataCallback.initials;
                let laundryname = dataCallback.laundryname;
                let location = dataCallback.location;
                let name = dataCallback.legalreprName;
                let lastname = dataCallback.legalreprLastname;
                let email = dataCallback.email;

                tagShowID(laundryname);
                tagShowInitials(initials);
                tagShowLocation(location);
                tagShowLegalReprName(name);
                tagShowLegalReprLastname(lastname);
                tagShowSuperUserEmail(email);
                console.log(dataCallback);
              });


              fetchServiceOffer(function(dataCallback){
                

                serviceOffer = dataCallback.serviceoffer.trim().split(",");
                
                for(let i = 0; i < serviceOffer.length; i++){

                  $("input[type='checkbox'][value='"+serviceOffer[i]+"']").prop("checked", true);

                  let option = document.createElement("OPTION");
                  option.setAttribute("value", serviceOffer[i]);
                  option.textContent = serviceOfferString[serviceOffer[i]];
                  $("#selectServiceType").append(option);
                  
                }

                if(serviceOffer[0] != "null"){
                  fetchElementPrice();
                }
                
              });

              let elementObjectKeys = Object.keys(elementsString);
              let elementObjectLength = elementObjectKeys.length;

              let counter = 0;
              let rowDiv = "";
              
              for(let i = 0; i < elementObjectLength; i++){
                
                if(counter == 0){
                  rowDiv = "";
                  rowDiv = generateRowClass4ElementBox();
                  
                }
              
                rowDiv.append(generatePriceAssignationBox(elementsString[elementObjectKeys[i]], elementObjectKeys[i]));
                $("#divAppendElementBox").append(rowDiv);
                counter += 1;

                if(counter == 3){
                  counter = 0;
                }
              }
              
            }

        }else if((window.location.pathname == "/Tallao/panel.html") || (window.location.pathname == "panel.html")){

            fetchPanelData(cookie.userhash, function(dataCallback){
                let id = dataCallback.id;
                let orders = dataCallback.orders;
                console.log(dataCallback);
                tagShowID(id);
            });

        }else if(window.location.pathname == "/Tallao/masterpanel.html"){

          fetchServiceOffer(function(dataCallback){
              
            serviceOffer = dataCallback.serviceoffer.trim().split(",");
            
            for(let i = 0; i < serviceOffer.length; i++){

              let option = document.createElement("OPTION");
              option.setAttribute("value", serviceOffer[i]);
              option.textContent = serviceOfferString[serviceOffer[i]];
              $("#selectServiceType").append(option);
              
            }

            if(serviceOffer[0] != "null"){
              fetchElementPrice();
            }
            
          });
        }

        

    }   
    

    $("#changePassword").click(function(e){

        e.preventDefault();

        $("#divChangePassword").toggleClass("hide");
        $("#inputActualPassword").toggleClass("disableInput");
        



    });

    $("#inputActualPassword").change(function(e){
        alert($("#inputPassword").hasClass("disableInput"));
        let id = "inputActualPassword";
        let password = $("#inputActualPassword").val();
        let msg = "La contraseña no coincide";

        checkSamePassword(cookie.userhash, cookie.usertype, password, function(data){
            
            if((data == true) && ($("#inputPassword").hasClass("disableInput") == true)){
                deleteAppendError(id);
                formVerification(id, true);
                $("#inputPassword").toggleClass("disableInput");
            }else if((data == false) && ($("#inputPassword").hasClass("disableInput") == false)){
                deleteAppendError(id);
                formVerification(id, false);
                formAppendError(id, msg, "red");
                $("#inputPassword").toggleClass("disableInput");
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

          if(cookie.usertype == "user"){

            $.ajax({
              type: "POST",
              url: "./php/userNewPassword.php",
              data: {
                  inputUserHash: cookie.userhash,
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

          }else if(cookie.usertype == "superuser"){

            $.ajax({
              type: "POST",
              url: "./php/superUserNewPassword.php",
              data: {
                  inputUserHash: cookie.userhash,
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
          

        }

      });

      $("input[type=number]").keydown(function(e){
        
        if (e.which === 69) {
          e.preventDefault();
        }
        
      });


      $("input[type=number]").bind("paste", function(e){
        
        e.preventDefault();

      });


      $("#signout").click(function(e){

        e.preventDefault();

        //delete cookie

        let cookieName = Object.keys(cookie);

        for(let i = 0; i < cookieName.length; i++){

          document.cookie = cookieName[i] +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        }

        window.location.replace("./index.html")

      });

      $("#submitChangeOffer").click(function(e){

        let allCheckBox = $("input[type=checkbox]");
        
        let objectKeys = Object.keys(allCheckBox);
        let objectLength = objectKeys.length - 2; //-2 because last two are length and prevObject
        let arr = [];
        let string = "";

        for(let i = 0; i < objectLength; i++){
          if(allCheckBox[objectKeys[i]].checked == true){
            arr.push(allCheckBox[objectKeys[i]].value);
          }
        }
        
        string = arr.join(",");
        
        $.ajax({
          type: "POST",
          url: "./php/upgradeServiceOffer.php",
          data: {
              inputUserHash: cookie.userhash,
              serviceoffer: string
          },
          success: function (response) {
              $("#submitChangeOffer").toggleClass("disableButton");
              $("#submitChangeOffer").text("¡ACTUALIZADO!");
              
          },
          error: function(jqXHR, status, error){

              console.log('Status: ' + status);
              console.log('Error ' + error);
              alert("Error " + status + error);
    
          }
        });

        location.reload();


      });

      $("#selectServiceType").change(function(e){
        

        if($("#submitChangePrice").hasClass("disableButton") == true){
          $("#submitChangePrice").toggleClass("disableButton");
          $("#submitChangePrice").text("Actualizar precios"); 
        }

        fetchElementPrice();

      });


      $("#submitChangePrice").click(function(e){

        let serviceSelected = $("#selectServiceType :selected").val();
        let elementKeys = Object.keys(elementsString);
        let string = "";
        let arr = [];

        for(let i = 0; i < elementKeys.length; i++){

          if($("#inputPrice4" + elementKeys[i]).val() != ""){
            let x = "";

            x = elementKeys[i] + "=" + $("#inputPrice4" + elementKeys[i]).val();

            arr.push(x);
          }

        }

        string = arr.join();

        console.log(cookie.userhash);
        console.log(serviceSelected);
        console.log(string);

        $.ajax({
          type: "POST",
          url: "./php/upgradePriceConfig.php",
          data: {
              inputUserHash: cookie.userhash,
              serviceoffer: serviceSelected,
              priceConfig: string
          },
          success: function (response) {
              $("#submitChangePrice").toggleClass("disableButton");
              $("#submitChangePrice").text("¡ACTUALIZADO!");
              
          },
          error: function(jqXHR, status, error){

              console.log('Status: ' + status);
              console.log('Error ' + error);
              alert("Error " + status + error);
    
          }
        });

      });



      $("button[name=elementButton]").click(function(e){

        let id = this.value;
        let service = $("#selectServiceType :selected").val();

        console.log($("#elementReceipt4" + id + "-" + service).length);

        if($("#elementReceipt4" + id + "-" + service).length == false){
          generateCustomElementReceiptBox(id, service);
        }

        
      });


      $("#inputClientID").on("input", function(e){

        this.value = this.value.toUpperCase();

      });
      
      $("#inputClientID").change(function(e){

        $.ajax({
          type: "POST",
          url: "./php/searchUserID.php",
          data: {inputUserID: this.value},
          
          success: function (data) {
            
            data = JSON.parse(data);
            
            if(data == null){
              
              if($("#spnClientFullName").hasClass("redTxt") == false){
                $("#spnClientFullName").toggleClass("redTxt");
              }

              $("#spnClientFullName").text("No se encuentra el cliente");
            }else{

              if($("#spnClientFullName").hasClass("redTxt") == true){
                $("#spnClientFullName").toggleClass("redTxt");
              }

              $("#spnClientFullName").text(data.name + " " + data.lastname);

            }
          },

          error: function(jqXHR, status, error){
  
            console.log('Status: ' + status);
            console.log('Error ' + error);
            alert("Error " + status + error); 
      
          }
        });

      });

      $("#checkBoxHook").change(function(e){
        
          if(this.checked == true){

            if($("#inputHookQuantity").hasClass("disableInput") == false){
              $("#inputHookQuantity").toggleClass("disableInput");
            }

          }else{

            if($("#inputHookQuantity").hasClass("disableInput") == true){
              $("#inputHookQuantity").toggleClass("disableInput");
            }

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
function tagShowInitials(initials){

    $("#showInitials").text(initials);

}
function tagShowLocation(location){

    $("#showLocation").text(location);

}
function tagShowLastname(lastname){

    $("#showLastname").text(lastname);

}
function tagShowEmail(email){

    $("#showEmail").text(email);

}
function tagShowSuperUserEmail(email){
    $("#showSuperUserEmail").text(email);
}
function tagShowLegalReprName(legalReprName){
    $("#showLegalReprName").text(legalReprName);
}
function tagShowLegalReprLastname(legalReprLastname){
    $("#showLegalReprLastname").text(legalReprLastname);

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

function fetchPanelData(userHash, userType, callbackResult){

  if(userType == "user"){

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

  }else if(userType == "superuser"){

  }

    
}

function fetchMyAccountData(userHash, userType, callbackResult){

  if(userType == "user"){

    $.ajax({
      type: "POST",
      url: "./php/fetchMyAccountDataUser.php",
      data: {inputUserHash: userHash},
      dataType: 'json',
      error: function(jqXHR, status, error){
  
        console.log('Status: ' + status);
        console.log('Error ' + error);
        alert("Error " + status + error); 
  
      }
    }).done(function(data){
    }, callbackResult);

  }else if(userType == "superuser"){

    $.ajax({
      type: "POST",
      url: "./php/fetchMyAccountDataSuperUser.php",
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
}

function isNumberKey(evt){
  var charCode = (evt.which) ? evt.which : evt.keyCode
  return !(charCode > 31 && (charCode < 48 || charCode > 57));
}

function checkSamePassword(userHash, userType, password, callbackResult){

  if(userType == "user"){

    $.ajax({
      type: "POST",
      url: "./php/userCheckSamePassword.php",
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

  }else if(userType == "superuser"){

    $.ajax({
      type: "POST",
      url: "./php/superUserCheckSamePassword.php",
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
  }
}

function generatePriceAssignationBox(elementName, elementNameID){

 

  let elementBox = document.createElement("DIV");
  elementBox.setAttribute("class", "col-lg-4 subTxt styleElementBox");
  elementBox.setAttribute("id", "divElementBox" + elementNameID);

  let spnElementName = document.createElement("SPAN");
  spnElementName.setAttribute("id", "spn4" + elementNameID);
  spnElementName.setAttribute("class", "styleElementName");
  spnElementName.textContent = elementName;


  let dollarSignDiv = document.createElement("DIV");
  dollarSignDiv.setAttribute("class", "input-group mb-2 small-mediumSeparation");

  let dollarSignSubDiv = document.createElement("DIV");
  dollarSignSubDiv.setAttribute("class", "input-group-preprend");

  let dollarSignTextDiv = document.createElement("DIV");
  dollarSignTextDiv.setAttribute("class", "input-group-text");
  dollarSignTextDiv.textContent = "$";

  let inputElementPrice = document.createElement("INPUT");
  inputElementPrice.setAttribute("id", "inputPrice4" + elementNameID);
  inputElementPrice.setAttribute("type", "number");
  inputElementPrice.setAttribute("class", "styleElementPrice");

  dollarSignSubDiv.append(dollarSignTextDiv);

  dollarSignDiv.append(dollarSignSubDiv);
  dollarSignDiv.append(inputElementPrice);

  elementBox.append(spnElementName);
  elementBox.append(dollarSignDiv);

  return elementBox;

}
function generateRowClass4ElementBox(){

  let rowDiv = document.createElement("DIV");
  rowDiv.setAttribute("class", "row supTxt-TitleTxt-Separation karla_font");

  return rowDiv;

}

function fetchServiceOffer(callbackResult){

  let userHash = cookie.userhash;
  
  $.ajax({
    type: "POST",
    url: "./php/fetchServiceOffer.php",
    data: {
        inputUserHash: userHash
    },
    dataType: 'json',
    error: function(jqXHR, status, error){

      console.log('Status: ' + status);
      console.log('Error ' + error);
      alert("Error " + status + error);

    }
  }).done(function(data){
  }, callbackResult);

}

function fetchElementPrice(){

  let serviceSelected = $("#selectServiceType :selected").val();
  
  let userHash = cookie.userhash;
  
  $.ajax({
    type: "POST",
    url: "./php/fetchElementPriceString.php",
    data: {
        inputUserHash: userHash,
        serviceOffer: serviceSelected
    },
    dataType: 'json',

    success: function(data){
      
      
      let array = [];
      
      
      if(data[serviceSelected] != "null"){

        array = data[serviceSelected].split(",");

        for(let i = 0; i < array.length; i++){
          
          let elementSplit = array[i].split("=");
          let id = elementSplit[0];
          let price = elementSplit[1];

          
         
          if(window.location.pathname == "/Tallao/masterpanel.html"){

            /* let container = document.createElement("DIV");
            container.setAttribute("class", "container");

            let row = document.createElement("DIV");
            row.setAttribute("class", "row bottomBorder elementSelectStyle");

            let col4 = document.createElement("DIV");
            col4.setAttribute("class", "col-lg-4");

            let imgAsset = document.createElement("IMG");
            imgAsset.setAttribute("src", "./imgs/assets/"+id +"/"+id+".svg");
            imgAsset.setAttribute("class", "assetStayStatic");

            let col8 = document.createElement("DIV");
            col8.setAttribute("class", "col-lg-8");

            let spnNameTag = document.createElement("SPAN");
            spnNameTag.setAttribute("id", "nameTag4" + id);
            spnNameTag.setAttribute("class", "subTxt");

            let boldText = document.createElement("B");
            boldText.textContent = elementsString[id];

            let breakLine = document.createElement("BR");

            let spnPriceTag = document.createElement("SPAN");
            spnPriceTag.setAttribute("id", "priceTag4" + id);
            spnPriceTag.textContent = price;

            col4.append(imgAsset);
            spnNameTag.append(boldText);
            col8.append(spnNameTag);
            col8.append(breakLine);
            col8.append(spnPriceTag);
            row.append(col4);
            row.append(col8);
            container.append(row); */
            
            

            sessionPrice[id] = price;
           
            $("#priceTag4" + id).text("$" + price);
            $("#priceTag4" + id).val(price);
            
          }else if(window.location.pathname == "/Tallao/myaccount.html"){
            $("#inputPrice4" + id).val(price);
          }
          
          
        }

      }else{

        let objKeys = Object.keys(elementsString);

        if(window.location.pathname == "/Tallao/masterpanel.html"){
          
          for(let i = 0; i < objKeys.length; i++){
            
            $("#priceTag4" + objKeys[i]).text("Precio no asignado");
            $("#priceTag4" + objKeys[i]).val("nonAssigned");
           
          }

        }else if(window.location.pathname == "/Tallao/myaccount.html"){
          
          for(let i = 0; i < objKeys.length; i++){
            $("#inputPrice4" + objKeys[i]).val("");
          }

        }

        for(let i = 0; i < objKeys.length; i++){
          $("#inputPrice4" + objKeys[i]).val("");
        }


      }

    },
    error: function(jqXHR, status, error){

      console.log('Status: ' + status);
      console.log('Error ' + error);
      alert("Error " + status + error);

    }
  });


}


var customActive = []; //global variable
function generateCustomElementReceiptBox(id, service){

  
  let idAsset = id; //used to fetch static id contents from the request
  let idElement = id + "-" + service;
  

  if(id == "custom"){
    let index;
    if(customActive.length == 0){
      customActive.push(1);
      index = 1;
    }else{
      index  = customActive[customActive.length - 1] + 1;
      customActive.sort(function(a, b){return a-b});
      customActive.push(index);
    }

    id += index;
    
  }

  let mainContainer = document.createElement("DIV");
  mainContainer.setAttribute("class", "container small-mediumSeparation");
  mainContainer.setAttribute("id", "elementReceipt4" + idElement);

  let row1 = document.createElement("DIV");
  row1.setAttribute("class", "row bottomBorder customElementReceiptStyle");

  let colImgAsset = document.createElement("DIV");
  colImgAsset.setAttribute("class", "col-lg-1 hideOnXs");

  let imgAsset = document.createElement("img");
  imgAsset.setAttribute("src", "./imgs/assets/"+idAsset+ "/" + idAsset + ".svg");
  imgAsset.setAttribute("class", "assetStayStatic");

  colImgAsset.append(imgAsset);

  let colElementInformation = document.createElement("DIV");
  colElementInformation.setAttribute("class", "col-lg-11");


  let elementNameHTML;
  if(id.search("custom") != -1){
    
    elementNameHTML = document.createElement("INPUT");
    elementNameHTML.setAttribute("type", "text");
    elementNameHTML.setAttribute("placeholder", "Nombre del elemento");
    elementNameHTML.setAttribute("id", "spn4" + idElement);
  }else{
    elementNameHTML = document.createElement("SPAN");
    elementNameHTML.setAttribute("class", "bold subTxt");
    elementNameHTML.setAttribute("id", "spn4" + idElement);
    elementNameHTML.textContent = elementsString[id] + " (" + serviceOfferString[service] + ")";
  }

  

  let closeElementButton = document.createElement("BUTTON");
  closeElementButton.setAttribute("class", "closeElementButtonStyle");
  closeElementButton.setAttribute("id", "closeElementButton4" + idElement);
  closeElementButton.textContent = "x";

  closeElementButton.addEventListener("click", function(e){

    let xID;
    let a = this.id.split("closeElementButton4");

    xID = a[1];

    updateReceiptTotalPrice(spnResultTotal.value, 0);
    $("#elementReceipt4" + xID).remove();
    quantity.closeQuantity(idElement, inputQuantity.value);
    

    if(xID.search("custom") != -1){
      let arr = id.split("custom");
      let indexToDel = customActive.findIndex(function(x){
        return x == arr[1];
      });
      //delete the index from customActive
      console.log(indexToDel);
      customActive.splice(indexToDel, 1);
      console.log(customActive);
    }

    
  });

  let elementInfoContainer = document.createElement("DIV");
  elementInfoContainer.setAttribute("class", "container small-mediumSeparation");

  let rowInfo = document.createElement("DIV");
  rowInfo.setAttribute("class", "row");

  let colQuantity = document.createElement("DIV");
  colQuantity.setAttribute("class", "col-lg-4");

  let spnTagQuantity = document.createElement("SPAN");
  spnTagQuantity.textContent = "Cantidad:";

  let breakLine1 = document.createElement("BR");

  let inputQuantity = document.createElement("INPUT");
  inputQuantity.setAttribute("type", "number");
  inputQuantity.setAttribute("class", "inputNumberReceiptStyle");
  inputQuantity.setAttribute("id", "inputQuantity4" + idElement);
  inputQuantity.setAttribute("name", "inputQuantity");
  inputQuantity.value = "1";

  

  inputQuantity.addEventListener("keypress", function(e){
    onlyIntegers(e);
    
  });

  inputQuantity.addEventListener("input", function(e){
    if((this.value == 0) || (this.value == "")){
      e.preventDefault();
    }else{
      let changedPrice = (inputQuantity.value * inputPrice.value);
      updateReceiptTotalPrice(spnResultTotal.value, changedPrice.toFixed(2));
      spnResultTotal.value = (inputQuantity.value * inputPrice.value).toFixed(2);
      spnResultTotal.textContent = "$" + (inputQuantity.value * inputPrice.value).toFixed(2);

      quantity.updateQuantity(idElement, inputQuantity.value);
      
    }
  });

  inputQuantity.addEventListener("paste", function(e){
    e.preventDefault();
  });
  
  colQuantity.append(spnTagQuantity);
  colQuantity.append(createBreakline());
  colQuantity.append(inputQuantity);
 

  let colPrice = document.createElement("DIV");
  colPrice.setAttribute("class", "col-lg-4");

  let spnTagPrice = document.createElement("SPAN");
  spnTagPrice.textContent = "Precio por unidad:";

  let spnDollarSign = document.createElement("SPAN");
  spnDollarSign.textContent = "$";

  let inputPrice = document.createElement("INPUT");
  inputPrice.setAttribute("type", "number");
  inputPrice.setAttribute("class", "inputNumberReceiptStyle");
  inputPrice.setAttribute("id", "inputPrice4" + idElement);
  inputPrice.value = sessionPrice[id];
  
  inputPrice.addEventListener("keypress", function(e){
    onlyNumbers(e);
    
  });

  inputPrice.addEventListener("paste", function(e){
    e.preventDefault();
  });

  inputPrice.addEventListener("input", function(e){
    if((this.value == 0) || (this.value == "")){
      e.preventDefault();
    }else{
      
      spnResultTotal.textContent = "$" + (inputQuantity.value * inputPrice.value).toFixed(2);
      
    }
  });

  inputPrice.addEventListener("change", function(e){
    let changedPrice = (inputQuantity.value * inputPrice.value);
    updateReceiptTotalPrice(spnResultTotal.value, changedPrice.toFixed(2));
    spnResultTotal.value = (inputQuantity.value * inputPrice.value).toFixed(2);
      
  });

  colPrice.append(spnTagPrice);
  colPrice.append(createBreakline());
  colPrice.append(spnDollarSign);
  colPrice.append(inputPrice);

  let colTotal = document.createElement("DIV");
  colTotal.setAttribute("class", "col-lg-4");

  let spnTagTotal = document.createElement("SPAN");
  spnTagTotal.textContent = "Total:";

  let spnResultTotal = document.createElement("SPAN");
  spnResultTotal.setAttribute("id", "spnResultElementTotal4" + idElement);
  spnResultTotal.textContent = "$" + (inputQuantity.value * inputPrice.value).toFixed(2);
  spnResultTotal.value = (inputQuantity.value * inputPrice.value).toFixed(2);

  
  colTotal.append(spnTagTotal);
  colTotal.append(createBreakline());
  colTotal.append(spnResultTotal); 

  rowInfo.append(colQuantity);
  rowInfo.append(colPrice);
  rowInfo.append(colTotal);

  elementInfoContainer.append(rowInfo);

 
  colElementInformation.append(elementNameHTML);
  colElementInformation.append(closeElementButton);
  colElementInformation.append(elementInfoContainer);

  row1.append(colImgAsset);
  row1.append(colElementInformation);

  mainContainer.append(row1);
  updateReceiptTotalPrice(0, spnResultTotal.value);
  quantity.updateQuantity(idElement, inputQuantity.value);
  
  $("#divOrdersAppendable").append(mainContainer);
}

function createBreakline(){
  return document.createElement("BR");
}
function onlyIntegers(e){
  if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
    e.preventDefault();
  }
}
function onlyNumbers(e){
  //Includes integers and decimals
  if (e.which === 69) {
    e.preventDefault();
  }

}

function updateReceiptTotalPrice(actualPrice, changedPrice){

  let spnValue = $("#totalPriceSpan").val();
  let price;

  if(( typeof changedPrice == undefined) ||  (typeof changedPrice == "undefined")){
    changedPrice = 0;
  }

  if(( typeof spnValue == undefined) ||  (typeof spnValue == "undefined") || (spnValue == "")){
    spnValue = 0;
  }

  spnValue = parseFloat(spnValue);
  actualPrice = parseFloat(actualPrice);
  changedPrice = parseFloat(changedPrice);

  price = changedPrice - actualPrice + spnValue;

  console.log(spnValue + " + " + changedPrice + " - " + actualPrice);
  console.log(price.toFixed(2));

  /* if(mode == "quit-element"){    

    price = spnValue - actualPrice;

  }else if(mode == "add-element"){

    price = spnValue + actualPrice;

  }else if(mode == "update"){

    price = (spnValue - actualPrice) + changedPrice;
  } */

  $("#totalPriceSpan").val(price.toFixed(2));
  $("#totalPriceSpan").text("Precio Total: $" + price.toFixed(2));

}
