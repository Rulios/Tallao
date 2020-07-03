requirejs.config({
    paths:{
        jquery: [
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
            "../Tallao/js/lib/jquery"]
    }
});

define(["jquery"], function($){
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

        return await doAJAX("POST", "./php/fetchElementPrice.php", obj);
    }         
    
    async function updateElementsPrice(obj){
        //params: serviceOFfer(string), priceConfig(string)
        //hookPrice(string)

        return await doAJAX("POST", "./php/updatePriceElements.php", obj);
    }

    async function fetchSchedule(){
        //params : none, it's on cookies

        return await doAJAX("POST", "./php/fetchSchedule.php");
    }

    async function updateSchedule(obj){
        //params: schedule(string)

        return await doAJAX("POST", "./php/updateSchedule.php", obj);
    }   

    async function updateServiceOffer(obj){
        //params serviceOffer(string)
        
        return await doAJAX("POST", "./php/updateServiceOffer.php", obj);
    }

    return {  
        fetchElementsPrice: fetchElementsPrice,
        updateElementsPrice: updateElementsPrice,
        fetchSchedule: fetchSchedule,
        updateSchedule: updateSchedule,
        updateServiceOffer: updateServiceOffer
    };

});

async function doAJAX(type, url, obj){
    return await $.ajax({
        type: type,
        url: url,
        data: obj

    });
}