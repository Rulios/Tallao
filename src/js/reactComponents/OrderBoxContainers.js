"use strict";

const React = require("react");
const OrderBoxComp = require("./OrderBoxComp");
const {getStaticText} = require("../translation/translator");
const STATUS_COLORS = require("../../../meta/STATUS_COLORS");
const DATE_DIFFERENCE_COLORS = require("../../../meta/DATE_DIFFERENCE_COLORS");

/* This is a middle order component, responsible for translation
and bundling of low order components */

function OrderBox({showLaundryName, orderID,columnType, status, orderDetails , 
    dateTimeDifference, onClickOrder}){
    let elementID  = `${orderID.id_char}${orderID.id_number}`;
    return React.createElement("div", {
        className: columnType,
        
    },
        React.createElement("button", {
            className: "orderListElementStyle",
            onClick: () => onClickOrder()
        },
            [
                React.createElement(Title, {
                    key: `Title4${orderID.id}`,
                    showLaundryName: showLaundryName,
                    laundryName: orderDetails.laundry_name,
                    idChar: orderID.id_char,
                    idNumber: orderID.id_number
                }),
                React.createElement(OrderBoxComp.CenterBoldDiv, {
                    key: `OrderStatusTag${elementID}`,
                    text: `${getStaticText("status")}: ${getStaticText(status)}`,
                    color : STATUS_COLORS[status]
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
                            key: `Ordercustomer_name${elementID}`,
                            id: `Ordercustomer_name${elementID}`,
                            fieldTxt: `${getStaticText("customer")}:`,
                            value: orderDetails.customer_name
                        }),
                        React.createElement(OrderBoxComp.FieldValue,{
                            key: `OrderDateWritten${elementID}`,
                            id: `OrderDateWritten${elementID}`,
                            fieldTxt: `${getStaticText("date_receive")}:`,
                            value: orderDetails.date_receive
                        }),
                        React.createElement(OrderBoxComp.FieldValue,{
                            key: `Orderdate_assigned${elementID}`,
                            id: `Orderdate_assigned${elementID}`,
                            fieldTxt: `${getStaticText("date_assign")}:`,
                            value: orderDetails.date_assign
                        }),
                        React.createElement(OrderBoxComp.FieldValue,{
                            key: `Orderhook_quantity${elementID}`,
                            id: `Orderhook_quantity${elementID}`,
                            fieldTxt: `${getStaticText("hook_quantity")}:`,
                            value: orderDetails.hook_quantity
                        })
                    ]                    
                ),
                [
                    React.createElement(OrderBoxComp.HrGrey, {key:`PriceHR${elementID}`}),
                    React.createElement(OrderBoxComp.CenterBoldDiv,{
                        key: `OrderPriceTag${elementID}`,
                        text: `${getStaticText("total_price")}: ${orderDetails.total_price}`
                    }),
                    React.createElement(OrderBoxComp.CenterBoldDiv, {
                        key: `Touch4Details${elementID}`,
                        text: getStaticText("touchForDetails"),
                        isDetailsText: true
                    })
                ]
            ]
        )
    )
}

function Title({showLaundryName, laundryName = "", idChar, idNumber}){
    let components = [];
    if(showLaundryName){
        components.push(
            <h3 key={`LaundryName4${idChar}${idNumber}`} className="bold">{laundryName}</h3>
        );
    }
    components.push(
        <h3 key={`IDTag4${idChar}${idNumber}`}className="bold">{`${idChar} ${idNumber}`}</h3>
    )
    return components;
}

function dateTimeDifferenceDiv({dateTimeDifference, orderStatus}){
    let color = "";
    let daysStr = `${dateTimeDifference.days} ${getStaticText("days")}`;
    let hoursStr = `${dateTimeDifference.hours} ${getStaticText("hours")}`;
    let minutesStr = `${dateTimeDifference.minutes} ${getStaticText("minutes")}`;
    let displayStr = "";
    if(dateTimeDifference.timeStatus === "future"){
        displayStr = `${getStaticText("timeLeft")} ${daysStr}, ${hoursStr}, ${minutesStr}`;
    }else{
        displayStr= `${getStaticText("delayed")} ${getStaticText("by")} ${daysStr}, ${hoursStr}, ${minutesStr}`;
    }

    switch(true){
        case (dateTimeDifference.hours > 1 && dateTimeDifference.timeStatus === "future"):
            color = DATE_DIFFERENCE_COLORS.early;
        break;

        case (dateTimeDifference.hours <= 1 && dateTimeDifference.minutes >= 0 && dateTimeDifference.timeStatus === "future"):
            color = DATE_DIFFERENCE_COLORS.near;
        break;

        default:
            color = DATE_DIFFERENCE_COLORS.late;
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

module.exports = OrderBox;
// example order box
/* <div class="col-lg-4">
    <button class="orderListElementStyle ">

        <h3 name="orderIdTag" class="bold"> B-13</h3>
        <div name="statusTag">Estado: En espera</div>
        <hr class="hrGreyBorder">

        <div class="dataOrderStyle">

            <label for="" class="bold">Cliente:</label>
            <div name="customer_nameTag" ><span class="bold"> Cliente:</span> <span>Robert Lu Zheng</span></div>
            <div>
                <span class="bold">Día Asignado:</span> <span style="float:right">10/10/2020</span>
            </div>
            <div name="date_assignTag">Día asignado:</div>  <div style="float:right">10/10/2020</div>
            <div name="date_receiveTag">Día recibido: 10/10/2020</div>
            <div name="hook_quantityTag">Cantidad de Ganchos: 2</div>

            
        </div>  
            <hr class="hrGreyBorder">

            <div name="priceTag" class="text-center bold">Precio: $1.30</div>

            <div class="text-center detailsText">Toca para ver más detalles</div>
    </button>
</div>
 */
                        
                        
