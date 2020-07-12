require.config({
    paths:{
        ajaxReq: "./requestsModules/ajaxReq"
    }
});
define(["ajaxReq"], function(ajaxReq){
    //this module includes all the condiguration that the superuser
    //has. Except for Custom Messages, since it's a bigger module
    //to perform on it.

    /* data that performs:
        elementsPrice (price of the elements that the laundry has set)
        schedule (schedule of the availability of the laundry)
        serviceOffer (what services do the laundry offers)

     */
    async function fetchElementsPrice(obj){
        //params : serviceOffer

        return await ajaxReq.doAJAX("POST", "./php/fetchElementsPrice.php", obj);
    }         
    
    async function updateElementsPrice(obj){
        //params: serviceOFfer(string), priceConfig(string)
        //hookPrice(string)

        return await ajaxReq.doAJAX("POST", "./php/updatePriceElements.php", obj);
    }

    async function fetchSchedule(){
        //params : none, it's on cookies

        return await ajaxReq.doAJAX("POST", "./php/fetchSchedule.php");
    }

    async function updateSchedule(obj){
        //params: schedule(string)

        return await ajaxReq.doAJAX("POST", "./php/updateSchedule.php", obj);
    }   

    async function updateServiceOffer(obj){
        //params serviceOffer(string)
        
        return await ajaxReq.doAJAX("POST", "./php/updateServiceOffer.php", obj);
    }

    return {  
        fetchElementsPrice: fetchElementsPrice,
        updateElementsPrice: updateElementsPrice,
        fetchSchedule: fetchSchedule,
        updateSchedule: updateSchedule,
        updateServiceOffer: updateServiceOffer
    };

});
