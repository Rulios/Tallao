"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development',
        OrderBoxContainers: "./reactComponents/OrderBoxContainers",
        Time: "./reactComponents/Time"
    }
});
define(["react", "react-dom","OrderBoxContainers", "Time"], 
function(React, ReactDOM,OrderBoxContainers, Time){

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
            let {date, hour12, hour24, minutes, cycle} = this.props.todayDateTime
            return Object.values(this.props.orders).map(order =>{
                return React.createElement(OrderBoxContainers.OrderBox, {
                    key: `${order.idChar}${order.idNumber}`,
                    status: order.status,
                    orderID: {
                        idChar: order.idChar,
                        idNumber: order.idNumber
                    },
                    orderDetails: {
                        customerName: order.customerName,
                        dateAssign: order.dateAssign,
                        dateReceive: order.dateReceive,
                        hookQuantity: order.hookQuantity,
                        totalPrice: order.totalPrice
                    },
                    dateTimeDifference: Time.calcTimeDifference(new Date(order.dateAssign), new Date(`${date} ${hour24}:${minutes}`)),
                    onClickOrder: (orderID) => this.returnDataOnClick(orderID)
                })
            });
        }
    }
    


    return OrderBoxes;
});

