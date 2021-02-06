"use strict";

const React = require("react");
const EditElementsPriceHandler = require("./EditElementsPriceHandler");
const LaundryServiceSelector = require("./LaundryServiceSelector");
const {getStaticText} = require("../../../translation/frontend/translator");

const useLaundryServices = require("../custom-hooks/useLaundryServices");

//THIS IS A BUNDLE COMPONENT
//BUNDLE COMPONENTS: WHEN TWO HANDLER COMPONENTS ARE REQUIRED TO EXCHANGE DATA


function renderServiceSelectorContainer({onChange}){

    const laundryServices = useLaundryServices();


    if(laundryServices.length){
        return React.createElement("div", {
            className: "text-center supTxt-TitleTxt-Separation"
        },
            [
                React.createElement("div", {
                    key: "LaundryServiceSelectorTag",
                    className: "karla_font"
                }, getStaticText("selectTheService")),
                React.createElement(LaundryServiceSelector, {
                    key: "LaundryServiceSelector",
                    services: laundryServices,
                    getServiceSelected: (selected) => onChange(selected) 
                })
            ]
        );
    }else{
        return null;
    }

    
}

function renderEditElementsPrice({serviceSelected}){
    return React.createElement("div", {
        className: "row supTxt-TitleTxt-Separation  montserrat_font"
    },
        React.createElement(EditElementsPriceHandler, {
            serviceSelected: serviceSelected
        })
    );
}

class RenderEditPriceChart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            serviceSelected : "",
            ajaxLoaded: false
        };
    }

    render(){
        let el2Render = [];

        el2Render.push(
            React.createElement(renderServiceSelectorContainer, {
                key:"LaundryServiceSelectorContainer",
                onChange: (service) => this.setState({serviceSelected: service})
            })
        );
        if(this.state.serviceSelected !== ""){
            el2Render.push(
                React.createElement(renderEditElementsPrice, {
                    key: "EditElementsPriceContainer",
                    serviceSelected: this.state.serviceSelected
                })
            );
        }

        return el2Render;
    }
}

module.exports =  RenderEditPriceChart;