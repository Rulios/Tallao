"use strict";

const React = require("react");
const OrderBox = require("./OrderBoxContainers");
const dayjs = require("dayjs");
const Time = require("./Time");
const {DATE_TIME_FORMAT_UNTIL_MINUTES_WITH_MERIDIEM} = require("../../../meta/DATE_TIME_FORMATS");


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

    onClickOrder(orderID){
        this.props.onClick(orderID);
    }

    render(){
        return Object.values(this.props.orders).map(order =>{
            return React.createElement(OrderBox, {
                key: `${order.id}`,
                status: order.status,
                columnType: this.props.columnType,
                showLaundryName: this.props.showLaundryName,
                orderID: {
                    id: order.id,
                    id_char: order.id_char,
                    id_number: order.id_number
                },
                orderDetails: {
                    laundry_name: order.laundry_name,
                    customer_name: order.customer_name,
                    date_assign: dayjs(order.date_assign).format(DATE_TIME_FORMAT_UNTIL_MINUTES_WITH_MERIDIEM),
                    date_receive: dayjs(order.date_receive).format(DATE_TIME_FORMAT_UNTIL_MINUTES_WITH_MERIDIEM),
                    hook_quantity: order.hook_quantity,
                    total_price: order.total_price
                },
                dateTimeDifference: Time.calcTimeDifference(order.date_assign, this.props.todayDateTime),
                onClickOrder: () => this.onClickOrder(order.id)
            })
        });
    }
}



module.exports = OrderBoxes;