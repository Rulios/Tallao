"use strict";

const React = require("react");
const OrderModalContainers = require("./OrderModalContainers");
const ajaxReqOrders = require("../requestsModules/ajaxReqOrders");

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
        if(this.props.order.status !== "retired"){
            ajaxReqOrders.advanceToNextStatus({
                id_char: this.props.order.id_char,
                id_number: this.props.order.id_number
            }).then(({status}) =>{
                if(status === 200)this.props.onUpdateOrders();
            }).catch(err => console.error(err));
        }
    }

    newCustomerNameHandler(customerData){
        if(customerData.id && customerData.name){
            ajaxReqOrders.updateCustomerAffiliateOrder({
                orderID: {
                    id_char: this.props.order.id_char,
                    id_number: this.props.order.id_number
                },
                customerID: customerData.id
            }).then(({status})=>{
                if(status === 200) this.props.onUpdateOrders();
                
            }).catch(error => console.error(error))
        }
    }


    render(){
        if(this.props.isShowing && typeof this.props.order !== "undefined"){
            return React.createElement(OrderModalContainers, {
                orderDetails: this.props.order,
                showNextStatusBtn: this.props.showNextStatusBtn,
                onClickClose: () => this.closeModal(),
                onClickNextStatus: () => this.advanceToNextStatus(),
                newCustomerName: (customerData) => this.newCustomerNameHandler(customerData)
            });
        }else{
            return null;
        }
    }
}
module.exports =  OrderModal;
