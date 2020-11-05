require.config({
    paths:{
        ajaxReq: "./requestsModules/ajaxReq"
    }
});
define(["ajaxReq"], function(ajaxReq){
    //Module that contains functions that fetches
    //any needed minor data through the Web App


    async function customerByID(obj){
        //params inputCustomerID (string)
        return await ajaxReq.doAJAX("GET", "./php/DBSearch/searchCustomerByID.php", obj);
    }

    return {
        customerByID: customerByID
    };
});

