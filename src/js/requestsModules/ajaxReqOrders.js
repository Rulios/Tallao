const ajaxReq = require("./ajaxReq");

//this module includes all the AJAX fetches that involves on the
//submitting, fetching, and updating orders created by the superuser

async function submitOrder(obj){
    //props formatted as json: indications, elementsOnOrder (contains service, price, quantity), hookQuantity, totalPrice,
    //dateTimeAssignForOrder, dateTimeOrderWritten

    return await ajaxReq.post("/orders/submit", obj);
}

async function fetchOrders(obj){
    return await ajaxReq.get("/orders/fetch", obj);
}

async function updateOrder(obj){
    //the params received here varies. Since it will only
    //send the column name to change.
    /* parameters = customerName, status, elementQuantity, elementsPrice,
                hookQuantity, dateReceive, dateAssign, totalPrice, indications */
    
    return await ajaxReq.post("./php/updateOrder.php", obj);
}

async function updateCustomerAffiliateOrder(jsonString){
    //params: orderID, customerData
    return await ajaxReq.put("/orders/updateCustomerAffiliate", jsonString);
}

async function advanceToNextStatus(jsonString){
    //params: orderID (json)
    return await ajaxReq.put("/orders/nextStatus", jsonString);
}

module.exports =  {
    submitOrder: submitOrder,
    fetchOrders: fetchOrders,
    updateOrder: updateOrder,
    advanceToNextStatus:advanceToNextStatus,
    updateCustomerAffiliateOrder:updateCustomerAffiliateOrder
};
