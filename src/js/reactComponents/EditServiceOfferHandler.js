"use strict";
const React= require("react");
const ServiceOfferContainers = require("./reactComponents/EditServiceOfferContainers");
const ajaxReqSuperUserConfigs = require("./requestsModules/ajaxReqSuperUserConfigs");

async function getServiceOffer(){
    try {
        let query = await ajaxReq.fetchServiceOffer();
        return query;
    }catch(err){console.error(err);}
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
        ajaxReqSuperUserConfigs.updateServiceOffer({serviceOffer: this.state.availableServices.join(",")})
        .then(response =>{
            if(response === "OK"){
                ServiceOfferContainers.SuccessMessage();
            }
        }).catch(err =>{
            console.error(err);
        });
    }

    componentDidMount(){
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

        el2Render.push(
            React.createElement(ServiceOfferContainers.UpdateServiceOfferButton,{
                key: "UpdateServiceOfferBtn",
                onClick: () => this.updateServiceOffer()
            })
        );

        return el2Render;
    }
}
module.exports =  ServiceOffer;