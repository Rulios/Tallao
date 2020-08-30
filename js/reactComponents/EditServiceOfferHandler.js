"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development',
        ServiceOfferContainers: "./reactComponents/EditServiceOfferContainers",
        ajaxReqSuperUserConfigs: "./requestsModules/ajaxReqSuperUserConfigs",
    }
});

define(["react", "react-dom", "ServiceOfferContainers", "ajaxReqSuperUserConfigs"],
function(React, ReactDOM, ServiceOfferContainers, ajaxReq){

    async function getServiceOffer(){
        try {
            let query = await ajaxReq.fetchServiceOffer();
            return query;
        }catch(err){console.error(err);}
    }

    function renderUpdateButton({status, onClick}){ //just when Schedule is on edit mode
        ReactDOM.render(
            React.createElement(ServiceOfferContainers.UpdateServiceOfferButton,{
                onClick: () =>{onClick();}
            }),
            document.getElementById("UpdateServiceOfferButtonContainer")
        );
    }

    class ServiceOffer extends React.Component{
        constructor(props){
            //props: mode
            super(props);
            this.state = {
                baseServices: ["iron", "washIron", "wash", "dryClean"],
                availableServices: []
            };
        }

        updateServiceOffer(){
            ajaxReq.updateServiceOffer({serviceOffer: this.state.availableServices.join(",")})
            .then(response =>{
                if(response === "OK"){
                    ServiceOfferContainers.SuccessMessage();
                }
            }).catch(err =>{
                console.error(err);
            });
        }

        componentDidMount(){
            //render update button
            renderUpdateButton({
                status: "", 
                onClick: () => {this.updateServiceOffer();}
            });
            //fetch data
            getServiceOffer().then(ServiceStr =>{
                let serviceOffer = ServiceStr.split(",");
                this.setState({
                    availableServices: serviceOffer
                });
            });
        }

        serviceCheckBoxHandler(service, isChecked){
            let prevAvailableServices = this.state.availableServices.slice();
            if(prevAvailableServices.indexOf(service) < 0 && isChecked){
                prevAvailableServices.push(service);
            }else{
                prevAvailableServices.splice(prevAvailableServices.indexOf(service), 1);
            }
            this.setState({
                availableServices: prevAvailableServices
            });
        }

        render(){
            console.log(this.state.availableServices);
            let el2Render = [];
            el2Render = this.state.baseServices.map(service =>{
                return React.createElement(ServiceOfferContainers.EditBox, {
                    key : `editService${service}`,
                    service: service,
                    checked: (this.state.availableServices.indexOf(service) !== -1) ? true: false,
                    onChecked: (service, isChecked) =>{
                        this.serviceCheckBoxHandler(service, isChecked);
                    }
                });
            });
            return el2Render;
        }
    }
    return ServiceOffer;

});