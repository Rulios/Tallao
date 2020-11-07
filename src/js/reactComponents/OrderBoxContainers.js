"use strict";

const React = require("react");
const OrderBoxComp = require("./reactComponents/OrderBoxComp");

/* This is a middle order component, responsible for translation
and bundling of low order components */

const textEs = {
    wait: "En espera",
    processing: "Procesando",
    ready: "Listo para retirar",
    retired: "Retirado",
    status: "Estado",
    customer: "Cliente",
    dateAssign: "Fecha Asignada",
    dateReceive: "Fecha Recibida",
    hookQuantity: "Cantidad de Ganchos",
    touchForDetails: "Toca para más detalles",
    totalPrice: "Precio Total",
    timeLeft: "Faltan",
    days: "días",
    hours: "horas",
    minutes: "minutos",
    delayed: "Atrasado",
    ago: "hace",
    by: "por"
};

//this contains 3 colors that define the text of status
//should be in hex
const statusColors = {
    wait: "#DB4438",
    processing: "#DBA502",
    ready: "#00A822",
    retired: "#999DA3"
};

const dateDiffColors = {
    early: "#00A822",
    near: "#DBA502",
    late: "#DB4438"
};

function OrderBox({orderID, status, orderDetails,dateTimeDifference, onClickOrder}){
    //console.log(dateTimeDifference);
    let elementID  = `${orderID.idChar}${orderID.idNumber}`;
    return React.createElement("div", {
        className: "col-lg-4",
        
    },
        React.createElement("button", {
            className: "orderListElementStyle",
            onClick: () => onClickOrder(`${orderID.idChar}${orderID.idNumber}`)
        },
            [
                React.createElement(OrderBoxComp.H3, {
                    key: `OrderID${elementID}`,
                    text : `${orderID.idChar} ${orderID.idNumber}`
                }),
                React.createElement(OrderBoxComp.CenterBoldDiv, {
                    key: `OrderStatusTag${elementID}`,
                    text: `${textEs.status}: ${textEs[status]}`,
                    color : statusColors[status]
                }),
                React.createElement(dateTimeDifferenceDiv,{
                    key: `OrderDateTimeDiff${elementID}`,
                    dateTimeDifference: dateTimeDifference,
                    orderStatus: status
                }),
                React.createElement(OrderBoxComp.HrGrey, {key: `TitleHR${elementID}`}),
                React.createElement("div", {
                    key: `OrderDetails${elementID}`,
                    className:"dataOrderStyle"
                },
                    [
                        React.createElement(OrderBoxComp.FieldValue,{
                            key: `OrderCustomerName${elementID}`,
                            id: `OrderCustomerName${elementID}`,
                            fieldTxt: `${textEs.customer}:`,
                            value: orderDetails.customerName
                        }),
                        React.createElement(OrderBoxComp.FieldValue,{
                            key: `OrderDateWritten${elementID}`,
                            id: `OrderDateWritten${elementID}`,
                            fieldTxt: `${textEs.dateReceive}:`,
                            value: orderDetails.dateReceive
                        }),
                        React.createElement(OrderBoxComp.FieldValue,{
                            key: `OrderDateAssigned${elementID}`,
                            id: `OrderDateAssigned${elementID}`,
                            fieldTxt: `${textEs.dateAssign}:`,
                            value: orderDetails.dateAssign
                        }),
                        React.createElement(OrderBoxComp.FieldValue,{
                            key: `OrderHookQuantity${elementID}`,
                            id: `OrderHookQuantity${elementID}`,
                            fieldTxt: `${textEs.hookQuantity}:`,
                            value: orderDetails.hookQuantity
                        })
                    ]                    
                ),
                [
                    React.createElement(OrderBoxComp.HrGrey, {key:`PriceHR${elementID}`}),
                    React.createElement(OrderBoxComp.CenterBoldDiv,{
                        key: `OrderPriceTag${elementID}`,
                        text: `${textEs.totalPrice}: ${orderDetails.totalPrice}`
                    }),
                    React.createElement(OrderBoxComp.CenterBoldDiv, {
                        key: `Touch4Details${elementID}`,
                        text: textEs.touchForDetails,
                        isDetailsText: true
                    })
                ]
            ]
        )
    )
}

function dateTimeDifferenceDiv({dateTimeDifference, orderStatus}){
    let color = "";
    let daysStr = `${dateTimeDifference.days} ${textEs.days}`;
    let hoursStr = `${dateTimeDifference.hours} ${textEs.hours}`;
    let minutesStr = `${dateTimeDifference.minutes} ${textEs.minutes}`;
    let displayStr = "";
    if(dateTimeDifference.timeStatus === "future"){
        displayStr = `${textEs.timeLeft} ${daysStr}, ${hoursStr}, ${minutesStr}`;
    }else{
        displayStr= `${textEs.delayed} ${textEs.by} ${daysStr}, ${hoursStr}, ${minutesStr}`;
    }

    switch(true){
        case (dateTimeDifference.hours > 1 && dateTimeDifference.timeStatus === "future"):
            color = dateDiffColors.early;
        break;

        case (dateTimeDifference.hours <= 1 && dateTimeDifference.minutes >= 0 && dateTimeDifference.timeStatus === "future"):
            color = dateDiffColors.near;
        break;

        default:
            color = dateDiffColors.late;
        break;  
    }

    
    if(orderStatus === "ready" || orderStatus === "retired"){
        return null;
    }else{
        return React.createElement("div", {
            className: "bold",
            style: {
                color: color
            }
        },displayStr);
    }
}

module.exports = {
    OrderBox:OrderBox
};
// example order box
/* <div class="col-lg-4">
    <button class="orderListElementStyle ">

        <h3 name="orderIdTag" class="bold"> B-13</h3>
        <div name="statusTag">Estado: En espera</div>
        <hr class="hrGreyBorder">

        <div class="dataOrderStyle">

            <label for="" class="bold">Cliente:</label>
            <div name="customerNameTag" ><span class="bold"> Cliente:</span> <span>Robert Lu Zheng</span></div>
            <div>
                <span class="bold">Día Asignado:</span> <span style="float:right">10/10/2020</span>
            </div>
            <div name="dateAssignTag">Día asignado:</div>  <div style="float:right">10/10/2020</div>
            <div name="dateReceiveTag">Día recibido: 10/10/2020</div>
            <div name="hookQuantityTag">Cantidad de Ganchos: 2</div>

            
        </div>  
            <hr class="hrGreyBorder">

            <div name="priceTag" class="text-center bold">Precio: $1.30</div>

            <div class="text-center detailsText">Toca para ver más detalles</div>
    </button>
</div>
 */
                        
                        
