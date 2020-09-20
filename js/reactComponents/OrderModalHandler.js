"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        OrderModalContainers: "./reactComponents/OrderModalContainers",
        ajaxReqOrders: "./requestsModules/ajaxReqOrders"
    }
});
define(["react", "OrderModalContainers", "ajaxReqOrders"], 
function(React, OrderModalContainers,ajaxReqOrders){

    /* This is the high order component, this is where AJAX requests performs
    Controls all the outputs */

    class OrderModal extends React.Component{
        constructor(props){
            super(props);
        }

        closeModal(){
            this.props.onClickClose();
        }

        advanceToNextStatus(){
            ajaxReqOrders.advanceToNextStatus(JSON.stringify({
                idChar: this.props.order.idChar,
                idNumber: this.props.order.idNumber
            })).then(response =>{
                console.log(response);
            }).catch(err => console.error());
        }

        render(){
            if(this.props.isShowing && typeof this.props.order !== "undefined"){
                return React.createElement(OrderModalContainers, {
                    orderDetails: this.props.order,
                    onClickClose: () => this.closeModal(),
                    onClickNextStatus: () => this.advanceToNextStatus()
                });
            }else{
                return null;
            }
        }
    }
    return OrderModal;
});
