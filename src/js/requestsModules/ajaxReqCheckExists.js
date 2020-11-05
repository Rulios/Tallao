"use strict";
const ajaxReq = require("./ajaxReq");

async function email(obj){
    //props: inputEmail, userType
    try{
        return await ajaxReq.doAJAX("POST", "./php/checkRepEmail.php", obj);
    }catch(err){
        console.error(err);
    }
    
}

async function laundryInitials(obj){
    //props: inputInitials
    try{
        return await ajaxReq.doAJAX("POST", "./php/checkRepInitials.php", obj);
    }catch(err){
        console.error(err);
    }
}

module.exports = {
    email: email,
    laundryInitials: laundryInitials
};
