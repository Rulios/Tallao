const ajaxReq = require("./ajaxReq");

 //This module has functions that involves all the AJAX requests 
//within the limits of User Credentials.

async function verifyPassword(obj){
    //params: inputPassword (string, to be convalidate with DB data)
    return await ajaxReq.doAJAX("POST", "/account/credentials/verifyPassword", obj);
}

async function newPassword(obj){
    //params: inputPassword(string, must be validated first)

    return await ajaxReq.doAJAX("POST", "/account/credentials/updateNewPassword", obj);
}

async function fetchAccountCreds(){
    //paarams: none, it's on server side

    return await ajaxReq.doAJAX("GET", "/account/credentials/fetch");
}

module.exports = {
    verifyPassword: verifyPassword,
    newPassword: newPassword,
    fetchAccountCreds: fetchAccountCreds
};