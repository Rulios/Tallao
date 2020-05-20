if((typeof document.cookie == undefined) || (document.cookie == "")){

    alert("Vuelve a iniciar sesión");

    window.location.replace("./login.html");
    
}else{


    switch(windows.location.pathname){

        case "/Tallao/myacccount.html":
        case "myaccount.html":

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
              $("#masterUserValueConfiguration").toggleClass("hide");

              fetchMyAccountData(cookie.userhash, cookie.usertype, function(dataCallback){
                
                let initials = dataCallback.initials;
                let laundryname = dataCallback.laundryname;
                let location = dataCallback.location;
                let name = dataCallback.legalreprName;
                let lastname = dataCallback.legalreprLastname;
                let email = dataCallback.email;

                
                tagShowLaundryName(laundryname);
                tagShowInitials(initials);
                tagShowLocation(location);
                tagShowLegalReprName(name);
                tagShowLegalReprLastname(lastname);
                tagShowSuperUserEmail(email);
                console.log(dataCallback);

                //this need to be rewritten
                superuser.initials = initials;
               
                schedule.generateScheduleBox(superuser.initials);

                customMessages.fetchCustomMessages(superuser.initials, function(data){
                  
                  
                  let dataObj = JSON.parse(data);
                  let keys = Object.keys(dataObj);
                  
                  console.log(dataObj);

                  for(let i = 0; i < keys.length; i++){
                    console.log(dataObj[keys[i]]);
                    let idMessage = dataObj[keys[i]]["id"];
                    let colorTag = dataObj[keys[i]]["colortag"];
                    let tagTxt = dataObj[keys[i]]["tag"];
                    let msgTxt = dataObj[keys[i]]["message"];

                    customMessages.createNewMessageBox(superuser.initials, idMessage, colorTag, tagTxt, msgTxt );

                  }

  
                });

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

        break;

        //////////////////////////////////////////////    
        case "/Tallao/panel.html":
        case "panel.html":

            fetchPanelData(cookie.userhash, function(dataCallback){
                let id = dataCallback.id;
                let orders = dataCallback.orders;
                console.log(dataCallback);
                tagShowID(id);
            });


        break;

        ////////////////////////////////////////////////
        case "/Tallao/masterpanel.html":
        case "masterpanel.html":

            verification = {
                inputElements: false,
                inputDateAssigned: false,
              };
              formVerification("load", false);
              formVerification("inputElements", false);
              formVerification("inputDateAssigned", false);
    
              fetchMyAccountData(cookie.userhash, cookie.usertype, function(dataCallback){
    
                let initials = dataCallback.initials;
                let laundryName = dataCallback.laundryname;
                console.log(laundryName);
                tagShowLaundryName(laundryName);
                superuser.initials = initials;
    
                //instant msg tags
                customMessages.fetchCustomMessages(superuser.initials, function(data){
                   
                  let dataObj = JSON.parse(data);
                  let keys = Object.keys(dataObj);
      
                  for(let i = 0; i < keys.length; i++){
                    //console.log(dataObj[keys[i]]);
                    let idMessage = dataObj[keys[i]]["id"];
                    let colorTag = dataObj[keys[i]]["colortag"];
                    let tagTxt = dataObj[keys[i]]["tag"];
                    let msgTxt = dataObj[keys[i]]["message"];
      
                    customMessages.messages.push(idMessage);
                    customMessages.createInstantMsgTag(idMessage, colorTag, tagTxt, msgTxt);
                  }
                });
                
    
              });  
    
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
              
              
    
              //start fetching date,time and cycle from server
              //time to refresh 10 minutes = 600000ms
              time.printDateTime();
              setInterval(function(){time.printDateTime()}, 600000);

        break;

    }

    
}