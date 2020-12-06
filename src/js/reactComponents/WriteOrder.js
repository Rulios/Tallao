"use strict";

const React = require("react");
const $ = require("jquery");
const WriteOrderContainers = require("./WriteOrderContainers");
const ajaxReqLaundryConfigs = require("../requestsModules/ajaxReqLaundryConfigs");

/* This module serves as a function repository. 
In which any component that handles related features can and should
call the functions from this module. */

const elements = [
    "custom", "shirt", "pants", "skirt", "coat",
    "sweater", "pleatedSkirt", "overall", "jumper",
    "blouse", "largeSuit", "quilt"
];

function renderHookQInputs({checkStatus, hookQuantity, onCheck, onChange}){
    //props: idContainer, onCheckFullHook, checkStatus, onChangeHookQuantity
    //render: fullHookCheckBox & WriteOrderContainers.inputHookQuantity
    return [
        React.createElement(WriteOrderContainers.fullHookCheckBox, {
            key: "checkFullHook",
            checkStatus: checkStatus,
            onCheck: (checkedStatus) => onCheck(checkedStatus)
        }),

        React.createElement(WriteOrderContainers.inputHookQuantity, {
            key: "inputHookQuantity",
            hookQuantity: hookQuantity,
            onChange: (hookQ) => onChange(hookQ)
        })
    ];
}

function renderElementsOnOrder({activeElementsOnOrder, onClickDelete, 
    onUpdateQuantity, onUpdateUnitPrice, onUpdateElementNameIfCustom}){
    return(
        //traverse the elements on order
        Object.keys(activeElementsOnOrder).map((elementName) =>{
            //traverse the services of the element on order
            return Object.keys(activeElementsOnOrder[elementName]).map(service =>{
                return React.createElement(WriteOrderContainers.elementOnOrder, {
                    key: `${elementName}-${service}`,
                    id: elementName,
                    price: activeElementsOnOrder[elementName][service]["price"],
                    quantity: activeElementsOnOrder[elementName][service]["quantity"],
                    service: service, 
                    onClickDelete: (elementID,service) =>onClickDelete(elementID,service),
                    onUpdateQuantity: (elementID,service, value) => onUpdateQuantity(elementID,service, value),
                    onUpdateUnitPrice: (elementID,service, value) =>onUpdateUnitPrice(elementID,service,value),
                    onUpdateElementNameIfCustom: (elementID,service, value) =>onUpdateElementNameIfCustom(elementID,service, value)
                });
            });
        })
    );
}

function renderSelectableElementsOnOrder({
    elementsOnSelectList, serviceOffer, elementsPrice, onClick
}){
    return React.createElement("div", null, 
        elementsOnSelectList[serviceOffer].map(elementName =>{
            return React.createElement(WriteOrderContainers.selectableElementToOrder, {
                key: `${elementName}-${serviceOffer}`,
                id: elementName,
                elementPrice: (elementsPrice[serviceOffer] !== null) ? elementsPrice[serviceOffer][elementName] : undefined,
                elementString: WriteOrderContainers.elementsString[elementName],
                service: serviceOffer,
                onClick: (elementID, service) => onClick(elementID, service),
            })
        })
    );
}

function processElementsPrice(elementsPrice){ 
    let parsedElementsPrice = {};
    //parse every value to decimal
    Object.keys(elementsPrice).map(service =>{
        parsedElementsPrice[service] = {};
        Object.keys(elementsPrice[service]).map(element =>{
            parsedElementsPrice[service][element] = Number(parseFloat(elementsPrice[service][element]).toFixed(2));
        });
    });
    return parsedElementsPrice;
}

async function fetchElementsPrice(){
    //fetchs the elements price (all)
    //returns a obj with 2 props (elementsPrice(includes elements and hook(price)))
    try{
        let {data: elementsPrice} = await ajaxReqLaundryConfigs.fetchElementsPrice();
        let newElementsPrice = processElementsPrice(elementsPrice);
        return newElementsPrice;
    }catch(err){
        console.log("UEEE");
        console.log(err);
    }
}

function onElementSelectFromList({id, service}, WriteOrderDetails){
    let NewWriteOrderDetails = $.extend({}, WriteOrderDetails);
    
    //destructure from deep copy obj 
    //NOT ALL PROPS NEEDED BY THIS FUNCTION ARE DESTRUCTURED
    //since they're not object nor arrays, they lose their reference to the main obj
    const elementsPrice = NewWriteOrderDetails.configs.elementsPrice;
    const {hookPrice} = NewWriteOrderDetails.configs;
    let {elementsOnSelectList, customOrdersIndexes} = NewWriteOrderDetails.configs;
    let {activeElementsOnOrder} = NewWriteOrderDetails.order;
    //the format for tagging custom elements are custom1, custom2, custom3... and so on
    //So customOrdersIndexes will store all the indexes, and it will be re-sorted
    //every time it inputs a new index (inputs a new custom element), this is just
    //to naming purposes of object properties at activeElementsOnOrder
    if(id.indexOf("custom") !== -1){
        if(customOrdersIndexes.length === 0){
            id = `${id}1`; //as first custom element of the order
            customOrdersIndexes.push(1);
        }else{
            //sort the array in ascending order
            customOrdersIndexes.sort(function(a, b){return a-b}); 
            //get the last element in array and increment it by 1
            id = `${id}${customOrdersIndexes[customOrdersIndexes.length - 1] + 1}`; 
            //add new index
            customOrdersIndexes.push(customOrdersIndexes.length + 1);
        }
    }

    //add new element to order if it do not exists
    if(!activeElementsOnOrder.hasOwnProperty(id)) activeElementsOnOrder[id] = {};

    //element initialization with values (quantity and price)
    activeElementsOnOrder[id][service] = {};
    activeElementsOnOrder[id][service]["quantity"] = 1;
    //special case: when clicked the custom element, it should start as 1.
    activeElementsOnOrder[id][service]["price"] = (id.indexOf("custom") !== -1) ? 1 : elementsPrice[service][id];

    //delete the element from the select list 
    if(id.indexOf("custom") === -1) elementsOnSelectList[service].splice(elementsOnSelectList[service].indexOf(id), 1);
    //get the total elements quantities
    NewWriteOrderDetails.order.sumElementsQuantities = sumAllElementsQuantities(activeElementsOnOrder);
    //adjsut hook
    NewWriteOrderDetails.order.hookQuantity = adjustHookQByFullHookChecked(NewWriteOrderDetails);
    //get the total price
    NewWriteOrderDetails.order.totalPrice = calcTotalPrice(activeElementsOnOrder, hookPrice, NewWriteOrderDetails.order.hookQuantity);

    return NewWriteOrderDetails;
}

function addElementIntoElementSelectList({id, service}, elementsOnSelectList){
    //this function adds a element into its original position in the select list 
    //find the initial position of the element to be added on the array on List
    //except when custom
    if(id.indexOf("custom") === -1){
        let positionOnOriginal = elements.indexOf(id);
        elementsOnSelectList[service].splice(positionOnOriginal, 0, id);
    }
    //since elementsOnSelectList is a array and passed as a reference, there's no need
    //to return the array
}

function deleteElementFromOnOrder({id, service}, WriteOrderDetails){
    let NewWriteOrderDetails = $.extend({}, WriteOrderDetails);
    
    //destructure from deep copy obj 
    //NOT ALL PROPS NEEDED BY THIS FUNCTION ARE DESTRUCTURED
    //since they're not object nor arrays, they lose their reference to the main obj
    const {hookPrice} = NewWriteOrderDetails.configs;
    let {elementsOnSelectList, customOrdersIndexes} = NewWriteOrderDetails.configs;
    let {activeElementsOnOrder} = NewWriteOrderDetails.order;
    
    addElementIntoElementSelectList({id:id, service:service}, elementsOnSelectList);

    //delete prop from activeElementsOnOrder
    //if it has no service, it will be totally deleted
    //else, it will only delete the service property
    if(Object.keys(activeElementsOnOrder[id]).length > 1){
        delete activeElementsOnOrder[id][service];
    }else{
        delete activeElementsOnOrder[id];
    }

    NewWriteOrderDetails.order.sumElementsQuantities = sumAllElementsQuantities(activeElementsOnOrder);

    //CORRECT HOOKQ | it shouldn't surpass the sumElementsQuantity, but it shouldn't decrement also
    if(NewWriteOrderDetails.order.hookQuantity > NewWriteOrderDetails.order.sumElementsQuantities){
        NewWriteOrderDetails.order.hookQuantity = NewWriteOrderDetails.order.sumElementsQuantities;
    }
    
    NewWriteOrderDetails.configs.isFullHookChecked = adjustFullHookCheckedByHookQ(NewWriteOrderDetails);

    NewWriteOrderDetails.order.totalPrice = calcTotalPrice(activeElementsOnOrder, hookPrice, NewWriteOrderDetails.order.hookQuantity); 
    return NewWriteOrderDetails;
}

function updateElementQuantity({id, service, value}, WriteOrderDetails){
    let NewWriteOrderDetails = $.extend({}, WriteOrderDetails);
    
    //destructure from deep copy obj 
    //NOT ALL PROPS NEEDED BY THIS FUNCTION ARE DESTRUCTURED
    //since they're not object nor arrays, they lose their reference to the main obj
    let {activeElementsOnOrder} = NewWriteOrderDetails.order;
    const {hookPrice} = NewWriteOrderDetails.configs;

    activeElementsOnOrder[id][service]["quantity"] = parseFloat(value);
    //sum elements quantities
    NewWriteOrderDetails.order.sumElementsQuantities = sumAllElementsQuantities(activeElementsOnOrder);
    //adjust hook quantity
    NewWriteOrderDetails.order.hookQuantity = adjustHookQByFullHookChecked(NewWriteOrderDetails);
    //adjust full hook checked status
    NewWriteOrderDetails.configs.isFullHookChecked = adjustFullHookCheckedByHookQ(NewWriteOrderDetails);

    NewWriteOrderDetails.order.totalPrice = calcTotalPrice(activeElementsOnOrder, hookPrice, NewWriteOrderDetails.order.hookQuantity); 

    return NewWriteOrderDetails;
}

function updateElementUnitPrice({id, service, value}, WriteOrderDetails){
    let NewWriteOrderDetails = $.extend({}, WriteOrderDetails);
    
    //destructure from deep copy obj 
    //NOT ALL PROPS NEEDED BY THIS FUNCTION ARE DESTRUCTURED
    //since they're not object nor arrays, they lose their reference to the main obj
    const {hookPrice} = NewWriteOrderDetails.configs;
    let {activeElementsOnOrder} = NewWriteOrderDetails.order;

    activeElementsOnOrder[id][service]["price"] = parseFloat(value);

    //sum elements quantities
    NewWriteOrderDetails.order.sumElementsQuantities = sumAllElementsQuantities(activeElementsOnOrder);

    NewWriteOrderDetails.order.totalPrice = calcTotalPrice(activeElementsOnOrder,hookPrice,NewWriteOrderDetails.order.hookQuantity); 
    return NewWriteOrderDetails;
}

function updateCustomElementName({id, service, value}, WriteOrderDetails){
    let NewWriteOrderDetails = $.extend({}, WriteOrderDetails);
    let {activeElementsOnOrder} = NewWriteOrderDetails.order;
    activeElementsOnOrder[id][service]["name"] = value;
    return NewWriteOrderDetails;
}

function onCheckedFullHook(isChecked, WriteOrderDetails){
    //Handler for Full Hook Checkbox
    let NewWriteOrderDetails = $.extend({}, WriteOrderDetails);
    const {hookPrice} = NewWriteOrderDetails.configs;
    let {activeElementsOnOrder} = NewWriteOrderDetails.order;
    NewWriteOrderDetails.configs.isFullHookChecked = isChecked;
    if(NewWriteOrderDetails.configs.isFullHookChecked){//if checked
        //equal the hookQuantity to be the same as the sum of the elements quantities
        NewWriteOrderDetails.order.hookQuantity = NewWriteOrderDetails.order.sumElementsQuantities;
    }else{
        //if sum of the elements quantities is not zero,
        //assign hookQuantity to be minus 1 from sum of the elements quantities
        //if it's zero, prevent it to be a negative number
        NewWriteOrderDetails.order.hookQuantity = (NewWriteOrderDetails.order.sumElementsQuantities === 0) ? 0 :NewWriteOrderDetails.order.sumElementsQuantities -1;
    }
    NewWriteOrderDetails.order.totalPrice = calcTotalPrice(activeElementsOnOrder,hookPrice,NewWriteOrderDetails.order.hookQuantity); 
    return NewWriteOrderDetails;
}

function onChangeHookQuantity(hookQuantity, WriteOrderDetails){
    //Handler for Hook Input
    let NewWriteOrderDetails = $.extend({}, WriteOrderDetails);
    let {activeElementsOnOrder} = NewWriteOrderDetails.order;
    const hookPrice = NewWriteOrderDetails.configs.hookPrice;

    //hookQuantity shouldn't surpass the sum of the elements quantities
    if(hookQuantity > WriteOrderDetails.order.sumElementsQuantities){
        NewWriteOrderDetails.order.hookQuantity = WriteOrderDetails.order.sumElementsQuantities;
    }else if(hookQuantity < 0){ //can't be a negative number
        NewWriteOrderDetails.order.hookQuantity = 0;
    }else{
        NewWriteOrderDetails.order.hookQuantity = hookQuantity;
    }
    console.log(NewWriteOrderDetails.order.hookQuantity);
    //adjust full hook checked status
    NewWriteOrderDetails.configs.isFullHookChecked = adjustFullHookCheckedByHookQ(NewWriteOrderDetails);
    NewWriteOrderDetails.order.totalPrice = calcTotalPrice(activeElementsOnOrder,hookPrice,NewWriteOrderDetails.order.hookQuantity); 
    
    return NewWriteOrderDetails;
}

function sumAllElementsQuantities(activeElementsOnOrder){ //sum all the quantities of elements inside the order
    let sumElementsQuantity = 0;
    //traverse for each element on order
    Object.keys(activeElementsOnOrder).map(elementName =>{
        //traverse for each service the element on order
        Object.keys(activeElementsOnOrder[elementName]).map(service =>{
            sumElementsQuantity += activeElementsOnOrder[elementName][service]["quantity"];
        });
    });
    return sumElementsQuantity;
}

function adjustHookQByFullHookChecked(WriteOrderDetails){
    //if the user has checked full hook, then the hook quantity provided will be the same as sumElementsQuantity
    //if not, it will just increment by one the previous hook quantity provided
    let {isFullHookChecked} = WriteOrderDetails.configs;
    let {sumElementsQuantities, hookQuantity} = WriteOrderDetails.order;
    return (isFullHookChecked) ? sumElementsQuantities : ++ hookQuantity;
}

function adjustFullHookCheckedByHookQ(WriteOrderDetails){
    let {sumElementsQuantities, hookQuantity} = WriteOrderDetails.order;
    return (hookQuantity === sumElementsQuantities) ? true : false;
}

function calcTotalPrice(activeElementsOnOrder,hookPrice, hookQuantity){
    //params: elementsOnOrder (object), hookQuantity (int), sumElementsQuantity (int)
    let total = 0;
    let sumElementsQuantity = sumAllElementsQuantities(activeElementsOnOrder);
    //traverse for each element on order
    Object.keys(activeElementsOnOrder).map(elementName =>{
        //traverse for each service the element on order
        Object.keys(activeElementsOnOrder[elementName]).map(service =>{
            total += activeElementsOnOrder[elementName][service]["price"] * activeElementsOnOrder[elementName][service]["quantity"];
            total = Number(total.toFixed(2));
        });
    });
    
    //if missing hooks, multiply by sumElementsQuantity - hookQuantity
    if(hookQuantity !== undefined && hookQuantity < sumElementsQuantity){
        let priceHook = hookPrice * (sumElementsQuantity - hookQuantity);
        priceHook = Number(priceHook.toFixed(2));
        if(priceHook >= 0){//prevent a discount on priceHooks
            total += priceHook; //add missing hookPrice to the original price
        }
    }
    return parseFloat(total.toFixed(2));
}

module.exports = {
    elements: elements,
    renderSelectableElementsOnOrder:renderSelectableElementsOnOrder,
    fetchElementsPrice:fetchElementsPrice,
    onElementSelectFromList:onElementSelectFromList,
    deleteElementFromOnOrder:deleteElementFromOnOrder,
    updateElementQuantity:updateElementQuantity,
    updateElementUnitPrice:updateElementUnitPrice,
    updateCustomElementName:updateCustomElementName,
    addElementIntoElementSelectList:addElementIntoElementSelectList,
    onCheckedFullHook:onCheckedFullHook,
    onChangeHookQuantity:onChangeHookQuantity,
    renderElementsOnOrder: renderElementsOnOrder,
    renderHookQInputs:renderHookQInputs
};


