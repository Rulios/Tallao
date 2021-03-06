"use strict";

const React = require("react");
const OrderModalContainers = require("./OrderModalContainers");
const {advanceToNextStatus, updateCustomerAffiliateOrder} = require("../ajax-requests/orders");

/* This is the high order component, this is where AJAX requests performs
Controls all the outputs */

class OrderModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            newCustomer: {id: null, name: null}
        }
    }

    closeModal(){
        this.props.onClickClose();
    }

    advanceToNextStatus(){
        if(this.props.order.status !== "retired"){
            advanceToNextStatus({
                id_char: this.props.order.id_char,
                id_number: this.props.order.id_number
            }).catch(err => console.error(err));
        }
    }

    getNewAffiliateCustomer(customer){
        this.setState({newCustomer : customer});
    }

    updateAffiliateCustomerForOrder(){
        let {id, name} = this.state.newCustomer;

        if(id && name){
            updateCustomerAffiliateOrder({
                orderID: {
                    id_char: this.props.order.id_char,
                    id_number: this.props.order.id_number
                },
                customerID: id
            }).catch(error => console.error(error))
        }
    }


    render(){
        console.log(this.props.isShowing);
        if(this.props.isShowing && typeof this.props.order !== "undefined"){
            return React.createElement(OrderModalContainers, {
                orderDetails: this.props.order,
                showNextStatusBtn: this.props.showNextStatusBtn,
                onClickClose: () => this.closeModal(),
                onClickNextStatus: () => this.advanceToNextStatus(),
                onClickAffiliateNewCustomerName: () => this.updateAffiliateCustomerForOrder(),
                getNewAffiliateCustomer: (customer) => this.getNewAffiliateCustomer(customer)
            });
        }else{
            return null;
        }
    }
}
module.exports =  OrderModal;
