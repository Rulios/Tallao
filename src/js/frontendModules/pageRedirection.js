"use strict";

function redirectToPanel(userType){
    if(userType === "laundry"){
        window.location = "/laundry/panel";
    }else if(userType === "user"){
        window.location = "/user/panel";
    }
}

function bounceToLogin(){
    window.location.replace("/loginPage");
}

module.exports = {
    redirectToPanel: redirectToPanel,
    bounceToLogin: bounceToLogin
};
