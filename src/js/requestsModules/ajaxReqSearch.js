const ajaxReq = require("./ajaxReq");

//Module that contains functions that fetches
//any needed minor data through the Web App

async function customerByID(obj){
    //params inputCustomerID (string)
    return await ajaxReq.doAJAX("GET", "/search/customerByID", obj);
}

module.exports =  {
    customerByID: customerByID
};
