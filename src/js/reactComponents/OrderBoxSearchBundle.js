"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development',
        OrderBoxHandler: "./reactComponents/OrderBoxHandler",
        OrderParamsSelectorHandler: "./reactComponents/OrderParamsSelectorHandler"
    }
});

define(["react", "react-dom", "OrderBoxHandler", "OrderParamsSelectorHandler"],
function(React, ReactDOM, OrderBoxHandler, OrderParamsSelectorHandler){

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


    return SearchOrderByParams;
});