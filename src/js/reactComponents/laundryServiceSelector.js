"use strict";
// main.js

const React = require("react");
const {fetchServiceOffer} = require("../ajax-requests/laundry-configs");
const {getStaticText} = require("../../../translation/frontend/translator");


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
            fetchServiceOffer().then(({data:{serviceoffer}}) =>{
                this.returnData(serviceoffer[0]);
                that.setState({
                    selected: serviceoffer[0],
                    services: serviceoffer,
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
                        }, getStaticText(service))
                    })
                )
            );
        }else{
            return(null);
        }
    }
}

module.exports =  ServiceSelector;       