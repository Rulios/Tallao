"use strict";

const React = require("react");
const OrderModalComp = require("./OrderModalComp");
const CustomerIDHandler = require("./CustomerIDHandler");
const dayjs = require("dayjs");
const STATUS_COLORS = require("../../../meta/STATUS_COLORS");
const {getStaticText} = require("../translation/translator");

/* This is a middle order component, responsible for translation
and bundling of low order components */

function OrderModal({orderDetails, onClickClose, 
    onClickNextStatus, onClickAffiliateNewCustomerName,
     getNewAffiliateCustomer, showNextStatusBtn}){

    let idComp = `${orderDetails.id_char}${orderDetails.id_number}`;

    return React.createElement("div", {className:"modalCustom"},
        React.createElement("div", {className:"modal-contentCustom"},
            [   
                React.createElement(OrderModalComp.CloseButton,{
                    key: `OrderModalCloseButton4${idComp}`,
                    onClick:() => onClickClose()
                }),
                React.createElement(OrderModalTitle,{
                    key : `OrderModalTitle4${idComp}`,
                    orderID: {
                        id_char: orderDetails.id_char,    
                        id_number:  orderDetails.id_number
                    }
                }),
                React.createElement("hr", {
                    key: `SeparationFromTitle${idComp}`,
                    className: "hrBlackBorder"
                }),
                React.createElement("div", {
                    key: `RowForOrderDetails4${idComp}`,
                    className: "row"
                },
                    [
                        React.createElement("div", {
                            key: `LeftSideModal4${idComp}`,
                            className: "col-lg-6 rightBorderModal"
                        },
                            [
                                React.createElement("div", {
                                    key: `OrderModalStatus4${idComp}`,
                                },
                                    React.createElement(OrderModalComp.CenterBoldDiv,{
                                        text: `${getStaticText("status")}: ${getStaticText(orderDetails.status)}`,
                                        color: STATUS_COLORS[orderDetails.status],
                                    })
                                ),
                                React.createElement("div", {
                                    key: `OrderModalCustomerName4${idComp}`
                                },
                                    React.createElement(OrderModalCustomerName, {
                                        idComp: idComp, 
                                        customer_name: orderDetails.customer_name,
                                        getNewAffiliateCustomer: (customer) => getNewAffiliateCustomer(customer),
                                        onClickAffiliateNewCustomerName: () => onClickAffiliateNewCustomerName()
                                    })
                                ),

                                React.createElement("div", {
                                    key: `OrderModalReceiveDate4${idComp}`
                                },
                                    React.createElement(OrderModalComp.FieldValue,{
                                        id: `ModalReceiveDate4${idComp}`,
                                        fieldTxt: `${getStaticText("dateReceive")}:`,
                                        value: `${dayjs(orderDetails.date_receive).format("YYYY-MM-DD hh:mm A")}`
                                    })
                                ),
                                React.createElement("div", {
                                    key: `OrderModalAssignDate4${idComp}`
                                },
                                    React.createElement(OrderModalComp.FieldValue,{
                                        id: `ModalAssignDate4${idComp}`,
                                        fieldTxt: `${getStaticText("dateAssign")}:`,
                                        value: `${dayjs(orderDetails.date_assign).format("YYYY-MM-DD hh:mm A")}`
                                    })
                                ),
                                React.createElement(OrderModalComp.CenterBoldDiv,{
                                    key: `OrderModalDateDifference4${idComp}`,
                                    text: "",
                                    color : "",
                                }),
                                React.createElement("div", {
                                    key: `OrderModalElements4${idComp}`,
                                    className:  "smallSeparation"
                                },
                                    [
                                        React.createElement(OrderModalComp.FieldRightValue,{
                                            key: `OrderModalElementsTitle4${idComp}`,
                                            id: `OrderModalElementsTitle4${idComp}`,
                                            fieldTxt: `${getStaticText("elements")}:`,
                                            value: ""
                                        }),
                                        React.createElement(OrderElements,{
                                            key: `OrderModalElements4${idComp}`,
                                            elements_details: orderElementsByService(orderDetails.elements_details)
                                        })
                                    ]
                                    
                                ),
                                React.createElement(OrderModalComp.FieldRightValue,{
                                    key: `OrderModalHookQuantity4${idComp}`,
                                    id: `OrderModalHookQuantity4${idComp}`,
                                    fieldTxt: `${getStaticText("hookQuantity")}:`,
                                    value: `${orderDetails.hook_quantity}`
                                }),
                                React.createElement(OrderModalComp.FieldRightValue,{
                                    key: `OrderModalTotalPrice4${idComp}`,
                                    id: `OrderModalTotalPrice4${idComp}`,
                                    fieldTxt: `${getStaticText("totalPrice")}`,
                                    value: `${orderDetails.total_price}`
                                })
                            ]
                        ),

                        React.createElement("div", {
                            key: `RightSideModal4${idComp}`,
                            className: "col-lg-6"
                        },
                            React.createElement(NotificationsAndChat,{
                                orderID: {
                                    id_char: orderDetails.id_char,    
                                    id_number:  orderDetails.id_number
                                },
                                indications: orderDetails.indications
                            })
                        )
                    ]
                ),
                showNextStatusBtn ? React.createElement(OrderModalComp.ModalStateButton,{
                    key: `ModalStateButton4${idComp}`,
                    text: `${getStaticText(`${orderDetails.status}_nextStatus`)}`,
                    onClick: () => onClickNextStatus()
                }) : null
            ]
        )
    );
}

function OrderModalTitle({orderID}){
    let strOrderID = `${orderID.id_char} ${orderID.id_number}`;
    return  React.createElement("div", {className:"modal-headerCustom"},
        React.createElement("span", {key: `SpanShowModalTitle4${strOrderID}`}, 
        `${getStaticText("order")} ${strOrderID}`)
    );
        
}

function OrderModalCustomerName({idComp, customer_name, getNewAffiliateCustomer, onClickAffiliateNewCustomerName}){
    let [isToggleEdit, changeToggleEdit] = React.useState(false);
    let toggleElement; //conditional UNIT rendering
    if(customer_name){
        return  React.createElement(OrderModalComp.FieldValue, {
            key: `ModalCustomerName4${idComp}`,
            id: `ModalCustomerName4${idComp}`,
            fieldTxt: `${getStaticText("customer_name")}:`,
            value: `${customer_name}`
        });
    }else{
        if(isToggleEdit){

            toggleElement = [
                React.createElement(CustomerIDHandler, {
                    key: `CustomerIDHandler4${idComp}`,
                    mode: "search",
                    getCustomerData :(customer) => getNewAffiliateCustomer(customer)
                }),
                React.createElement("button", {
                    key: `BtnAffiliateCustomer4${idComp}`,
                    className: "raisedButton1",
                    onClick :() => onClickAffiliateNewCustomerName()
                }, `${getStaticText("affiliateCustomer")}`)
            ];

        }
    }

    return React.createElement("div", null, 
    [
        React.createElement("span", {
            key:`ClientName4${idComp}`, 
            className:"bold small-rightMargin"
        }, `${getStaticText("customer_name")}:`),
        React.createElement("a", {
                key: `AToAddCustomerID4${idComp}`,
                style: {
                    color: "#2E6880",
                    cursor: "pointer"
                },
                onClick: () => changeToggleEdit(!isToggleEdit)
        }, `${getStaticText("affiliateCustomer")}`),
        toggleElement
    ]);
}

function OrderElements({elements_details}){
    return Object.keys(elements_details).map(service =>{
        let components = [];
        
        components.push(
            React.createElement(OrderModalComp.FieldRightValue,{
                key: `SpnElementService${service}`,
                id: `SpnElementService${service}`,
                fieldTxt:`${getStaticText(service)}:`,
                value : "",
                tabSpaces: 1
            })
        );
        Object.keys(elements_details[service]).map(element =>{
            let elementName = "";

            /* Minor display adjustments */
            if(element.includes("custom")){ //the element is custom
                if(typeof elements_details[service][element]["name"] === "undefined"){
                    elementName = getStaticText("custom");
                }else{
                    elementName = elements_details[service][element]["name"];
                }
            }else{
                elementName = getStaticText(element);
            }
            components.push( React.createElement(OrderModalComp.FieldRightValue,{
                key: `ElementsOfOrderOnModal${element}-${service}`,
                id:`ElementsOfOrderOnModal${element}-${service}`,
                fieldTxt: `${elements_details[service][element]["quantity"]} x ${elementName} ($${elements_details[service][element]["price"]}) =`,
                value: `${elements_details[service][element]["price"] * elements_details[service][element]["quantity"]}`,
                tabSpaces: 2
            }));
        });
        return components;
    });
}

//right side of the modal
function NotificationsAndChat({orderID, indications}){
    let idComp = `${orderID.id_char}${orderID.id_number}`;
    return React.createElement("form", null,
        React.createElement("fieldset",{
            className: "border p-2"
        },
            [
                React.createElement(OrderModalComp.Legend4Div,{
                    key: `Legend4NotifsAndChat4${idComp}`,
                    text: `${getStaticText("notifsAndChat")}`
                }),
                React.createElement(OrderModalComp.FieldValue,{
                    key: `Indications4Order${idComp}`,
                    id: `Indications4Order${idComp}`,
                    fieldTxt: `${getStaticText("indications")}:`,
                    value: `${indications}`
                })
            ]
        )
    )
}

module.exports = OrderModal;

//////////////////////////////////////////////////////////////////////

function orderElementsByService(elements_details){

    //The elements_details obj is having as primary props the elements name and then 
    //the service.

    //This function swaps the primary props to service.
    /* 
    (example)
        elements_details = {
            pants: {iron:{quantity: 1, price: 0.66}};
        };

        TO 

        elements_details = {
            iron: {pants:{quantity: 1, price: 0.66}};
    }; */

    let returnObj = {};
    Object.keys(elements_details).map(element =>{
        Object.keys(elements_details[element]).map(service =>{
            //console.log(typeof elements_details[element][service] === "object");
            if(typeof returnObj[service] !== "object"){
                returnObj[service] = {};
            }
            returnObj[service][element] = elements_details[element][service];
        })
    });
    return returnObj;
}

               
                        
