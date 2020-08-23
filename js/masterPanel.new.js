'use strict';

require.config({
    paths:{
        jquery: [
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
            "./lib/jquery"],
        design: "design.new",
        bootstrap: ["./lib/bootstrap.bundle.min"],
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development',
        formVerification:["frontendModules/formVerification"],
        sessionHandler: "frontendModules/sessionHandler",
        ajaxReqUserCreds : "./requestsModules/ajaxReqUserCreds",
        ajaxReqOrders: "./requestsModules/ajaxReqOrders",
        ajaxReqSuperUserConfigs: "./requestsModules/ajaxReqSuperUserConfigs",
        ajaxReqCustomMessages: "./requestsModules/ajaxReqCustomMessages",
        laundryServiceSelector: "./reactComponents/laundryServiceSelector",
        clientIDHandler: "./reactComponents/clientIDHandler",
        writeOrder: "./reactComponents/writeOrder",
        customMessages: "./reactComponents/customMessages",
        time: "./reactComponents/Time"
    },
    shim: {
        bootstrap: {
            deps: ["jquery"]
        },
    }
});

require(["jquery", "react", "react-dom", "design", "bootstrap"], 
function($,React, ReactDOM){

    //1st session handling
    (function(){
        
        $(document).ready(function(){
            
            require(["sessionHandler"], function(session){
                session.check();

                ReactDOM.render(
                    React.createElement(Main, {

                    }),
                    document.getElementById("containerServiceSelector")
                );

            });         
        });

        function animateSuccess(){
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
                    },1500)
                }, 40);
                }
            }
            //scroll to top
            window.scrollTo(0,0);
        }

        //need to reset the activeElementsOnOrder
        //do the animation of completed
        //and do the AJAX submit call
        class Main extends React.Component{

            todayDate //property handled as global, not as state

            constructor(props){
                super(props);
                let x = this.formVerification;

                this.state = {
                    modulesStates: {
                        formVerification: false,
                        serviceSelector : false,
                        writeOrder: false,
                        customMessages: false
                    },
                    allLoaded: false,
                    serviceSelected: "",
                    dateForOrder:"",
                    timeForOrder:"",
                    order:{
                        elementsOnOrder: {},
                        hookQuantity: 0,
                        totalPrice: 0
                    },
                    customer:{
                        id:"",
                        name:""
                    }
                }
            }

            updateServiceSelected(selected){
                this.setState({serviceSelected: selected});
            }

            updateDateForOrder(date){
                //console.log(typeof date);
                this.setState({dateForOrder: date});
            }

            updateTimeForOrder(time){
                this.setState({timeForOrder: time});
            }

            renderLaundryName(){
                require(["ajaxReqUserCreds"],  function(ajaxReq){
                    ajaxReq.fetchAccountCreds().then(query =>{
                        let data = JSON.parse(query);
                        document.getElementById("showLaundryName").textContent = data.name;
                    }).catch( () =>{
                        document.getElementById("showLaundryName").textContent = "Error";
                    });
                });
            }

            renderCustomMessages(){
                let CustomMessages = require("customMessages");
                ReactDOM.render(
                    React.createElement(CustomMessages, {
                        mode: "use",
                        targetID: "inputIndications"
                    }),
                    document.getElementById("containerCustomMessages")
                )
            }

            renderClientIDHandler(){
                let ClientIDHandler = require("clientIDHandler");
                ReactDOM.render(
                    React.createElement(ClientIDHandler.InputClientID, {
                        mode: "onOrder",
                        getClientData : (data) =>{
                            this.setState({
                                customer: data
                            });
                        }
                    }),
                    document.getElementById("containerSelectedClient")
                )
            }

            renderWriteOrder(){
                if(this.state.serviceSelected !== ""){
                    let WriteOrderPanel = require("writeOrder");
                    ReactDOM.render(
                        React.createElement(WriteOrderPanel, {
                            serviceOffer: this.state.serviceSelected,
                            idOnActiveOrderElement: "activeElementsOnOrderAppendable",
                            idToTotalPrice: "totalPriceSpanValue",
                            idSelectableElements: "containerSelectableElements" ,
                            getOrderDetails: (details) =>{ 
                                this.setState({
                                    order: details
                                })
                            }
                        }),
                        document.getElementById("activeElementsOnOrderAppendable")
                    );
                }
            }

            renderTimeComponents(){
                let Timer = require("time");
                ReactDOM.render(
                    React.createElement(Timer.Timer,{
                        getTodayDateTime: (today) =>{
                            //parse date
                            //to prevent updating
                            //update if single digit
                            today.month = (today.month < 10) ? `0${today.month}`: today.month;
                            today.day = (today.day < 10) ? `0${today.day}`: today.day;
                            today.hour = (today.hour < 10) ? `0${today.hour}`: today.hour;
                            today.minutes = (today.minutes < 10) ? `0${today.minutes}`: today.minutes;

                            this.state.todayDate = 
                            `${today.year}-${today.month}-${today.day} ${Timer.convert12hTo24h(`${today.hour}:${today.minutes} ${today.cycle}`)}`;

                            this.renderDateTimeInputOrder(today);
                        }   
                    }),
                    document.getElementById("containerDateTime")
                )
            }
            
            renderDateTimeInputOrder(date){
                //since it has to wait for information
                //this has to be render after knowing the data
                //of time
                //FORMAT for MIN: YYYY-MM-DD
                let Time = require("time");
                ReactDOM.render(
                    [React.createElement("label", {
                        key: "label4Date",
                        htmlFor: "inputDate4Order",
                        className: "bold small-rightMargin"
                    }, "Fecha:"),
                    React.createElement(Time.DateInput, {
                        key: "inputDate4Order",
                        id: "inputDate4Order",
                        getDate: (dateInput) =>{this.updateDateForOrder(dateInput);},
                        min: `${date.year}-${date.month}-${date.day}`,
                    }),

                    React.createElement("label", {
                        key:"label4Time",
                        htmlFor: "inputTime4Order", 
                        className: "bold small-rightMargin"
                    }, "Hora:"),
                    React.createElement(Time.TimeInput, {
                        id: "inputTime4Order",
                        key: "inputTime4Order",
                        getTime: (timeInput) =>{this.updateTimeForOrder(timeInput);},
                        //className: "disableInput"
                    })]
                    ,
                    document.getElementById("containerDateTimeInput")
                );
            }

            renderSubmitButton(){
                ReactDOM.render(
                    React.createElement("button",{
                        className:  "submitButtonOrder",
                        type: "submit",
                        onClick: (e) =>{
                            const indications = document.getElementById("inputIndications").value;
                            const {order:{elementsOnOrder, hookQuantity, totalPrice}} = this.state;
                            const {dateForOrder, timeForOrder, todayDate, customer} = this.state;
                            /* console.log(this.state);
                            console.log(this.state.todayDate.toString()); */
                            let jsonString = JSON.stringify({
                                indications: indications,
                                elementsOnOrder: elementsOnOrder,
                                hookQuantity: hookQuantity,
                                totalPrice: totalPrice,
                                dateTimeAssignedForOrder: `${dateForOrder} ${timeForOrder}:00`,
                                dateTimeOrderCreated: todayDate,
                                clientID: customer.id,
                                clientName: customer.name
                            });

                            console.log(jsonString);
                            try{
                                require(["ajaxReqOrders"], function(ajaxReq){
                                    let query = ajaxReq.submitOrder(jsonString);
                                    query.then(response =>{
                                        console.log(response);
                                        let WriteOrderPanel = require("writeOrder");
                                        //reset the write order handler
                                        console.log(WriteOrderPanel.prototype.resetState);
                                        WriteOrderPanel.prototype.resetState();
                                        animateSuccess();

                                    });
                                    
                                });
                                
                            }catch(err){
                                console.error(err);
                            }
                            
                        }
                    }, "Completar orden"),
                    document.getElementById("containerSubmit")
                );
            }


            componentDidMount(){
                let isAllLoaded = true;
                Object.values(this.state.modulesStates).map(value =>{
                    if(!value){
                        isAllLoaded = false;
                    }
                });
                if(!isAllLoaded){
                    let that = this;
                    require(["formVerification", "laundryServiceSelector", 
                    "clientIDHandler","writeOrder", "customMessages", "time"],
                    function(){
                        that.setState({
                            modulesStates: {
                                formVerification : true,
                                serviceSelector: true,
                                writeOrder: true,
                                customMessages: true
                            },
                            allLoaded: true
                        });
                    });
                }
                this.renderLaundryName();
            }

            componentDidUpdate(){
                this.renderClientIDHandler();
                this.renderCustomMessages();
                this.renderWriteOrder();
                this.renderSubmitButton();
                this.renderTimeComponents();
            }
            
            render(){
                //console.log(this.state);
                if(this.state.allLoaded){
                    let ServiceSelector = require("laundryServiceSelector");
                    return(
                        React.createElement(ServiceSelector,{
                            getServiceSelected : (selected) =>{this.updateServiceSelected(selected);}
                        })
                    );
                }else{
                    return(null);
                }
            }   
        }    
    })();

});