"use strict";

const React = require("react");
const ReactDOM = require("react-dom");
const OrderBoxHandler = require("./reactComponents/OrderBoxHandler");
const OrderParamsSelectorHandler = require("./reactComponents/OrderParamsSelectorHandler");

//THIS IS A BUNDLE COMPONENT
//BUNDLE COMPONENTS: WHEN TWO HANDLER COMPONENTS ARE REQUIRED TO EXCHANGE DATA

function RenderOrderBoxes(params){
    
    ReactDOM.render(
        React.createElement(OrderBoxHandler, params),
        document.getElementById("AppendOrdersContainer")
    );
}

class SearchOrderByParams extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            params: {}
        }
    }

    componentDidUpdate(){
        RenderOrderBoxes(this.state.params);
    }

    render(){
        return  React.createElement(OrderParamsSelectorHandler,{
            getSearchParams: (params) =>{
                this.setState({
                    params:params
                });
            },
        });
    }
}


module.exports =  SearchOrderByParams;