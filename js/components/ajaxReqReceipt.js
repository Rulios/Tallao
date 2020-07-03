requirejs.config({
    paths:{
        jquery: [
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
            "../Tallao/js/lib/jquery"]
    }
});

define(["jquery"], function($){

    async function submitOrder(obj){
        //params: clientID, clientName, eQuantity, ePrice(elementPrice string)
        //hookQuantity, dateReceive, dateAssign, totalPrice, indications
        return await doAJAX("POST", "./php/submitOrder.php", obj);
    }

    async function fetchOrders(obj){
        //params: filterMode, params, startIndex, status(means order status)

        return await doAJAX("POST", "./php/fetchOrders.php", obj);
    }

    async function updateOrder(obj){
        //the params received here varies. Since it will only
        //send the column name to change.
        /* parameters = customerName, status, elementQuantity, elementsPrice,
                 hookQuantity, dateReceive, dateAssign, totalPrice, indications */
        
        return await doAJAX("POST", "./php/updateOrder.php", obj);
    }

    return {
        submitOrder: submitOrder,
        fetchOrders: fetchOrders,
        updateOrder: updateOrder
    };

});

async function doAJAX(type, url, obj){

    return await $.ajax({
        type: type,
        url: url,
        data: obj
    });

}