"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development',
        OrderModalContainers: "./reactComponents/OrderModalContainers",
        ajaxReqOrders: "./requestsModules/ajaxReqOrders",
    }
});
define(["react", "react-dom","OrderModalContainers", "ajaxReqOrders"], 
function(React, ReactDOM,OrderModalContainers, ajaxReq){

    /* This is the high order component, this is where AJAX requests performs
    Controls all the outputs */

    class OrderModal extends React.Component{
        constructor(props){
            super(props);
        }

        render(){
            return React.createElement(OrderModalContainers, {
                orderDetails: this.props.order
            })
        }

    }



    return OrderModal;
});

