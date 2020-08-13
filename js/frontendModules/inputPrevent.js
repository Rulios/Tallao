"use strict";

require.config({
    jquery: [
        "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
        "./lib/jquery"]
});

define(["jquery"], function ($){
    //module that modifies the input to prevent some characters 


    function asteriskAndHyphen(e){
        if((e.which === 45) || (e.which === 42)){
            e.preventDefault();
        }
    }

    function onlyIntegers(e){
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
          e.preventDefault();
        }
    }

    function onlyNumbers(e){
    //Includes integers and decimals
        if ((e.which === 69) || (e.which === 45) || (e.which === 101)) {
            e.preventDefault();
        }
    }

    function preventTab(e){
        if (e.keyCode == 9) e.preventDefault(); 
    }

    function notNumbers(e){
        let charCode = (e.which) ? e.which : event.keyCode;

        if (charCode > 31 && (charCode < 48 || charCode > 58)){
            e.preventDefault();
        }
    }

    function notExponential(e){
        if ((e.which === 69) || (e.which === 101)) {
            e.preventDefault();
        }
    }

    function notNegative(e){
        if(e.target.value <= 0 || e.target.value === ""){
            e.target.value = 1;
        }
    }

    function minLimitZero(e){ //same as notNegative, this time, until zero
        if(e.target.value < 0 || e.target.value === ""){
            e.target.value = 1;
        }
    }


    return{
        asteriskAndHyphen: asteriskAndHyphen,
        onlyIntegers: onlyIntegers,
        onlyNumbers: onlyNumbers,
        preventTab: preventTab,
        notNumbers: notNumbers,
        notExponential: notExponential,
        notNegative: notNegative,
        minLimitZero: minLimitZero
    };

});