require.config({

    paths:{

        jquery: [
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
            "../Tallao/js/lib/jquery"
        ],
        formVerification : "frontendModules/formVerification"

        

    }

});

require(["ajaxReqCheckExists"], function(ajaxReqCheckExists){


});



