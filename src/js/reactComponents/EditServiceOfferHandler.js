"use strict";
const React= require("react");
const ServiceOfferContainers = require("./EditServiceOfferContainers");
const ajaxReqLaundryConfigs = require("../requestsModules/ajaxReqLaundryConfigs");

async function getServiceOffer(){
    try {
        let {data:{serviceoffer}} = await ajaxReqLaundryConfigs.fetchServiceOffer();
        return serviceoffer;
    }catch(err){console.error(err);}
}

class ServiceOffer extends React.Component{
    constructor(props){
        //props: mode
        super(props);
        this.state = {
            baseServices: ["iron", "wash_iron", "wash", "dry_clean"],
            availableServices: []
        };
    }

    updateServiceOffer(){
        ajaxReqLaundryConfigs.updateServiceOffer({serviceOffer: this.state.availableServices})
        .then(({status}) =>{
            if(status === 200){
                ServiceOfferContainers.SuccessMessage();
            }
        }).catch(err =>{
            console.error(err);
        });
    }

    componentDidMount(){
        //fetch data
        getServiceOffer().then(serviceOffer =>{
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