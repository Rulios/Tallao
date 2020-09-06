"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development',
        EditElementsPriceHandler: "./reactComponents/EditElementsPriceHandler",
        LaundryServiceSelector: "./reactComponents/LaundryServiceSelector"
    }
});

define(["react", "react-dom", "EditElementsPriceHandler", "LaundryServiceSelector"],
function(React, ReactDOM, EditElementsPriceHandler, LaundryServiceSelector){

    //THIS IS A BUNDLE COMPONENT
    //BUNDLE COMPONENTS: WHEN TWO HANDLER COMPONENTS ARE REQUIRED TO EXCHANGE DATA

    function RenderEditElementsPrice({serviceSelected}){
        //console.log(serviceSelected);
        ReactDOM.render(
            React.createElement(EditElementsPriceHandler, {
                serviceSelected: serviceSelected
            }),
            document.getElementById("EditElementsPriceContainer")
        )
    }

    class RenderEditPriceChart extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                serviceSelected : "",
                ajaxLoaded: false
            };
        }

        componentDidUpdate(){
            if(this.state.serviceSelected !== ""){
                RenderEditElementsPrice({
                    serviceSelected: this.state.serviceSelected
                });
            }
        }


        render(){
            return React.createElement(LaundryServiceSelector, {
                getServiceSelected: (selected) => {
                    this.setState({serviceSelected: selected});
                }
            });
            //return null;
        }
    }

    return RenderEditPriceChart;

});