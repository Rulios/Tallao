require.config({

    paths:{

        jquery: [
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
            "../Tallao/js/lib/jquery"]
        ,

        formVerification : "components/formVerification.js"
    }
});

require(["jquery", "formVerification"], function($, formVerification){
    'use strict';


    $(document).ready(function(){

        if((window.location.pathname === "/Tallao/masterRegister.html") || (window.location.pathname === "masterRegister.html")){
      
            formVerification.setUserType("superuser");
      
        }else if((window.location.pathname === "/Tallao/register.html") || (window.location.pathname === "register.html")){
            
            formVerification.setUserType("user");
        }

        formVerification.invokeVerify("load", false);

        

    });


})