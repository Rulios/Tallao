const ajaxReq = require("./ajax-req");
//Module that contains functions that fetches
//any needed minor data through the Web App

async function customerByID(obj){
    //params inputCustomerID (string)
    return await ajaxReq.get("/search/customerByID", obj);
}

module.exports =  {
    customerByID: customerByID
};
