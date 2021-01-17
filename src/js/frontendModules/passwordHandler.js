"use strict";

const formVerification = require("./formVerification");
const {getStaticText} = require("../../../translation/frontend/translator");

function passwordCategorization(id, text){
    //function to verify, announce passwords criteria on input
    const weakLength = 6;
    const mediumLength = 10;
    const strongLength = 14;
    const actualLength = text.length;

    formVerification.deleteAppendError(id);

    switch (true) {
        case (actualLength < weakLength):
            formVerification.formAppendError(id, getStaticText("weak_passwordLength"), "red");
            formVerification.invokeVerify(id, false);
        break;
    
        case ((actualLength >= weakLength) && (actualLength <= mediumLength)):
            formVerification.formAppendError(id, getStaticText("moderate_passwordLength"), "yellow");
            formVerification.invokeVerify(id, true);
        break;

        case ((actualLength > mediumLength) && (actualLength <= strongLength)):
            formVerification.formAppendError(id, getStaticText("moderateStrong_passwordLength"), "yellowGreen");
            formVerification.invokeVerify(id, true);
        break;

        case (actualLength > strongLength):
            formVerification.formAppendError(id, getStaticText("strong_passwordLength"), "green");
            formVerification.invokeVerify(id, true);
        break;
    }
}

function rePasswordVerify(id, inputPassword, inputRepassword){
    //function to check if passwords are the same

    formVerification.deleteAppendError(id);
    if(inputRepassword !== inputPassword){
        formVerification.formAppendError(id, getStaticText("passwordDoesntMatch"), "red");
        formVerification.invokeVerify(id, false);
    }else{
        formVerification.formAppendError(id, getStaticText("passwordMatch"), "green");
        formVerification.invokeVerify(id, true);
    }
}

module.exports = {
    passwordCategorization: passwordCategorization,
    rePasswordVerify: rePasswordVerify
};

