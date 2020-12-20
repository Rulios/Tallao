'use strict';

const $ = require("jquery");
(function(){
    $(window).on("load", function(e){

        let locationPathName = window.location.pathname;
        
        if(locationPathName == "/Tallao/" || locationPathName == "index.html" || locationPathName == "/Tallao/index.html"){
            resize2FitTheBig();
        }
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
