"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        EditElementsPriceHandler: "./reactComponents/EditElementsPriceHandler",
        LaundryServiceSelector: "./reactComponents/LaundryServiceSelector"
    }
});

define(["react", "EditElementsPriceHandler", "LaundryServiceSelector"],
function(React, EditElementsPriceHandler, LaundryServiceSelector){

    //THIS IS A BUNDLE COMPONENT
    //BUNDLE COMPONENTS: WHEN TWO HANDLER COMPONENTS ARE REQUIRED TO EXCHANGE DATA


    function renderServiceSelectorContainer({onChange}){
        return React.createElement("div", {
            className: "text-center supTxt-TitleTxt-Separation"
        },
            [
                React.createElement("div", {
                    key: "LaundryServiceSelectorTag",
                    className: "karla_font"
                },"Selecciona el servicio"),
                React.createElement(LaundryServiceSelector, {
                    key: "LaundryServiceSelector",
                    getServiceSelected: (selected) => onChange(selected) 
                })
            ]
        );
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

    return RenderEditPriceChart;

});