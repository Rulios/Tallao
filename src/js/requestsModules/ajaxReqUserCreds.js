const ajaxReq = require("./ajaxReq");

 //This module has functions that involves all the AJAX requests 
//within the limits of User Credentials.

async function verifyPassword(obj){
    //params: inputPassword (string, to be convalidate with DB data)
    return await ajaxReq.post("/account/credentials/verifyPassword", obj);
}

async function newPassword(obj){
    //params: inputPassword(string, must be validated first)
    return await ajaxReq.post("/account/credentials/updateNewPassword", obj);
}

async function fetchAccountCreds(){
    //paarams: none, it's on server side
    return await ajaxReq.get("/account/credentials/fetch");
}

async function getUserType(){
    return await ajaxReq.get("/account/credentials/getUsertype");
}

module.exports = {
    verifyPassword: verifyPassword,
    newPassword: newPassword,
    fetchAccountCreds: fetchAccountCreds,
    getUserType:getUserType
};