'use strict';
require.config({
    paths:{
        jquery: [
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
            "./lib/jquery"]
    }
});

require(["jquery"], function($){

    (function(){
        $(window).on("load", function(e){

            let locationPathName = window.location.pathname;
            
            if(locationPathName == "/Tallao/" || locationPathName == "index.html" || locationPathName == "/Tallao/index.html"){
                resize2FitTheBig();
                console.log(locationPathName);
            }else if(locationPathName == "/Tallao/php/"){ 
                //bounce back the user from accessing here
                history.go(-1);
            }else if(locationPathName == "/Tallao/js/"){
                //bounce back the user from accessing here
                history.go(-1);
            }
            
            $('[data-toggle="tooltip"]').tooltip(); 
        });

    })();


    function resize2FitTheBig(){

        let maxHeight = 0;
        var arrObj = $("div[name='pContainer']");
        let objLength = Object.keys(arrObj).length;
     
        //objLength - 2 because the last two Keys are 
        //default properties from the jquery DOM
        for(let i = 0; i < objLength - 2; i++){
            if(i == 0){
                maxHeight = arrObj[i].offsetHeight;
            }else{
                if(arrObj[i].offsetHeight > arrObj[i-1].offsetHeight){
                    maxHeight = arrObj[i].offsetHeight;
                }
            } 
        }
        $("div[name='pContainer']").css("height",  maxHeight + "px");
    }

});

