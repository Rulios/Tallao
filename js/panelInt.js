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
var scheduleString = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo"
};
var superuser = {
  initials: ""
};
var verification = {};

var sessionPrice = {};
var receiptDetails = {

  //this is the array to store the data
  elements: [],
  totalHookQuantity: 0,
  totalElementQuantity: 0,
  hookPrice: 0,
  updateElementProp: function(id, cQuantity, unitPrice){

    let totalUpdate = 0;
    
    
    if(cQuantity == 0){
      formVerification("inputElements", false);
    }else{
      formVerification("inputElements", true);
    }

    if((typeof this[id] == undefined) || (typeof this[id] == "undefined") || (this[id] == "") || (this[id] == 0)){
      this.elements.push(id);

      //define the obj property as a object

      this[id] = {};
      this[id]["quantity"] = parseInt(cQuantity);
      this[id]["unitPrice"] = parseFloat(unitPrice);

      totalUpdate += +this[id]["quantity"];
      
    }else{

      //check if the element is in the array 
      if(this.elements.indexOf(id) == -1){
        this.elements.push(id);
      }

      totalUpdate = cQuantity - this[id]["quantity"]; 
      this[id]["quantity"] = parseInt(cQuantity);
      this[id]["unitPrice"] = parseFloat(unitPrice);
      
    }
    

    this.totalElementQuantity = parseInt(this.totalElementQuantity + totalUpdate);
    this.totalHookQuantity = this.totalHookQuantity + totalUpdate;  

    //also store it in the data property
    $("#inputHookQuantity").data("prev", this.totalHookQuantity);
    $("#inputHookQuantity").val(this.totalHookQuantity);

    this.updateTotalPrice();

    
    
  },

  closeElement: function(id){

    let eQuantity = this[id]["quantity"];

    /* let indexToDel = this.elements.findIndex(function(x){
      return x == id;
    }); */

    let indexToDel = this.elements.indexOf(id);
    
    //delete the index from customActive
    this.elements.splice(indexToDel, 1);


    this.totalElementQuantity = this.totalElementQuantity - eQuantity;
    this.totalHookQuantity = this.totalHookQuantity - eQuantity;

    //trigger the full hook quantity checkbox automatically
    //console.log(this.totalHookQuantity);
    
    
    //set the element prop to 0
    this[id]["quantity"] = 0;
    this[id]["unitPrice"] = 0;

    this.fullHookQuantity();
    this.updateTotalPrice();
    
  },

  updateQuantityFromHookInput: function(prevQuantity, changedQuantity){
    
    this.totalHookQuantity = parseInt(changedQuantity);
    
    this.updateTotalPrice();

  },

  fullHookQuantity: function(){//used to check the quantity hook equals the quantity 
    let allSum = 0;

    for(let i = 0; i < this.elements.length; i++){
      allSum += +this[this.elements[i]]["quantity"];
    }

    this.totalHookQuantity = allSum;

    //update the total receipt price tag

    this.updateQuantityFromHookInput($("#inputHookQuantity").data("prev"), this.totalHookQuantity);

     //also store it in the data property
    $("#inputHookQuantity").data("prev", this.totalHookQuantity);
    $("#inputHookQuantity").val(this.totalHookQuantity);
    this.updateTotalPrice();
  },

  updateTotalPrice : function(){

    let totalPrice = 0;
    let hookPrice = (this.totalElementQuantity - this.totalHookQuantity) * parseFloat(receiptDetails.hookPrice);

    for(let i = 0; i < this.elements.length; i++){
      totalPrice += (this[this.elements[i]]["quantity"] * this[this.elements[i]]["unitPrice"]);
      //console.log(this[this.elements[i]]["quantity"] +"*" + this[this.elements[i]]["unitPrice"])
    }
    
    //add the price of the hooks
    totalPrice += hookPrice;
    //update the object prop
    this.totalPrice = parseFloat(totalPrice.toFixed(2));

    
    //show it on HTML
    $("#totalPriceSpan").val(totalPrice.toFixed(2));
    $("#totalPriceSpan").text("Precio Total: $" + totalPrice.toFixed(2));

  },

  submitReceipt: function(initials){
    
    let arrElementQuantity = [];
    let arrElementPrice = [];
    let objKeys = Object.keys(this);

    let strElementQuantity = "";
    let strElementPrice = "";

    let hookQ = this.totalHookQuantity;
    let dateReceived = time.year + "-" + time.month + "-" + time.day + " " + time.hour24;
    let dateAssigned = $("#inputDate4Order").val() + " " + $("#inputTime4Order").val();

    let clientID = $("#inputClientID").val();


    let totalPrice = this.totalPrice;

    for(let i = 0; i < this.elements.length; i++){
      let string = "";

      arrElementQuantity.push(this.elements[i] + "=" + this[this.elements[i]]["quantity"]);
      arrElementPrice.push(this.elements[i] + "=" + this[this.elements[i]]["unitPrice"]);

    }
    
    strElementQuantity = arrElementQuantity.join(",");
    strElementPrice = arrElementPrice.join(",");

    //Client ID acts as affiliation system to the receipt
    if(clientID == ""){
      clientID = "none";
    }

    
    /* console.log(clientID);
    console.log(strElementQuantity);
    console.log(strElementPrice);
    console.log(hookQ);
    console.log(dateReceived);
    console.log(dateAssigned);
    console.log(totalPrice); */

    $.ajax({
      type: "POST",
      url: "./php/submitReceipt.php",
      data: {
          initials: initials,
          clientID: clientID,
          eQuantity: strElementQuantity,
          ePrice: strElementPrice,
          hookQuantity: hookQ,
          dateReceived: dateReceived,
          dateAssigned: dateAssigned,
          totalPrice: totalPrice

      },
      success: function (response) {
        
        formVerification("inputElements", false);
        formVerification("inputDateAssigned", false);

        //reset HTML and JS receipt object
        $("#inputClientID").val("");
        $("#inputDate4Order").val("");
        $("#inputTime4Order").toggleClass("disableInput");
        $("#inputTime4Order").val("");
        receiptDetails.resetObject();

        //Animation
        if($("#receiptConfigPanel").hasClass("opacityAndDisable") == false){
          $("#receiptConfigPanel").toggleClass("opacityAndDisable");

          if($("#successAnimation").hasClass("hide") == true){
            setTimeout(function(){
              
              //show it
              $("#successAnimation").toggleClass("hide");
              
              setTimeout(function(){
                //hide it
                $("#successAnimation").toggleClass("hide");
                $("#receiptConfigPanel").toggleClass("opacityAndDisable");
              },2500)
            }, 40);
          }
        }
          
      },
      error: function(jqXHR, status, error){

          console.log('Status: ' + status);
          console.log('Error ' + error);
          alert("Error " + status + error);

      }
    });


  },

  resetObject: function(){
    
    let elementsDup = [];
    //create a duplicate of the elements obj
    //so at the for loop it won't affect the original obj
    //as a point of reference
    for(let i = 0; i< this.elements.length; i++){
      elementsDup.push(this.elements[i]);
    }
   
    //remove HTML receipt element list
    //remove element at the array
    for(let i = 0; i < elementsDup.length; i++){
      
      $("#elementReceipt4" + elementsDup[i]).remove();
      receiptDetails.closeElement(elementsDup[i]);
      
    }
    
    receiptDetails.updateTotalPrice();
  }

}; 

var schedule = {
  fetchSchedule: function(initials,callbackResult){
    
    $.ajax({
      type: "POST",
      url: "./php/fetchSchedule.php",
      data: {
          inputInitials: initials
      },
      dataType: 'json',
      error: function(jqXHR, status, error){
  
        console.log('Status: ' + status);
        console.log('Error ' + error);
        alert("Error " + status + error);
  
      }
    }).done(function(data){
    }, callbackResult);

  },

  generateScheduleBox: function(initials){

    
    this.fetchSchedule(initials, function(data){
      if((typeof data.schedule != "null") || (typeof data.schedule != null)){
        var arrDaySeparation = data.schedule.split(",");
      }
      

      let daysID = Object.keys(scheduleString);

      for(let i = 0; i < daysID.length; i++){

        let s;
        let day;
        let sh;
        
        let startDayHour;
        let a;
        let startDayValueHour;
        let startDayValueCycle;
        

        let endDayHour;
        let b;
        let endDayValueHour;
        let endDayValueCycle;

        

        let timeCycles = { AM: "AM", PM:"PM", closed: "CERRADO"};
        
        if(( data.schedule == "null") || (typeof data.schedule == null)){
         
          day = daysID[i];

          startDayValueHour = "";
          startDayValueCycle = "AM";

          endDayValueHour = "";
          endDayValueCycle = "PM";

        }else{

          s = arrDaySeparation[i].split("/");
          day = s[0];
          sh = s[1].split("-");
          
          startDayHour = sh[0];
          a = sh[0].split("*");
          startDayValueHour = a[0];
          startDayValueCycle = a[1];
          

          endDayHour = sh[1];
          b = sh[1].split("*");
          endDayValueHour = b[0];
          endDayValueCycle = b[1];

          

        }
        
        let dayName = scheduleString[day];

        let elementBox = document.createElement("DIV");
        elementBox.setAttribute("class", "col-lg-3  styleElementBox");
        elementBox.setAttribute("id", "divScheduleBox4" + daysID[i]);

        let spnElementName = document.createElement("SPAN");
        spnElementName.setAttribute("id", "spn4" + daysID[i]);
        spnElementName.setAttribute("class", "styleElementName");
        spnElementName.textContent = dayName;


        let iconStartDayDiv = document.createElement("DIV");
        iconStartDayDiv.setAttribute("class", "input-group mb-2 ");

        let iconStartDaySubDiv = document.createElement("DIV");
        iconStartDaySubDiv.setAttribute("class", "input-group-preprend");

        let iconStartDayTextDiv = document.createElement("DIV");
        iconStartDayTextDiv.setAttribute("class", "input-group-text");
        
        let startDayHourglassIcon = document.createElement("I");
        startDayHourglassIcon.setAttribute("class", "fa fa-hourglass-start");
        startDayHourglassIcon.setAttribute("aria-hidden", "true");

        iconStartDayTextDiv.append(schedule.createClockIcon());
        iconStartDayTextDiv.append(startDayHourglassIcon);

        iconStartDaySubDiv.append(iconStartDayTextDiv);

        let inputScheduleStartHour = document.createElement("INPUT");
        inputScheduleStartHour.setAttribute("id", "inputScheduleBegin4" + day);
        inputScheduleStartHour.setAttribute("type", "text");
        //since this thing executes only one time
        //set to disable input
        if(startDayValueCycle == "closed"){
          inputScheduleStartHour.setAttribute("class", "styleTimeInput disableInput");
        }else{
          inputScheduleStartHour.setAttribute("class", "styleTimeInput");
        }
        
        inputScheduleStartHour.setAttribute("placeholder", "00:00");
        inputScheduleStartHour.value = startDayValueHour;

        inputScheduleStartHour.addEventListener("keypress", function(e){
          let charCode = (e.which) ? e.which : event.keyCode;

          if (charCode > 31 && (charCode < 48 || charCode > 58)){
          e.preventDefault();
          }

        });

        inputScheduleStartHour.addEventListener("paste", function(e){
          e.preventDefault();
        });

        iconStartDayDiv.append(iconStartDaySubDiv);
        iconStartDayDiv.append(inputScheduleStartHour);
        iconStartDayDiv.append(schedule.createSelectList("selectBeginTimeCycle4" + daysID[i],daysID[i], timeCycles, startDayValueCycle));

        

        let iconEndDayDiv = document.createElement("DIV");
        iconEndDayDiv.setAttribute("class", "input-group mb-2 ");

        let  iconEndDaySubDiv = document.createElement("DIV");
        iconEndDaySubDiv.setAttribute("class", "input-group-preprend");

        let  iconEndDayTextDiv = document.createElement("DIV");
        iconEndDayTextDiv.setAttribute("class", "input-group-text");
        
        let endDayHourglassIcon = document.createElement("I");
        endDayHourglassIcon.setAttribute("class", "fa fa-hourglass-end");
        endDayHourglassIcon.setAttribute("aria-hidden", "true");

        iconEndDayTextDiv.append(schedule.createClockIcon());
        iconEndDayTextDiv.append(endDayHourglassIcon);

        iconEndDaySubDiv.append(iconEndDayTextDiv);

        let inputScheduleEndHour = document.createElement("INPUT");
        inputScheduleEndHour.setAttribute("id", "inputScheduleEnd4" + day);
        inputScheduleEndHour.setAttribute("type", "text");
        if(endDayValueCycle == "closed"){
          inputScheduleEndHour.setAttribute("class", "styleTimeInput disableInput");
        }else{
          inputScheduleEndHour.setAttribute("class", "styleTimeInput");
        }
        
        inputScheduleEndHour.setAttribute("placeholder", "00:00");
        inputScheduleEndHour.value = endDayValueHour;

        inputScheduleEndHour.addEventListener("keypress", function(e){
          let charCode = (e.which) ? e.which : event.keyCode;

          if (charCode > 31 && (charCode < 48 || charCode > 58)){
          e.preventDefault();
          }

        });

        inputScheduleEndHour.addEventListener("paste", function(e){
          e.preventDefault();
        });

        iconEndDayDiv.append(iconEndDaySubDiv);
        iconEndDayDiv.append(inputScheduleEndHour);
        iconEndDayDiv.append(schedule.createSelectList("selectEndTimeCycle4" + daysID[i],daysID[i], timeCycles, endDayValueCycle));

        elementBox.append(spnElementName);
        elementBox.append(iconStartDayDiv);
        elementBox.append(iconEndDayDiv);

        $("#divScheduleAppend").append(elementBox);
      }

    });

  },

  createClockIcon: function(){
    
    let clockIcon = document.createElement("I");
    clockIcon.setAttribute("class", "fa fa-clock-o");
    clockIcon.setAttribute("aria-hidden", "true");

    return clockIcon;

  },

  createSelectList: function(id,day, optionProp, optionSelected){

    let select = document.createElement("SELECT");
    select.setAttribute("id", id);
    
    let x = Object.keys(optionProp);
    
    for(let i = 0; i < x.length; i++){

      let option = document.createElement("OPTION");
      option.setAttribute("value", x[i]);
      option.textContent = optionProp[x[i]];
      
      

      if(optionSelected == x[i]){
        option.setAttribute("selected", "");
        
      }

      select.append(option);

    }

    //if it select closed, it means that the business is closed
    //so it disables both inputs and changes the Selected option from
    //the begin day and end day to CLOSED

    //the variable closedState acts as an point of reference to do
    //some action after it's change from Closed to another value
    let closedState = false;
    select.addEventListener("change", function(e){
      let previousValue = $(this).data('val');
      let currentValue = $(this).val();
      

      if((previousValue == "closed") && (currentValue != "closed")){

        if($("#selectBeginTimeCycle4" + day).val() == "AM"){
          $("#selectEndTimeCycle4" + day).val("PM");
        }else if($("#selectBeginTimeCycle4" + day).val() == "PM"){
          $("#selectEndTimeCycle4" + day).val("AM");
        }

        if($("#selectEndTimeCycle4" + day).val() == "AM"){
          $("#selectBeginTimeCycle4" + day).val("PM");
        }else if($("#selectEndTimeCycle4" + day).val() == "PM"){
          $("#selectBeginTimeCycle4" + day).val("AM");
        }

        if(($("#inputScheduleBegin4"+ day).hasClass("disableInput") == true)){
          $("#inputScheduleBegin4"+ day).toggleClass("disableInput");
        }

        if(($("#inputScheduleEnd4"+ day).hasClass("disableInput") == true)){
          $("#inputScheduleEnd4"+ day).toggleClass("disableInput");
        }
      }else if(currentValue == "closed"){

        closedState = true;
        $("#selectBeginTimeCycle4" + day).val("closed");
        $("#selectEndTimeCycle4" + day).val("closed");

        $("#inputScheduleBegin4"+ day).val("");
        $("#inputScheduleEnd4"+ day).val("");

        if(($("#inputScheduleBegin4"+ day).hasClass("disableInput") == false)){
          $("#inputScheduleBegin4"+ day).toggleClass("disableInput");
        }

        if(($("#inputScheduleEnd4"+ day).hasClass("disableInput") == false)){
          $("#inputScheduleEnd4"+ day).toggleClass("disableInput");
        }

      }

      //Fixes the issue of the user changing it without focusout
      //Since the change of value in $(this).data only is made
      //when trigger the event focusin
      $(this).data('val', currentValue);

    });

    select.addEventListener("focusin", function(e){
      //save data before the change
      $(this).data('val', $(this).val());
      
    });

    

    return select;

  }

};

var customMessages = {

  //stores the id of the messages
  messages: [],

  fetchCustomMessages: function(laundryInitials, callbackResult){

    $.ajax({
      type: "POST",
      url: "./php/fetchCustomMessages.php",
      data: {inputInitials: laundryInitials},
      success: function (data) {

        /* let result = JSON.parse(data);
        this.date = result.date;
        this.hour12 = result.hour;
        this.timeCycle = result.cycle; */

      },
      error: function(jqXHR, status, error){

          console.log('Status: ' + status);
          console.log('Error ' + error);
          alert("Error " + status + error);
      }
    }).done(function(data){
    }, callbackResult);

  },

  createNewMessageBox: function(laundryInitials, idMessage, colorTag, tagTxt, msgTxt){

    let idElement = "";
    
    if(idMessage == undefined){ //if the method is called from a click event

      if(this.messages.length == 0){
        idElement = laundryInitials + "1";
      }else{
        //get the numeration number of the last element in the array
        //of messages
        let str = this.messages[this.messages.length - 1];
        let arr = str.split(laundryInitials);//[0] = initials, [1] = numeration
        
        idElement = laundryInitials + (parseInt(arr[1]) + 1); //increment by one unit
     }
 
      //set the object prop 
      this.messages.push(idElement);
      customMessages[idElement] = {};
      customMessages[idElement]["msgTagName"] = "";
      customMessages[idElement]["msgColor"] = "";
      customMessages[idElement]["msgText"] = "";
      console.log(customMessages);
    

    }else{ //acts when the method is called from a AJAX process

      idElement = idMessage;

      //set the object prop 
      this.messages.push(idElement);
      customMessages[idElement] = {};
      customMessages[idElement]["msgTagName"] = tagTxt;
      customMessages[idElement]["msgColor"] = colorTag;
      customMessages[idElement]["msgText"] = msgTxt;

    }

    console.log(idMessage == undefined);

    

    

    let mainColumnDiv = document.createElement("DIV");
    mainColumnDiv.setAttribute("class", "col-lg-4 subTxt styleMessageBox");
    mainColumnDiv.setAttribute("style", "background-color: " + customMessages[idElement]["msgColor"]);

    let innerContainer = document.createElement("DIV");
    innerContainer.setAttribute("class", "container-fluid");

    let closeMessageButton = document.createElement("BUTTON");
    closeMessageButton.setAttribute("class", "closeMessageButtonStyle");
    closeMessageButton.textContent = "x";
    closeMessageButton.addEventListener("click", function(e){
      
      let indexToDel = customMessages.messages.indexOf(idElement);

      //it needs to delete the record at the Database first
      //to then delete it at the local array

      customMessages.deleteDBmessage(idElement, function(data){

      //delete the index
      customMessages.messages.splice(indexToDel, 1);
      mainColumnDiv.remove();
      
      });

    });


    let tagRowDiv = document.createElement("DIV");
    tagRowDiv.setAttribute("class", "row");

    let tagColumnLabel = document.createElement("DIV");
    tagColumnLabel.setAttribute("class", "col-lg-3");

    let tagLabel = document.createElement("LABEL");
    tagLabel.setAttribute("for", "inputMessageTag" + idElement);
    tagLabel.textContent = "Etiqueta:";

    tagColumnLabel.append(tagLabel);

    
    let tagColumnInput = document.createElement("DIV");
    tagColumnInput.setAttribute("class", "col-lg-9");

    let tagInput = document.createElement("INPUT");
    tagInput.setAttribute("type", "text");
    tagInput.setAttribute("name", "messageTag");
    tagInput.setAttribute("class", "inputMessageTagStyle");
    tagInput.setAttribute("placeholder", "algo rápido...")
    tagInput.setAttribute("id", "inputMessageTag" + idElement);
    tagInput.value = customMessages[idElement]["msgTagName"];

    tagInput.addEventListener("change", function(e){

      //actively change the object
      customMessages[idElement]["msgTagName"] = this.value;

    });


    tagColumnInput.append(tagInput);
    tagRowDiv.append(tagColumnLabel);
    tagRowDiv.append(tagColumnInput);


    
    let colorRowDiv = document.createElement("DIV");
    colorRowDiv.setAttribute("class", "row smallSeparation");

    let colorColumnLabel = document.createElement("DIV");
    colorColumnLabel.setAttribute("class", "col-lg-4");

    let colorLabel = document.createElement("LABEL");
    colorLabel.setAttribute("for", "selectMessageColor" + idElement);
    colorLabel.textContent = "Color:";

    colorColumnLabel.append(colorLabel);


    let colorColumnSelect = document.createElement("DIV");
    colorColumnSelect.setAttribute("class", "col-lg-8");

    let colorSelect = document.createElement("SELECT");
    colorSelect.setAttribute("class", "customColorTagStyle");
    colorSelect.setAttribute("id", "selectMessageColor" + idElement);

    colorSelect.addEventListener("change", function(e){

      //get the custom data attribute
      let colorHex = $("option[value=" + this.value + "][name=customizedColorOption]")["0"]["dataset"]["color"]; 
      
      //console.log(this.getAttribute("data-color"));
      //actively change the object
      customMessages[idElement]["msgColor"] = colorHex;

      //change the back color of the main div
      //mainColumnDiv.css("background-color", customMessages[idElement]["msgColor"]);
      mainColumnDiv.setAttribute("style", "background-color:" + customMessages[idElement]["msgColor"]);
     
    });

    colorSelect.append(this.createColorOptionList("none"));
    colorSelect.append(this.createColorOptionList("skyblue"));
    colorSelect.append(this.createColorOptionList("green"));
    colorSelect.append(this.createColorOptionList("violet"));
    colorSelect.append(this.createColorOptionList("orange"));
    
    colorColumnSelect.append(colorSelect);
    colorRowDiv.append(colorColumnLabel);
    colorRowDiv.append(colorColumnSelect);

    let messageRowDiv = document.createElement("DIV");
    messageRowDiv.setAttribute("class", "row smallSeparation");

    let messageColumnLabel = document.createElement("DIV");
    messageColumnLabel.setAttribute("class", "col-lg-2");

    let messageLabel = document.createElement("LABEL");
    messageLabel.setAttribute("for", "messageTextArea" + idElement);
    messageLabel.textContent = "Texto:";

    messageColumnLabel.append(messageLabel);

    let messageColumnTextArea = document.createElement("DIV");
    messageColumnTextArea.setAttribute("class", "col-lg-10");

    let messageTextArea = document.createElement("TEXTAREA");
    messageTextArea.setAttribute("type", "text");
    messageTextArea.setAttribute("placeholder", "texto...");
    messageTextArea.setAttribute("class", "customTextAreaStyle");
    messageTextArea.setAttribute("id", "messageTextArea" + idElement);
    messageTextArea.value = customMessages[idElement]["msgText"];


    messageTextArea.addEventListener("change", function(e){
      
      //Deny if there's no value
      if(this.value == ""){
        //prevent from empty it
        this.value = customMessages[idElement]["msgText"];
      }else{
        //actively change the object
        customMessages[idElement]["msgText"] = this.value;
      }

    });

    messageColumnTextArea.append(messageTextArea);
    messageRowDiv.append(messageColumnLabel);
    messageRowDiv.append(messageColumnTextArea);

    //unite all the rows
    innerContainer.append(closeMessageButton);
    innerContainer.append(tagRowDiv);
    innerContainer.append(colorRowDiv);
    innerContainer.append(messageRowDiv);

    mainColumnDiv.append(innerContainer);

    $("#divAppendCustomMessages").append(mainColumnDiv);


  },


  createColorOptionList: function(value){

    let color = {
      none: "",
      skyblue: "#7FE5FF",
      green: "#87E8C1",
      violet: "#DCA2E8",
      orange: "#EBAB28"

    }

    let colorString = {
      none: "",
      skyblue: "Celeste",
      green: "Verde",
      violet: "Violeta",
      orange: "Naranja"
    }

    let option = document.createElement("OPTION");
    option.setAttribute("value", value);
    option.setAttribute("name", "customizedColorOption");
    option.setAttribute("data-color", color[value]); //set custom data attribute
    
    option.textContent = colorString[value];

    return option;
  },

  deleteDBmessage: function(idMessage, callbackResult){

    $.ajax({
      type: "POST",
      url: "./php/deleteMessageSuperuser.php",
      data: {idMessage: idMessage} 
    ,
      error: function(jqXHR, status, error){

          console.log('Status: ' + status);
          console.log('Error ' + error);
          alert("Error " + status + error);
      }
    }).done(function(data){
    }, callbackResult);

  }

};


var time = {
  date: "",
  hour12: "",
  hour24: "",
  timeCycle: "",
  day:"",
  month:"",
  year: 0,

  fetchDateTimeServer: function(callbackResult){
    $.ajax({
      type: "POST",
      url: "./php/fetchDateTimeServer.php",
      
      success: function (data) {

        /* let result = JSON.parse(data);
        this.date = result.date;
        this.hour12 = result.hour;
        this.timeCycle = result.cycle; */

      },
      error: function(jqXHR, status, error){

          console.log('Status: ' + status);
          console.log('Error ' + error);
          alert("Error " + status + error);
      }
    }).done(function(data){
    }, callbackResult);

  },

  printDateTime: function(){

    this.fetchDateTimeServer(function(data){
      
      let result = JSON.parse(data);
      time.date = result.date;
      time.hour12 = result.hour12;
      time.timeCycle = result.cycle;
      time.hour24 = time.convertTime12to24(time.hour12 + " " + time.timeCycle);
      
      $("#dateTimeInfo").text("Fecha de hoy: " + time.date + " | Hora: " + time.hour12 + time.timeCycle);

      //process the date, divide its components
      //the format in which it comes fetched is
      //day-month-year
      let arr = time.date.split("/");
      
      
      time.day = arr[0];
      time.month = arr[1];
      time.year = parseInt(arr[2]);
      
      //limit the inputs
      time.limitMinMaxInputs();
    });
  
  },

  limitMinMaxInputs: function(){

    //limit the inputs of type date and time
    //to the business schedules
    let year = time.year.toString();
    let month = time.month.toString();
    let day = time.day.toString();

    if(month.length == 1){
      month = "0" + month;
    }
    
    if(day.length == 1){
      day = "0" + day;
    }
    
    $("input[type=date]").attr("min", year + "-" + month + "-" + day);

  },

  convertTime12to24 : function(time12h){
    const [time, modifier] = time12h.split(' ');
  
    let [hours, minutes] = time.split(':');

    if((typeof minutes === undefined)||(typeof minutes === "undefined")){
      minutes = "00";
    }

    if (hours === '12') {
      hours = '00';
    }
    
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
  
    return `${hours}:${minutes}`;
  }

};

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
              $("#masterUserValueConfiguration").toggleClass("hide");

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

                //this need to be rewritten
                superuser.initials = initials;
               
                schedule.generateScheduleBox(initials);

                customMessages.fetchCustomMessages(superuser.initials, function(data){
                
                  let dataObj = JSON.parse(data);
                  let keys = Object.keys(dataObj);
                  
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

        }else if((window.location.pathname == "/Tallao/panel.html") || (window.location.pathname == "panel.html")){

            fetchPanelData(cookie.userhash, function(dataCallback){
                let id = dataCallback.id;
                let orders = dataCallback.orders;
                console.log(dataCallback);
                tagShowID(id);
            });

        }else if(window.location.pathname == "/Tallao/masterpanel.html"){

          verification = {
            inputElements: false,
            inputDateAssigned: false,
          };
          formVerification("load", false);
          formVerification("inputElements", false);
          formVerification("inputDateAssigned", false);

          fetchMyAccountData(cookie.userhash, cookie.usertype, function(dataCallback){

            let initials = dataCallback.initials;
            superuser.initials = initials;
            

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

      $("input[type=number]").keypress(function(e){
        
        if ((e.which === 69) || (e.which === 45) || (e.which === 101)) {
          e.preventDefault();
        }
        
      });

      $("input[type=text][name=inputHour]").keypress(function(e){
        console.log(e.which);
        let charCode = (e.which) ? e.which : event.keyCode;

        if (charCode > 31 && (charCode < 48 || charCode > 58)){
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
          url: "./php/updateServiceOffer.php",
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
        
        //get the price of the hook
        let hookPrice = $("#inputPrice4hook").val();
        
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
          url: "./php/updatePriceConfig.php",
          data: {
              inputUserHash: cookie.userhash,
              serviceoffer: serviceSelected,
              priceConfig: string,
              priceHook: hookPrice

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

        if(id.search("custom") != -1){

          generateCustomElementReceiptBox(id, service);

        }else{

          if($("#elementReceipt4" + id + "-" + service).length == false){
            generateCustomElementReceiptBox(id, service);
          }

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
            receiptDetails.fullHookQuantity();
            if($("#inputHookQuantity").hasClass("disableInput") == false){
              $("#inputHookQuantity").toggleClass("disableInput");
            }

          }else{

            if($("#inputHookQuantity").hasClass("disableInput") == true){
              $("#inputHookQuantity").toggleClass("disableInput");
            }

          }
      });

      let previousVal = 0;
      $("#inputHookQuantity").keypress(function(e){

        

        if(this.value < 0){
          this.value = 1;
        }
        
        //also store it in the data property
        $("#inputHookQuantity").data("prev",this.value);
        

        previousVal = this.value;
        console.log(previousVal);
      });

      $("#inputHookQuantity").change(function(e){
        
        //prevent the user from writing values below 0
        if(this.value < 0){
          this.value = 1;
        }
        
        previousVal = $("#inputHookQuantity").data("prev");
        
        //limit the user input to the maximum 
        if(this.value > receiptDetails.totalElementQuantity){
          this.value = receiptDetails.totalElementQuantity;
        }else{
          receiptDetails.updateQuantityFromHookInput(previousVal, this.value);
        }

        //hold the changed value as the previous value
        $("#inputHookQuantity").data("prev", this.value);
      });

      

      $("#submitOrder").click(function(e){

        //$("#receiptConfigPanel").css("visibility", "hidden");
        formVerification("submit", false);
        if($("#submitOrder").hasClass("disableButton") == false){
          receiptDetails.submitReceipt(superuser.initials);

        }
        
      });

      $("#submitChangeSchedule").click(function(e){
        let x = Object.keys(scheduleString);
        let arr = [];
        let strToSend = "";

        for(let i = 0; i < x.length; i++){

          let valueScheduleBegin = $("#inputScheduleBegin4" + x[i]).val();
          let valueCycleBegin = $("#selectBeginTimeCycle4" + x[i] + " :selected").val();
          let valueScheduleEnd = $("#inputScheduleEnd4" + x[i]).val();
          let valueCycleEnd = $("#selectEndTimeCycle4" + x[i] + " :selected").val();


          let string = x[i] + "/" + valueScheduleBegin+ "*" + valueCycleBegin + "-" + valueScheduleEnd + "*" +valueCycleEnd;
          arr.push(string);
        }
        
        strToSend = arr.join();
        
        console.log(strToSend);
        $.ajax({
          type: "POST",
          url: "./php/updateSuperuserSchedule.php",
          data: {
              initials: superuser.initials,
              schedule: strToSend
          },
          success: function (response) {
              $("#submitChangeSchedule").toggleClass("disableButton");
              $("#submitChangeSchedule").text("¡ACTUALIZADO!");
              
          },
          error: function(jqXHR, status, error){

              console.log('Status: ' + status);
              console.log('Error ' + error);
              alert("Error " + status + error);
    
          }
        });
        
      });

      $("#inputDate4Order").change(function(e){
        //enables the selection of the hour when the day is selected
        //this is made to put the limits of min and max into the 
        //input type hour

        //format when getting the value 
        //year-month-day
        let arr = this.value.split("-");
        let year = parseInt(arr[0]);
        let month = parseInt(arr[1]);
        let day = parseInt(arr[2]);

        //the Date format starts in January as the index 0
        //so correct it, we decrement by 1 unit
        month -= 1;

        
        let date = new Date(year,month,day);
        let dayPos = date.getDay();
        
        let weekday = new Array(7);
        weekday[0] = "sunday";
        weekday[1] = "monday";
        weekday[2] = "tuesday";
        weekday[3] = "wednesday";
        weekday[4] = "thursday";
        weekday[5] = "friday";
        weekday[6] = "saturday";  

        schedule.fetchSchedule(superuser.initials, function(data){

          let arr = data.schedule.split(",");
          let obj = {};
          let scheduleSelected = "";
          let y = [];
          let startDayHour = "";
          let startDayCycle = "";
          let endDayHour = "";
          let endDayCycle = "";

          //final results
          let min = "";
          let max = "";

          //function to convert the 12h format to 24h
          const convertTime12to24 = (time12h) => {
            const [time, modifier] = time12h.split(' ');
          
            let [hours, minutes] = time.split(':');
          
            if (hours === '12') {
              hours = '00';
            }
          
            if (modifier === 'PM') {
              hours = parseInt(hours, 10) + 12;
            }
          
            return `${hours}:${minutes}`;
          }

          for(let i = 0; i < arr.length; i++){
            let x = arr[i].split("/");
            obj[x[0]] = x[1];
          }

          scheduleSelected = obj[weekday[dayPos]];
          
          y = scheduleSelected.split("-");

          //start day split
          z = y[0].split("*");
          startDayHour = z[0];
          startDayCycle = z[1];

          //start day split
          z = y[1].split("*");
          endDayHour = z[0];
          endDayCycle = z[1];

          //correct the lack of 0
          if(startDayHour.length == 4){
            startDayHour = "0" + startDayHour;
          }

          if(endDayHour.length == 4){
            endDayHour = "0" + endDayHour;
          }

          min = convertTime12to24(startDayHour + " " + startDayCycle);
          max = convertTime12to24(endDayHour + " " + endDayCycle);

          
          //set limit
          $("input[type=time]").attr("min", min);
          $("input[type=time]").attr("max", max);

          if($("input[type=time]").hasClass("disableInput") == true){
            $("input[type=time]").toggleClass("disableInput");
          }

        });

      });

      $("#inputTime4Order").change(function(){

        //check the other date input
        if(($("#inputDate4Order").val() == "") || ($(this).val() == "")){
          //set disabled button
          formVerification("inputDateAssigned", false);
        }else{
          formVerification("inputDateAssigned", true);
        }

      });


      $("#buttonAddCustomMessage").click(function(e){

        customMessages.createNewMessageBox(superuser.initials);

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
      let hookPrice = data.hook;
      
      if(data[serviceSelected] != "null"){

        array = data[serviceSelected].split(",");
        receiptDetails.hookPrice = hookPrice;

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
            $("#inputPrice4hook").val(hookPrice);
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

    idElement = id + index + "-" + service; //custom1-iron
    
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

    elementNameHTML.addEventListener("change", function(e){

      let customElementName = this.value;
      let arr = this.id.split("spn4");
      let actualID = arr[1];
      let holdValue = receiptDetails[actualID];

      let newID = actualID + "*" + customElementName;
      let newIDHTML = "spn4" + actualID + "*" + customElementName;
      
      //make the old id be zero
      receiptDetails[actualID] = 0;

      //this replaces the element id from the element array
      //with the new one. Adding the custom element name that the user previously input

      //update
      receiptDetails.elements.splice(receiptDetails.elements.indexOf(actualID), 1);
      receiptDetails.elements.push(newID);
      this.id = newIDHTML;
      //update dynamically create object variable
      idElement = newID;
      receiptDetails[newID] = holdValue;
    });

    elementNameHTML.addEventListener("keypress", function(e){
     
      if((e.which === 45) || (e.which === 42)){
        e.preventDefault();
      }

    });
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

    
    $("#elementReceipt4" + xID).remove();
    receiptDetails.closeElement(idElement);
    

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

  inputQuantity.addEventListener("change", function(e){
    
    let val = parseInt(this.value);
    
    if(val <= 0){
      this.value = 1;
    }

  });

  inputQuantity.addEventListener("input", function(e){
    if((this.value <= 0) || (this.value == "")){
      e.stopImmediatePropagation();
    }else{
      let changedPrice = (inputQuantity.value * inputPrice.value);
      
      spnResultTotal.value = (inputQuantity.value * inputPrice.value).toFixed(2);
      spnResultTotal.textContent = "$" + (inputQuantity.value * inputPrice.value).toFixed(2);

      receiptDetails.updateElementProp(idElement, inputQuantity.value, inputPrice.value);
      
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
    
    spnResultTotal.value = (inputQuantity.value * inputPrice.value).toFixed(2);
    receiptDetails.updateElementProp(idElement, inputQuantity.value, inputPrice.value);  
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
  
  // console.log(inputQuantity.value);
  receiptDetails.updateElementProp(idElement, inputQuantity.value, inputPrice.value);
  
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
  
  if ((e.which === 69) || (e.which === 45) || (e.which === 101)) {
    e.preventDefault();
  }

}
function dynObjPreventDefault(e){
  e.preventDefault();
}

