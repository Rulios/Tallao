"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        OrderModalContainers: "./reactComponents/OrderModalContainers",
    }
});
define(["react", "OrderModalContainers"], 
function(React, OrderModalContainers){

    /* This is the high order component, this is where AJAX requests performs
    Controls all the outputs */

    class OrderModal extends React.Component{
        constructor(props){
            super(props);
        }

        closeModal(){
            this.props.onClickClose();
        }

        render(){
            if(this.props.isShowing && typeof this.props.order !== "undefined"){
                return React.createElement(OrderModalContainers, {
                    orderDetails: this.props.order,
                    onClickClose: () => this.closeModal()
                });
            }else{
                return null;
            }
        }
    }
    return OrderModal;
});

