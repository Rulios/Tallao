"use strict";

function loginRedirection(url){
    window.location.replace(url);
}

function bounceToLogin(){
    window.location.replace("./login");
}

module.exports = {
    loginRedirection: loginRedirection,
    bounceToLogin: bounceToLogin
};
