"use strict";

const ajaxReq = require("./ajax-req");

async function email(obj){
    //props: inputEmail, userType
    try{
        return await ajaxReq.get("/CheckExists/Email", obj);
    }catch(err){}
    
}

async function laundryInitials(obj){
    //props: inputInitials
    try{
        return await ajaxReq.get("./CheckExists/LaundryInitials", obj);
    }catch(err){}
}

module.exports = {
    email: email,
    laundryInitials: laundryInitials
};
