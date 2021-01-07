"use strict";
const ajaxReq = require("./ajax-req");

async function registerUser(obj = {}){
    //props: id, inputName, inputSurname, inputEmail, inputPassword
    //      inputTargetMarket

    try{
        return await ajaxReq.post( "./register/user", obj);
    }catch(err){
        console.error(err);
    };
}

async function registerLaundry(obj= {}){
    //props: inputInitials, inputLaundryName, inputLocation
    //inputName, inputSurname, inputEmail, inputPassword
    try{

        return await ajaxReq.post("/register/laundry", obj);

    }catch(err){
        console.error(err);
    }

}

module.exports = {
    registerUser: registerUser,
    registerLaundry: registerLaundry
};
