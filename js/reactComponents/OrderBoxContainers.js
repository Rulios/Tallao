"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        OrderBoxComp: "./reactComponents/OrderBoxComp"
    }
});
define(["react","OrderBoxComp"], function(React, OrderBoxComp){

    /* This is a middle order component, responsible for translation
    and bundling of low order components */

    function OrderBox({orderID}){
        return React.createElement("div", {
            className: "col-lg-4"
        },
            React.createElement("button", {
                className: "orderListElementStyle"
            }
                [
                    React.createElement(OrderBoxComp.H3, {
                        key: `OrderID${orderID}`,
                        text :""
                    }),
                    React.createElement(OrderBoxComp.CenterBoldDiv, {
                        key: `OrderStatusTag${orderID}`,
                        text: "",
                        color :""
                    }),
                    React.createElement(OrderBoxComp.HrGrey, {key: `TitleHR${orderID}`}),
                    React.createElement("div", {
                        key: `OrderDetails${orderID}`,
                        className:"dataOrderStyle"
                    },
                        [
                            React.createElement(OrderBoxComp.FieldValue,{
                                key: `OrderClientName${id}`,
                                id: orderID,
                                fieldTxt: "",
                                value: ""
                            }),
                            React.createElement(OrderBoxComp.FieldValue,{
                                key: `OrderDateAssigned${id}`,
                                id: orderID,
                                fieldTxt: "",
                                value: ""
                            }),
                            React.createElement(OrderBoxComp.FieldValue,{
                                key: `OrderDateWritten${id}`,
                                id: orderID,
                                fieldTxt: "",
                                value: ""
                            }),
                            React.createElement(OrderBoxComp.FieldValue,{
                                key: `OrderHookQuantity${id}`,
                                id: orderID,
                                fieldTxt: "",
                                value: ""
                            })
                        ]                    
                    ),
                    [
                        React.createElement(OrderBoxComp.HrGrey, {key:`PriceHR${orderID}`}),
                        React.createElement(OrderBoxComp.CenterBoldDiv,{
                            key: `OrderPriceTag${orderID}`,
                            text: ""
                        }),
                        React.createElement(OrderBoxComp.CenterBoldDiv, {
                            key: `Touch4Details${orderID}`,
                            text: "",
                            isDetailsText: true
                        })
                    ]
                ]
            )
        )
    }
    
    return{
        OrderBox:OrderBox
    };

});
