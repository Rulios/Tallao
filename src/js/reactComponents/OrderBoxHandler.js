"use strict";

const React = require("react");
const OrderBoxContainers = require("./OrderBoxContainers");
const Time = require("./Time");
const dayjs = require("dayjs");

/* This is the high order component, this is where AJAX requests performs
Controls all the outputs */

class OrderBoxes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orders: {},
            startIndex: 0,    
        }
    }

    returnDataOnClick(orderID){
        this.props.onClick(orderID);
    }

    render(){
        return Object.values(this.props.orders).map(order =>{
            return React.createElement(OrderBoxContainers.OrderBox, {
                key: `${order.id_char}${order.id_number}`,
                status: order.status,
                orderID: {
                    id_char: order.id_char,
                    id_number: order.id_number
                },
                orderDetails: {
                    customer_name: order.customer_name,
                    date_assign: dayjs(order.date_assign).format("YYYY-MM-DD hh:mm A"),
                    date_receive: dayjs(order.date_receive).format("YYYY-MM-DD hh:mm A"),
                    hook_quantity: order.hook_quantity,
                    total_price: order.total_price
                },
                dateTimeDifference: Time.calcTimeDifference(order.date_assign, this.props.todayDateTime),
                onClickOrder: (orderID) => this.returnDataOnClick(orderID)
            })
        });
    }
}



module.exports = OrderBoxes;