require.config({
    paths:{
        ajaxReq: "./requestsModules/ajaxReq"
    }
});
define(["ajaxReq"], function(ajaxReq){
    //Module that contains functions that fetches
    //any needed minor data through the Web App


    async function clientID(obj){
        //params inputClientID (string)

        return await ajaxReq.doAJAX("POST", "./php/searchClientID.php", obj);
    }

    return {
        clientID: clientID
    };
});

