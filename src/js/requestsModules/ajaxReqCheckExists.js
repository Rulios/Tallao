"use strict";

const ajaxReq = require("./ajaxReq");


async function email(obj){
    //props: inputEmail, userType
    try{
        return await ajaxReq.doAJAX("GET", "/CheckExists/Email", obj);
    }catch(err){}
    
}

async function laundryInitials(obj){
    //props: inputInitials
    try{
        return await ajaxReq.doAJAX("GET", "./CheckExists/LaundryInitials", obj);
    }catch(err){}
}

module.exports = {
    email: email,
    laundryInitials: laundryInitials
};
