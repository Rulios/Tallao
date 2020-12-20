"use strict";

function redirectToPanel(userType){
    if(userType === "laundry"){
        //7window.location.replace("/laundry/panel");
        window.location = "/laundry/panel";
    }else if(userType === "user"){
        //window.location.replace("#");
        window.location = "/user/panel";
    }
}

function bounceToLogin(){
    window.location.replace("/login");
}

module.exports = {
    redirectToPanel: redirectToPanel,
    bounceToLogin: bounceToLogin
};
