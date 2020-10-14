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
        //fetchs all the prices from the service
        //params : none

        return await ajaxReq.doAJAX("GET", "./php_copia/DBSuperUserConfigs/fetchElementsPrice.php", obj);
    }         
    
    async function updateElementsPrice(obj){
        //params: serviceOFfer(string), priceConfig(string)
        //hookPrice(string)

        return await ajaxReq.doAJAX("POST", "./php_copia/DBSuperUserConfigs/updatePriceElements.php", obj);
    }

    async function fetchSchedule(){
        //params : none, it's on cookies

        return await ajaxReq.doAJAX("GET", "./php_copia/DBSuperUserConfigs/fetchSchedule.php");
    }

    async function updateSchedule(str){
        //params: schedule JSON

        return await ajaxReq.doAJAX("POST", "./php_copia/DBSuperUserConfigs/updateSchedule.php", str);
    }   

    async function fetchServiceOffer(){
        //params: none, it's on cookies

        return await ajaxReq.doAJAX("GET", "./php_copia/DBSuperUserConfigs/fetchServiceOffer.php");
    }

    async function updateServiceOffer(obj){
        //params serviceOffer(string)
        
        return await ajaxReq.doAJAX("POST", "./php_copia/DBSuperUserConfigs/updateServiceOffer.php", obj);
    }

    return {  
        fetchElementsPrice: fetchElementsPrice,
        updateElementsPrice: updateElementsPrice,
        fetchSchedule: fetchSchedule,
        updateSchedule: updateSchedule,
        updateServiceOffer: updateServiceOffer,
        fetchServiceOffer: fetchServiceOffer
    };

});
