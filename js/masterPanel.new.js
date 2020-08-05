'use strict';

require.config({
    paths:{
        jquery: [
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
            "./lib/jquery"],
        formVerification:["frontendModules/formVerification"],
        design: "design.new",
        bootstrap: ["./lib/bootstrap.bundle.min"],
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development'
        
    },
    shim: {
        bootstrap: {
            deps: ["jquery"]
        },
    }
});

require(["jquery","formVerification", "design", "bootstrap"], 
function($, formVerification){

    //1st session handling
    (function(){

        const serviceOfferString = {
            iron: "Planchado",
            washiron: "Lavado y planchado",
            wash: "Lavado",
            dryclean: "Lavado en seco"
        };

        //key = string to id
        //value = string to show
        const elementsString = {
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
            
            custom: function(name){
            //this function is called when it's fetching 
            //custom elements. This will create a new prop on 
            //this object.  
            console.log(this);
            this[name] = name;
            }
        };

        const scheduleString = {
            monday: "Lunes",
            tuesday: "Martes",
            wednesday: "Miércoles",
            thursday: "Jueves",
            friday: "Viernes",
            saturday: "Sábado",
            sunday: "Domingo"
        };

        var serviceOffer = {
            services: [],
            sessionPrice: [],

            fillServiceBasicElementsHTML: function(data){
                serviceOffer.services = data.trim().split(",");

                serviceOffer.services.map((value, i) =>{
                    $("input[type='checkbox'][value='"+value+"']").prop("checked", true);

                    let option = document.createElement("OPTION");
                    option.setAttribute("value", value);
                    option.textContent = serviceOfferString[value];
                    $("#selectServiceType").append(option);
                });

                if(serviceOffer.services[0] != "null"){
                serviceOffer.fetchProcessElementPrice();
                }   
            },

            fetchElementsPrice: function(){
                let serviceSelected = $("#selectServiceType :selected").val();
                require(["./requestsModules/ajaxReqSuperUserConfigs"], function(ajaxReq){
                    let query = ajaxReq.fetchElementsPrice({serviceOffer:serviceSelected});
                    query.then((data) =>{
                        
                        if(data[serviceSelected] !== "null"){
                            receiptDetails.hookPrice = data.hook;

                            data[serviceSelected].split(",").map((value, i) =>{
                                let elementSplit = array[i].split("=");
                                let id = elementSplit[0];
                                let price = elementSplit[1];

                                serviceOffer.sessionPrice[id] = price;
                                $("#priceTag4" + id).text("$" + price);
                                $("#priceTag4" + id).val(price);
                            });
                        }else{
                            Object.keys(elementsString).map((value, i) =>{
                                $("#priceTag4" + value).text("Precio no asignado");
                                $("#priceTag4" + value).val("nonAssigned");
                            })
                        }
                    }).catch(err => console.error(err));
                });
            }

        };

        var orderDetails = {
            elements:[], //array to store data
            totalHookQuantity: 0,
            totalElementQuantity: 0,
            hookPrice:0,

            updateElementProp: function(id, cQuantity, unitPrice){
                let totalUpdate = 0;

                if(!cQuantity){
                    formVerification("inputElements", false);
                  }else{
                    formVerification("inputElements", true);
                }

                if(!this[id]){
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
                let indexToDel = this.elements.indexOf(id);

                this.elements.splice(indexToDel, 1);

                this.totalElementQuantity = this.totalElementQuantity - eQuantity;
                this.totalHookQuantity = this.totalHookQuantity - eQuantity;

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
            
                this.elements.map((value, i) =>{
                  allSum += +this[value]["quantity"];
                });
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
            
                this.elements.map((value, i) =>{
                  totalPrice += (this[value]["quantity"] * this[value]["unitPrice"]);
                });
                //add the price of the hooks
                totalPrice += hookPrice;

                //update the object prop
                this.totalPrice = parseFloat(totalPrice.toFixed(2));
                
                //show it on HTML
                $("#totalPriceSpan").val(totalPrice.toFixed(2));
                $("#totalPriceSpan").text("Precio Total: $" + totalPrice.toFixed(2));
            },

            submitReceipt: function(){
                //data input preprocessing
                let arrElementQuantity = [];
                let arrElementPrice = [];
                let objKeys = Object.keys(this);

                let strElementQuantity = "";
                let strElementPrice = "";

                let hookQ = this.totalHookQuantity;
                let dateReceive = time.year + "-" + time.month + "-" + time.day + " " + time.hour24;
                let dateAssign = $("#inputDate4Order").val() + " " + $("#inputTime4Order").val();

                let clientID = $("#inputClientID").val();
                let clientName = $("span[name=spnReceiptClientNameData]").text();
                let strIndications = $("#inputIndications").text();
                let totalPrice = this.totalPrice;

                this.elements.map((value, i) => {
                    arrElementQuantity.push(value + "=" + this[value]["quantity"]);
                    arrElementPrice.push(value + "=" + this[value]["unitPrice"]);
                });

                strElementQuantity = arrElementQuantity.join(",");
                strElementPrice = arrElementPrice.join(",");

                //Client ID acts as affiliation system to the receipt
                if(clientID == ""){
                clientID = "none";
                clientName = "none";
                }

                let obj = {
                    clientID: clientID,
                    clientName: clientName,
                    eQuantity: strElementQuantity,
                    ePrice: strElementPrice,
                    hookQuantity: hookQ,
                    dateReceive: dateReceive,
                    dateAssign: dateAssign,
                    totalPrice: totalPrice,
                    indications: strIndications
                };

                require(["./requestsModules/ajaxReqOrders"], function(ajaxReq){
                    let query = ajaxReq.submitOrder(obj);

                    query.then(()=>{
                        formVerification("inputElements", false);
                        formVerification("inputDateAssigned", false);

                        //reset HTML and JS receipt object
                        $("#inputClientID").val("");
                        $("#inputDate4Order").val("");
                        $("#inputTime4Order").toggleClass("disableInput");
                        $("#inputTime4Order").val("");
                        $("#inputIndications").val("");
                        receiptDetails.resetObject();

                        //checkmark animation
                        if(!$("#receiptConfigPanel").hasClass("opacityAndDisable")){
                            $("#receiptConfigPanel").toggleClass("opacityAndDisable");

                            if($("#successAnimation").hasClass("hide")){
                                setTimeout(function(){
                                    //show it
                                    $("#successAnimation").toggleClass("hide");
                                    setTimeout(function(){
                                        //hide it
                                        $("#successAnimation").toggleClass("hide");
                                        $("#receiptConfigPanel").toggleClass("opacityAndDisable");
                                    },1500)
                                }, 40);
                            }
                        }
                        //scroll to top
                        window.scrollTo(0,0);
                    }).catch(err => console.error(err));
                });
            },

            resetObject: function(){ //* can be rewritten to be shorter
            
                let elementsDup = Array.from(this.elements);
              
                //remove HTML receipt element list
                //remove element at the array
                elementsDup.map(value =>{
                    $("#elementReceipt4" + value).remove();
                    receiptDetails.closeElement(value);
                });
                
                receiptDetails.updateTotalPrice();
            }
        };
        
        $(document).ready(function(){

            require(["frontendModules/sessionHandler"], function(session){
                session.check();

                require([ "react", "react-dom"], function (React, ReactDOM){
                    
                    require(["./requestsModules/ajaxReqCustomMessages", "./reactComponents/customMessages"], 
                    function(ajaxReq, customMessages){
                        ajaxReq.fetch().then(data =>{
                            ReactDOM.render(
                                React.createElement(customMessages.MessagePanel, {data:data, mode: "use", targetID:"inputIndications"}),
                                document.getElementById("appendCustomMessages") 
                            )
                        }).catch(err => console.error(err));
                    });

                    require(["./requestsModules/ajaxReqSuperUserConfigs","./reactComponents/writeOrder"], 
                    function(ajaxReq, writeOrder){
                        ajaxReq.fetchElementsPrice({serviceOffer:"iron"}).then(data =>{
                            let obj = JSON.parse(data);
                            Object.assign(obj, {
                                serviceOffer: "iron",
                                idOnActiveOrderElement: "activeElementsOnOrderAppendable",
                                idToTotalPrice: "totalPriceSpanValue",
                            });
                            let order =  ReactDOM.render(
                                React.createElement(writeOrder.WriteOrderPanel, obj),
                                document.getElementById("divSelectableElements")
                            );
                        });
                    });


                    $("#submitOrder").click(function(e){
                        require(["./requestsModules/ajaxReqSuperUserConfigs","./reactComponents/writeOrder"], 
                        function(ajaxReq, writeOrder){
                            ajaxReq.fetchElementsPrice({serviceOffer:"washiron"}).then(data =>{
                                let obj = JSON.parse(data);
                                //console.log(data);
                                Object.assign(obj, {
                                    serviceOffer: "washiron",
                                    idOnActiveOrderElement: "activeElementsOnOrderAppendable",
                                    idToTotalPrice: "totalPriceSpanValue",
                                });
                                let order =  ReactDOM.render(
                                    React.createElement(writeOrder.WriteOrderPanel, obj),
                                    document.getElementById("divSelectableElements")
                                );
                            });
                        });
                    });

                });
            });



        });

        function newWriteOrder(){ //returns a new instance of panel

        }

        

    })();

});