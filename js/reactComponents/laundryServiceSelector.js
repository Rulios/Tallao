"use strict";
// main.js
require.config({
    // module name mapped to CDN url
    paths: {
        // Require.js appends `.js` extension for you
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development',
        ajaxReqSuperUserConfigs: "../js/requestsModules/ajaxReqSuperUserConfigs"
    }
});

// load the modules defined above
//inputs shouldn't have a children
//styles should be a object
define(['react', 'react-dom', "ajaxReqSuperUserConfigs"], function(React, ReactDOM, ajaxReq){
    const serviceOfferString = {
        iron: "Planchado",
        washIron: "Lavado y planchado",
        wash: "Lavado",
        dryClean: "Lavado en seco"
    };

    class ServiceSelector extends React.Component{
        constructor(props){ 
            //props: getServiceSeleted (will return the value everytime it changes)
            super(props);
            this.state = {
                ajaxLoaded: false
            }
        }

        selectorHandler(value){
            this.setState({
                selected: value
            });
        }

        returnData(value){
            //activates the function passed as a prop to the component
            //to return the value needed
            this.props.getServiceSelected(value);
        }

        componentDidMount(){
            let that = this;
            if(!this.state.ajaxLoaded){
                ajaxReq.fetchServiceOffer().then(ServiceStr =>{
                    let services = ServiceStr.trim().split(",");
                    this.returnData(services[0]);
                    that.setState({
                        selected: services[0],
                        services: services,
                        ajaxLoaded: true
                    });
                });
            }
        }


        render(){
            if(this.state.ajaxLoaded){
                return(
                    React.createElement("select", {
                        className: "styleSelectServiceType",
                        value: this.state.selected,
                        onChange: (e) => {
                            this.selectorHandler(e.target.value);
                            this.returnData(e.target.value);
                        }
                    },
                        this.state.services.map(service =>{
                            return React.createElement("option",{
                                key: service,
                                value: service
                            }, serviceOfferString[service])
                        })
                    )
                );
            }else{
                return(null);
            }
        }
    }

    return ServiceSelector;        

});