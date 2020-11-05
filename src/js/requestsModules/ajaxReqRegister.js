"use strict";
const ajaxReq = require("./ajaxReq");

async function registerUser(obj = {}){
    //props: id, inputName, inputLastname, inputEmail, inputPassword
    //      inputTargetMarket

    try{
        return await ajaxReq.doAJAX("POST", "./php/register.php", obj);
    }catch(err){
        console.error(err);
    };
}

async function registerLaundry(obj= {}){
    //props: inputInitials, inputLaundryName, inputLocation
    //inputName, inputLastname, inputEmail, inputPassword
    try{

        return await ajaxReq.doAJAX("POST", "./php/DBRegister/masterRegister.php", obj);

    }catch(err){
        console.error(err);
    }

}

module.exports = {
    registerUser: registerUser,
    registerLaundry: registerLaundry
};
