"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        inputPrevent: "./frontendModules/inputPrevent",
    }
});
define(["react", "inputPrevent"], function(React, inputPrevent){
    
    //All the low components, in charge of just displaying single components

    const H3 = ({text}) =>{
        return React.createElement("h3", {
            className: "bold"
        }, text);
    };

    const HrGrey = () =>{
        return React.createElement("hr", {
            className: "hrGreyBorder"
        });
    };

    const DivTxt = (text, isCenter) =>{
        return React.createElement("div", {
            className: `${(isCenter) ? "text-center bold": ""}`
        }, text);
    };




    return{
      
    };

});