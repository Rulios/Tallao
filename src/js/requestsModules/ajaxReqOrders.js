require.config({
    paths:{
        ajaxReq: "./requestsModules/ajaxReq"
    }
});
define(["ajaxReq"], function(ajaxReq){
    //this module includes all the AJAX fetches that involves on the
    //submitting, fetching, and updating orders created by the superuser

    async function submitOrder(jsonString){
        //props formatted as json: indications, elementsOnOrder (contains service, price, quantity), hookQuantity, totalPrice,
        //dateTimeAssignForOrder, dateTimeOrderWritten
  
        return await ajaxReq.doAJAX("POST", "./php/DBOrders/submitOrder.php", jsonString);
    }

    async function fetchOrders(obj){
        //params: filterMode, params, startIndex, status(means order status)
        return await ajaxReq.doAJAX("GET", "./php/DBOrders/fetchOrders.php", obj);
    }

    async function updateOrder(obj){
        //the params received here varies. Since it will only
        //send the column name to change.
        /* parameters = customerName, status, elementQuantity, elementsPrice,
                 hookQuantity, dateReceive, dateAssign, totalPrice, indications */
        
        return await ajaxReq.doAJAX("POST", "./php/updateOrder.php", obj);
    }

    async function updateCustomerAffiliateOrder(jsonString){
        //params: orderID, customerData
        return await ajaxReq.doAJAX("PUT", "./php/DBOrders/updateCustomerAffiliateOrder.php", jsonString);
    }

    async function advanceToNextStatus(jsonString){
        //params: orderID (json)
        return await ajaxReq.doAJAX("PUT", "./php/DBOrders/advanceToNextStatus.php", jsonString);
    }

    return {
        submitOrder: submitOrder,
        fetchOrders: fetchOrders,
        updateOrder: updateOrder,
        advanceToNextStatus:advanceToNextStatus,
        updateCustomerAffiliateOrder:updateCustomerAffiliateOrder
    };

});
