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
        ajaxReqSuperUserConfigs: "./requestsModules/ajaxReqSuperUserConfigs",
        ajaxReqCustomMessages: "./requestsModules/ajaxReqCustomMessages",
        laundryServiceSelector: "./reactComponents/laundryServiceSelector",
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
                    todayDate: "",
                }
            }

            updateServiceSelected(selected){
                this.setState({
                    serviceSelected: selected,
                })
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

            renderWriteOrder(){
                if(this.state.serviceSelected !== ""){
                    let WriteOrderPanel = require("writeOrder");
                    ReactDOM.render(
                        React.createElement(WriteOrderPanel, {
                            serviceOffer: this.state.serviceSelected,
                            idOnActiveOrderElement: "activeElementsOnOrderAppendable",
                            idToTotalPrice: "totalPriceSpanValue",
                            idSelectableElements: "containerSelectableElements" 
                        }),
                        document.getElementById("activeElementsOnOrderAppendable")
                    );
                }
            }

            renderTimerShow(){
                let Timer = require("time");
                ReactDOM.render(
                    React.createElement(Timer.Timer,{
                        getTodayDate: (today) =>{
                            //parse date
                            //to prevent updating
                            this.todayDate = new Date(`${today.month}-${today.day}-${today.year}`);
                        }   
                    }),
                    document.getElementById("containerDateTime")
                )
            }

            renderSubmitButton(){
                ReactDOM.render(
                    React.createElement("button",{
                        className:  "submitButtonOrder",
                        type: "submit",
                        onClick: (e) =>{
                            
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
                    "writeOrder", "customMessages", "time"],
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
            }

            componentDidUpdate(){
                this.renderCustomMessages();
                this.renderWriteOrder();
                this.renderSubmitButton();
                this.renderTimerShow();
            }
            
            render(){
                console.log(this.state);
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