"use strict";
const ajaxReq = require("./ajaxReq");

async function registerUser(obj = {}){
    //props: id, inputName, inputSurname, inputEmail, inputPassword
    //      inputTargetMarket

    try{
        return await ajaxReq.doAJAX("POST", "./php/register.php", obj);
    }catch(err){
        console.error(err);
    };
}

async function registerLaundry(obj= {}){
    //props: inputInitials, inputLaundryName, inputLocation
    //inputName, inputSurname, inputEmail, inputPassword
    try{

        return await ajaxReq.doAJAX("POST", "/register/laundryRegister", obj);

    }catch(err){
        console.error(err);
    }

}

module.exports = {
    registerUser: registerUser,
    registerLaundry: registerLaundry
};
