"use strict";

const React = require("react");
const OrderModalComp = require("./reactComponents/OrderModalComp");
const CustomerIDHandler = require("./reactComponents/CustomerIDHandler");
const { ModuleFilenameHelpers } = require("webpack");

/* This is a middle order component, responsible for translation
and bundling of low order components */

const textEs= {
    order: "Orden",
    status: "Estado",
    elements: "Elementos",
    dateAssign: "Fecha asignada",
    dateReceive: "Fecha recibida",
    customerName: "Nombre del cliente",
    hookQuantity: "Cantidad de ganchos",
    totalPrice: "Precio total",
    iron: "Planchado",
    washIron: "Lavado y planchado",
    wash: "Lavado",
    dryClean: "Lavado en seco",
    notifsAndChat: "Notificaciones y Chat",
    indications: "Indicaciones",
    affiliateCustomer: "Afiliar cliente",
    strStatus: {
        all: "Todos los estados", 
        wait: "En espera",
        processing: "Procesando",
        ready: "Listo",
        retired: "Retirado"
    },
    elementsStr: {
        custom : "Elemento personalizable",
        shirt: "Camisa",
        pants: "Pantalón",
        skirt: "Falda",
        coat: "Saco",
        sweater: "Suéter",
        pleatedSkirt: "Falda Plizada",
        overall: "Overol",
        jumper: "Jumper",
        blouse: "Blusa",
        largeSuit: "Vestido",
        quilt: "Colcha"
    },
    nextStatus:{
        wait: "Procesar la orden",
        processing: "Terminar la orden",
        ready: "Orden terminada",
        retired: "Retirado"
    }
    
}

const statusColors = {
    wait: "#DB4438",
    processing: "#DBA502",
    ready: "#00A822",
    retired: "#999DA3"
};

function OrderModal({orderDetails, onClickClose, onClickNextStatus, newCustomerName}){
    //console.log(orderDetails);
    let idComp = `${orderDetails.idChar}${orderDetails.idNumber}`;
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
                        idChar: orderDetails.idChar,    
                        idNumber:  orderDetails.idNumber
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
                                        text: `${textEs.status}: ${textEs.strStatus[orderDetails.status]}`,
                                        color: statusColors[orderDetails.status],
                                    })
                                ),
                                React.createElement("div", {
                                    key: `OrderModalCustomerName4${idComp}`
                                },
                                    /* [
                                        React.createElement(OrderModalComp.FieldValue, {
                                        key: `ModalCustomerName4${idComp}`,
                                        id: `ModalCustomerName4${idComp}`,
                                        fieldTxt: `${textEs.customerName}:`,
                                        value: `${orderDetails.customerName}`
                                        }),
                                    ] */
                                    React.createElement(OrderModalCustomerName, {
                                        idComp: idComp, 
                                        customerName: orderDetails.customerName,
                                        newCustomerName: (customerData) => newCustomerName(customerData)
                                    })
                                    //OrderModalCustomerName({idComp: idComp, customerName: orderDetails.customerName})
                                ),

                                React.createElement("div", {
                                    key: `OrderModalReceiveDate4${idComp}`
                                },
                                    React.createElement(OrderModalComp.FieldValue,{
                                        id: `ModalReceiveDate4${idComp}`,
                                        fieldTxt: `${textEs.dateReceive}:`,
                                        value: `${orderDetails.dateReceive}`
                                    })
                                ),
                                React.createElement("div", {
                                    key: `OrderModalAssignDate4${idComp}`
                                },
                                    React.createElement(OrderModalComp.FieldValue,{
                                        id: `ModalAssignDate4${idComp}`,
                                        fieldTxt: `${textEs.dateAssign}:`,
                                        value: `${orderDetails.dateAssign}`
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
                                            fieldTxt: `${textEs.elements}:`,
                                            value: ""
                                        }),
                                        React.createElement(OrderElements,{
                                            key: `OrderModalElements4${idComp}`,
                                            elementsDetails: orderElementsByService(orderDetails.elementsDetails)
                                        })
                                    ]
                                    
                                ),
                                React.createElement(OrderModalComp.FieldRightValue,{
                                    key: `OrderModalHookQuantity4${idComp}`,
                                    id: `OrderModalHookQuantity4${idComp}`,
                                    fieldTxt: `${textEs.hookQuantity}:`,
                                    value: `${orderDetails.hookQuantity}`
                                }),
                                React.createElement(OrderModalComp.FieldRightValue,{
                                    key: `OrderModalTotalPrice4${idComp}`,
                                    id: `OrderModalTotalPrice4${idComp}`,
                                    fieldTxt: `${textEs.totalPrice}`,
                                    value: `${orderDetails.totalPrice}`
                                })
                            ]
                        ),

                        React.createElement("div", {
                            key: `RightSideModal4${idComp}`,
                            className: "col-lg-6"
                        },
                            React.createElement(NotificationsAndChat,{
                                orderID: {
                                    idChar: orderDetails.idChar,    
                                    idNumber:  orderDetails.idNumber
                                },
                                indications: orderDetails.indications
                            })
                        )
                    ]
                ),
                React.createElement(OrderModalComp.ModalStateButton,{
                    key: `ModalStateButton4${idComp}`,
                    text: `${textEs.nextStatus[orderDetails.status]}`,
                    onClick: () => onClickNextStatus()
                })
            ]
        )
    );
}

function OrderModalTitle({orderID}){
    let strOrderID = `${orderID.idChar}${orderID.idNumber}`;
    return  React.createElement("div", {className:"modal-headerCustom"},
        React.createElement("span", {key: `SpanShowModalTitle4${strOrderID}`}, 
        `${textEs.order} ${orderID.idChar} ${orderID.idNumber}`)
    );
        
}

function OrderModalCustomerName({idComp, customerName, newCustomerName}){
    let [isToggleEdit, changeToggleEdit] = React.useState(false);
    let toggleElement; //conditional UNIT rendering
    if(customerName !== ""){
        return  React.createElement(OrderModalComp.FieldValue, {
            key: `ModalCustomerName4${idComp}`,
            id: `ModalCustomerName4${idComp}`,
            fieldTxt: `${textEs.customerName}:`,
            value: `${customerName}`
        });
    }else{
        if(isToggleEdit){
            toggleElement = React.createElement(CustomerIDHandler, {
                key: `CustomerIDHandler4${idComp}`,
                mode: "search",
                getCustomerData :(data) => newCustomerName(data)
            });
        }
    }

    return React.createElement("div", null, 
    [
        React.createElement("span", {
            key:`ClientName4${idComp}`, 
            className:"bold small-rightMargin"
        }, `${textEs.customerName}:`),
        React.createElement("a", {
                key: `AToAddCustomerID4${idComp}`,
                style: {
                    color: "#2E6880",
                    cursor: "pointer"
                },
                onClick: () => changeToggleEdit(!isToggleEdit)
        }, `${textEs.affiliateCustomer}`),
        toggleElement
    ]);
}

function OrderElements({elementsDetails}){
    return Object.keys(elementsDetails).map(service =>{
        let components = [];
        
        components.push(
            React.createElement(OrderModalComp.FieldRightValue,{
                key: `SpnElementService${service}`,
                id: `SpnElementService${service}`,
                fieldTxt:`${textEs[service]}:`,
                value : "",
                tabSpaces: 1
            })
        );
        Object.keys(elementsDetails[service]).map(element =>{
            components.push( React.createElement(OrderModalComp.FieldRightValue,{
                key: `ElementsOfOrderOnModal${element}-${service}`,
                id:`ElementsOfOrderOnModal${element}-${service}`,
                fieldTxt: `${elementsDetails[service][element]["quantity"]} x ${textEs.elementsStr[element]} ($${elementsDetails[service][element]["price"]}) =`,
                value: `${elementsDetails[service][element]["price"] * elementsDetails[service][element]["quantity"]}`,
                tabSpaces: 2
            }));
        });
        return components;
    });
}

//right side of the modal
function NotificationsAndChat({orderID, indications}){
    let idComp = `${orderID.idChar}${orderID.idNumber}`;
    return React.createElement("form", null,
        React.createElement("fieldset",{
            className: "border p-2"
        },
            [
                React.createElement(OrderModalComp.Legend4Div,{
                    key: `Legend4NotifsAndChat4${idComp}`,
                    text: `${textEs["notifsAndChat"]}`
                }),
                React.createElement(OrderModalComp.FieldValue,{
                    key: `Indications4Order${idComp}`,
                    id: `Indications4Order${idComp}`,
                    fieldTxt: `${textEs.indications}:`,
                    value: `${indications}`
                })
            ]
        )
    )
}

module.exports = OrderModal;

//////////////////////////////////////////////////////////////////////

function orderElementsByService(elementsDetails){

    //The elementsDetails obj is having as primary props the elements name and then 
    //the service.

    //This function swaps the primary props to service.
    /* 
    (example)
        elementsDetails = {
            pants: {iron:{quantity: 1, price: 0.66}};
        };

        TO 

        elementsDetails = {
            iron: {pants:{quantity: 1, price: 0.66}};
    }; */

    let returnObj = {};
    Object.keys(elementsDetails).map(element =>{
        Object.keys(elementsDetails[element]).map(service =>{
            //console.log(typeof elementsDetails[element][service] === "object");
            if(typeof returnObj[service] !== "object"){
                returnObj[service] = {};
            }
            returnObj[service][element] = elementsDetails[element][service];
        })
    });
    return returnObj;
}

               
                        
