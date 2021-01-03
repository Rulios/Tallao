'use strict';

require( "core-js/stable");
require("regenerator-runtime/runtime");


const React = require("react");
const ReactDOM = require("react-dom");

const $ = require("jquery");
const formVerification = require("./frontendModules/formVerification");
const ajaxReqUserCreds = require("./requestsModules/ajaxReqUserCreds");
const ajaxReqOrders = require("./requestsModules/ajaxReqOrders");
const LaundryServiceSelector = require("./reactComponents/LaundryServiceSelector");
const CustomerIDHandler = require("./reactComponents/CustomerIDHandler");
const WriteOrder = require("./reactComponents/WriteOrder");
const UseCustomMessages = require("./reactComponents/UseCustomMessagesHandler");
const Time = require("./reactComponents/Time");
const Navbar = require("./reactComponents/NavbarHandler");
const dayjs = require("dayjs");
const ajaxReqLaundryConfigs = require("./requestsModules/ajaxReqLaundryConfigs");
const {getUserType} = require("./requestsModules/ajaxReqUserCreds");


const STRINGS = {
    orderID: "ID de la Orden"
};


window.onload = function(){
    try{
        getUserType().then(({data : userType}) =>{
            RenderNavbar(userType);
        });

        ReactDOM.render(
            React.createElement(MainApp, {}),
            document.getElementById("containerServiceSelector")
        );
    }catch{
        alert("Error al cargar datos");
    }
};

function RenderNavbar(userType){
    ReactDOM.render(
        React.createElement(Navbar, {
            userType: userType
        }), document.getElementById("NavbarContainer")
    );
}

function MainApp(){
    let [todayDateTime, setTodayDateTime] = React.useState(null);
    let [inputDateTimeForOrder, setInputDateTimeForOrder] = React.useState({date: null, time: null});
    let [inputCustomer, setCustomer] = React.useState({id: null, name: null});
    let [serviceSelected, setServiceSelected] = React.useState("iron");
    let [isServiceSelectorLoaded, setServiceSelectorLoaded] = React.useState(false);
    let [WriteOrderDetails, setWriteOrderDetails] = React.useState({
        configs: {
            elementsPrice: null,
            elementsOnSelectList: {[serviceSelected]: Array.from(WriteOrder.elements)},
            hookPrice: null,
            customOrdersIndexes: [], // stores the indexes of created custom elements
            isFullHookChecked: true
        },
        order:{
            activeElementsOnOrder: {},
            hookQuantity: 0,
            sumElementsQuantities: 0,
            totalPrice: 0
        }
    });

    //Every component that has setComponentReset as a parameter
    //is a reseteable component. It means that it has its own state
    //and data flow is bidirectional.
    let [shouldComponentReset, setComponentReset] = React.useState({
        CustomerIDHandler : false,
    });
    const onSubmitOrder = () => {
        SubmitOrder(WriteOrderDetails, inputCustomer, inputDateTimeForOrder, resetOrder);
    };

    const resetOrder = () => {
        setWriteOrderDetails(resetWriteOrderDetails(WriteOrderDetails));
        setInputDateTimeForOrder(resetInputDateTimeForOrder(inputDateTimeForOrder));

        //reset input customer
        resetInputCustomer(shouldComponentReset, setComponentReset);

        //clear indications
        document.getElementById("inputIndications").value = "";
        //animation
        animateSuccess();
    };

    React.useEffect(() =>{
        try{
            renderDateTime(setTodayDateTime);
            renderLaundryName();
            renderCurrentOrderID();
            renderUseCustomMessages();
            renderCustomerIDHandler(setCustomer, shouldComponentReset, setComponentReset);
            renderSubmitButton(onSubmitOrder);
            if(todayDateTime) renderDateTimeInputOrder(todayDateTime, inputDateTimeForOrder, setInputDateTimeForOrder);
            if(isServiceSelectorLoaded &&  WriteOrderDetails.configs.elementsPrice !== null){
                renderSelectableElementsOnOrder({
                    elementsOnSelectList: WriteOrderDetails.configs.elementsOnSelectList, 
                    serviceOffer: serviceSelected, 
                    elementsPrice: WriteOrderDetails.configs.elementsPrice
                }, (elementID, service) => {
                    setWriteOrderDetails(WriteOrder.onElementSelectFromList({id: elementID, service:service}, WriteOrderDetails));
                });
                renderElementsOnOrder(WriteOrderDetails, setWriteOrderDetails);
                renderHookQInputs(WriteOrderDetails, setWriteOrderDetails);
       
                //render totalPrice tag
                document.getElementById("totalPriceSpanValue").textContent = WriteOrderDetails.order.totalPrice;
            }
        }catch(err){
            console.error(err);
        }
    });


    //AJAX loads (first time)
    if(!isServiceSelectorLoaded){
        setServiceSelectorLoaded(true);
            //load the elements price and change the state
            WriteOrder.fetchElementsPrice()
                .then(priceChart =>{
                    let newWriteOrderDetails = JSON.parse(JSON.stringify(WriteOrderDetails));
                    //assign hookPrice from elementsPrice
                    newWriteOrderDetails.configs.hookPrice = priceChart.hook;
                    //delete prop of hookPrice from elementsPrice
                    delete priceChart.hook;
                    //assign clean obj with only services from elementsPrice
                    newWriteOrderDetails.configs.elementsPrice = priceChart;
                    setWriteOrderDetails(newWriteOrderDetails);
                });
    }


    //the priority for loading is as follows:
    // LaundryServiceSelector, SelectableElementsOnOrder, ElementsOnOrder
    return (isServiceSelectorLoaded) ? React.createElement(renderServiceSelector,{
        setServiceSelected: (selected) => {
            if(!WriteOrderDetails.configs.elementsOnSelectList.hasOwnProperty(selected)){
                let newWriteOrderDetails = JSON.parse(JSON.stringify(WriteOrderDetails));
                newWriteOrderDetails.configs.elementsOnSelectList[selected] = Array.from(WriteOrder.elements)
                setWriteOrderDetails(newWriteOrderDetails);
            }  
            
            setServiceSelected(selected)
        }
    }) : null;
    
}

function SubmitOrder(WriteOrderDetails, inputCustomer, 
    inputDateTime, resetOrder){
    const {id: customerID, name: customerName} = inputCustomer;
    const orderIndications = document.getElementById("inputIndications").value;
    const {activeElementsOnOrder, hookQuantity, totalPrice} = WriteOrderDetails.order;
    const {date: dateForOrder, time: timeForOrder} = inputDateTime;
    const dateTimeAssigned = `${dateForOrder} ${timeForOrder}:00`;

    const order = {
        indications: orderIndications,
        elementsOnOrder: activeElementsOnOrder,
        hookQuantity: hookQuantity,
        totalPrice: totalPrice,
        dateTimeAssigned: dateTimeAssigned,
        customerID: customerID,
        customerName: customerName
    }

    ajaxReqOrders.submitOrder(order)
    .then(({status, data: {idChar, idNumber}}) =>{
        //trigger the resetOrder
        if(status === 200){
            alert(`${STRINGS.orderID}: ${idChar} ${idNumber}`);
            resetOrder();
        }else{
            throw new Error("Can't submit order");
        }
    }).catch(err =>{
        console.error(err);
    });
}

function resetWriteOrderDetails(WriteOrderDetails){
    let NewWriteOrderDetails = JSON.parse(JSON.stringify(WriteOrderDetails));

    //set isFullHookChecked to true
    NewWriteOrderDetails.configs.isFullHookChecked = true;
    //reset customOrdersIndexes
    NewWriteOrderDetails.configs.customOrdersIndexes = [];
    //set sumElementsQuantities to zero
    NewWriteOrderDetails.order.sumElementsQuantities = 0;
    //set hook quantity to zero
    NewWriteOrderDetails.order.hookQuantity = 0;
    //set totalPrice to zero
    NewWriteOrderDetails.order.totalPrice = 0;
    //append the elements ACTIVE on ORDER to elements in SELECT LIST in its initial order
    Object.keys(NewWriteOrderDetails.order.activeElementsOnOrder).map(element => {
        Object.keys(NewWriteOrderDetails.order.activeElementsOnOrder[element]).map(service =>{
            WriteOrder.addElementIntoElementSelectList({id: element, service: service}, NewWriteOrderDetails.configs.elementsOnSelectList);
            //delete the element from active elements on order
            delete NewWriteOrderDetails.order.activeElementsOnOrder[element];
        });
    });
    return NewWriteOrderDetails;
}

function resetInputCustomer(shouldComponentReset, setComponentReset){
    //set the reset state of CustomerIDHandler to true
    let NewComponentReset = JSON.parse(JSON.stringify(shouldComponentReset));
    NewComponentReset.CustomerIDHandler = true;
    setComponentReset(NewComponentReset);
}

function resetInputDateTimeForOrder(inputDateTimeForOrder){
    let NewInputDateTimeForOrder = JSON.parse(JSON.stringify(inputDateTimeForOrder));
    NewInputDateTimeForOrder = {date: null, time: null};
    return NewInputDateTimeForOrder;
}


function renderServiceSelector({setServiceSelected}){
    return React.createElement(LaundryServiceSelector, {
        getServiceSelected : (selected) => setServiceSelected(selected)
    });
}

function renderSelectableElementsOnOrder({elementsOnSelectList, serviceOffer, elementsPrice}, onClick){
    ReactDOM.render(
        React.createElement(WriteOrder.renderSelectableElementsOnOrder, {
            elementsOnSelectList: elementsOnSelectList,
            serviceOffer: serviceOffer,
            elementsPrice: elementsPrice,
            onClick: (elementID, service) => onClick(elementID, service)
        }), document.getElementById("containerSelectableElements")
    );
}

function renderElementsOnOrder(WriteOrderDetails, setWriteOrderDetails){
    ReactDOM.render(
        React.createElement(WriteOrder.renderElementsOnOrder, {
            activeElementsOnOrder: WriteOrderDetails.order.activeElementsOnOrder,
            onClickDelete: (elementID, service) => {
                setWriteOrderDetails(
                    WriteOrder.deleteElementFromOnOrder({id:elementID, service:service}, WriteOrderDetails)
                );
            },
            onUpdateQuantity: (elementID, service, value) =>{
                setWriteOrderDetails(
                    WriteOrder.updateElementQuantity({id:elementID, service:service, value: value}, WriteOrderDetails)
                );
            },
            onUpdateUnitPrice: (elementID, service, value) =>{
                setWriteOrderDetails(
                    WriteOrder.updateElementUnitPrice({id:elementID, service:service, value: value}, WriteOrderDetails)
                );
            },
            onUpdateElementNameIfCustom: (properties) =>{
                setWriteOrderDetails(
                    WriteOrder.updateCustomElementName(properties, WriteOrderDetails)
                );
            }
        }), document.getElementById("activeElementsOnOrderContainer")
    );
}

function renderHookQInputs(WriteOrderDetails, setWriteOrderDetails){
    ReactDOM.render(
        React.createElement(WriteOrder.renderHookQInputs,{  
            checkStatus: WriteOrderDetails.configs.isFullHookChecked,
            hookQuantity: WriteOrderDetails.order.hookQuantity,
            onCheck: (isChecked) => {
                setWriteOrderDetails(
                    WriteOrder.onCheckedFullHook(isChecked, WriteOrderDetails)
                );
            },
            onChange: (hookQuantity) => {
                setWriteOrderDetails(
                    WriteOrder.onChangeHookQuantity(hookQuantity, WriteOrderDetails)
                );
            }
        }), document.getElementById("inputsHookContainer")
    );
}

function renderSubmitButton(onSubmit){
    ReactDOM.render(
        React.createElement("button",{
            className:  "submitButtonOrder",
            type: "submit",
            onClick: (e) => onSubmit()
        }, "Completar orden"),
        document.getElementById("containerSubmit")
    );
}

function renderLaundryName(){
    ajaxReqUserCreds.fetchAccountCreds().then(({data}) =>{
        document.getElementById("showLaundryName").textContent = data.name;
    }).catch( () =>{
        document.getElementById("showLaundryName").textContent = "Error";
    });
}

function renderUseCustomMessages(){
    ReactDOM.render(
        React.createElement(UseCustomMessages, {
            targetID: "inputIndications"
        }),
        document.getElementById("containerCustomMessages")
    );
}

function renderCurrentOrderID(){
    
    ajaxReqLaundryConfigs.fetchCurrentOrderID().then(({data: {idChar, idNumber}}) => {
        document.getElementById("containerCurrentOrderID").textContent = `${STRINGS.orderID}: ${idChar} ${idNumber}`;
    }).catch(() =>{
        document.getElementById("containerCurrentOrderID").textContent = "Error";
    })
}

function renderCustomerIDHandler(setCustomer, shouldComponentReset, setComponentReset){
    
    ReactDOM.render(
        React.createElement(CustomerIDHandler, {
            mode: "search",
            reset: shouldComponentReset.CustomerIDHandler,
            getCustomerData : (data) => {
                let {id, name} = data;
                
                //set the reset state to false when
                //id & name are null and the reset state is true
                if(!id && !name && shouldComponentReset.CustomerIDHandler){
                    let NewComponentReset = JSON.parse(JSON.stringify(shouldComponentReset));
                    NewComponentReset.CustomerIDHandler = false;
                    setComponentReset(NewComponentReset);
                }
                setCustomer(data);
            }
        }),
        document.getElementById("containerSelectedClient")
    );
}

function renderDateTime(dateTimeHook){
    ReactDOM.render(
        React.createElement(Time.Timer,{
            getTodayDateTime: (today) =>{
                //parse date
                //to prevent updating
                //update if single digit
                dateTimeHook(today);
            }   
        }),
        document.getElementById("containerDateTime")
    );
};

function renderDateTimeInputOrder(todayDateTime, inputDateTimeForOrder, setInputDateTimeForOrder){
    const date = dayjs(todayDateTime.dateTime).format("YYYY-MM-DD");
    const {date: inputDate, time: inputTime} = inputDateTimeForOrder;
    //let [year, month, day] = date.split("-");
    //since it has to wait for information
    //this has to be render after knowing the data
    //of time
    //FORMAT for MIN: YYYY-MM-DD

    ReactDOM.render(
        [React.createElement("label", {
            key: "label4Date",
            htmlFor: "inputDate4Order",
            className: "bold small-rightMargin"
        }, "Fecha:"),
        React.createElement(Time.DateInput, {
            key: "inputDate4Order",
            id: "inputDate4Order",
            getDate: (date) => setInputDateTimeForOrder({date: date, time: inputDateTimeForOrder.time}), 
            min: date,
            value: (inputDate) ? inputDate: ""
        }),

        React.createElement("label", {
            key:"label4Time",
            htmlFor: "inputTime4Order", 
            className: "bold small-rightMargin"
        }, "Hora:"),
        React.createElement(Time.TimeInput, {
            id: "inputTime4Order",
            key: "inputTime4Order",
            getTime: (time) =>setInputDateTimeForOrder({date: inputDateTimeForOrder.date, time: time}),
            value: (inputTime) ? inputTime: ""
            //className: "disableInput"
        })]
        , document.getElementById("containerDateTimeInput")
    );
}

function animateSuccess(){
    //Animation
    if($("#receiptConfigPanel").hasClass("opacityAndDisable") == false){
        $("#receiptConfigPanel").toggleClass("opacityAndDisable");

        if($("#successAnimation").hasClass("hide") == true){
        setTimeout(function(){
            //show it
            $("#successAnimation").toggleClass("hide");
            
            setTimeout(function(){
            //hide it
            $("#successAnimation").toggleClass("hide");
            $("#receiptConfigPanel").toggleClass("opacityAndDisable");
            },1500)
        }, 40);
        }
    }
    //scroll to top
    window.scrollTo(0,0);
}