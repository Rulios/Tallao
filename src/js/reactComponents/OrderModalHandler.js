"use strict";

const React = require("react");
const OrderModalContainers = require("./reactComponents/OrderModalContainers");
const ajaxReqOrders = require("./requestsModules/ajaxReqOrders");

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
            ajaxReqOrders.advanceToNextStatus(JSON.stringify({
                idChar: this.props.order.idChar,
                idNumber: this.props.order.idNumber
            })).then(response =>{
                this.props.onUpdateOrders();
            }).catch(err => console.error());
        }
    }

    newCustomerNameHandler(customerData){
        if(customerData.id && customerData.name){
            ajaxReqOrders.updateCustomerAffiliateOrder(JSON.stringify({
                orderID: {
                    idChar: this.props.order.idChar,
                    idNumber: this.props.order.idNumber
                },
                customerID: customerData.id
            })).then(response=>{
                this.props.onUpdateOrders();
            }).catch(error => console.error(error))
        }
    }


    render(){
        if(this.props.isShowing && typeof this.props.order !== "undefined"){
            let {dateAssign, dateReceive} = this.props.order;
            //console.log(Time.calcTimeDifference(new Date(dateAssign), new Date()));
            return React.createElement(OrderModalContainers, {
                orderDetails: this.props.order,
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
