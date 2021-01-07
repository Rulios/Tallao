
const ajaxReq = require("./ajax-req");

//this module includes all the condiguration that the superuser
//has. Except for Custom Messages, since it's a bigger module
//to perform on it.

/* data that performs:
    elementsPrice (price of the elements that the laundry has set)
    schedule (schedule of the availability of the laundry)
    serviceOffer (what services do the laundry offers)

*/

async function fetchCurrentOrderID(){
    return await ajaxReq.get("/laundry/configs/currentOrderID");
}

async function fetchElementsPrice(obj){
    //fetchs all the prices from the service
    //params : none

    return await ajaxReq.get("/laundry/configs/elementsPrice/fetch", obj);
}         

async function updateElementsPrice(obj){
    //params: elementsPrice(obj)

    return await ajaxReq.put("/laundry/configs/elementsPrice/update", obj);
}

async function fetchSchedule(){
    //params : none, it's on cookies

    return await ajaxReq.get("/laundry/configs/schedule/fetch");
}

async function updateSchedule(str){
    //params: schedule JSON

    return await ajaxReq.put("/laundry/configs/schedule/update", str);
}   

async function fetchServiceOffer(){
    //params: none, it's on cookies

    return await ajaxReq.get("/laundry/configs/serviceOffer/fetch");
}

async function updateServiceOffer(obj){
    //params serviceOffer(string)
    
    return await ajaxReq.put("/laundry/configs/serviceOffer/update", obj);
}

module.exports = {  
    fetchCurrentOrderID:fetchCurrentOrderID,
    fetchElementsPrice: fetchElementsPrice,
    updateElementsPrice: updateElementsPrice,
    fetchSchedule: fetchSchedule,
    updateSchedule: updateSchedule,
    updateServiceOffer: updateServiceOffer,
    fetchServiceOffer: fetchServiceOffer
};
