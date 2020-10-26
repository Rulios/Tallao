"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        inputPrevent: "./frontendModules/inputPrevent",
    }
});
define(["react", "inputPrevent"], function(React, inputPrevent){
    
    //All the low components, in charge of just displaying single components

    const ElementTitle = ({elementTxt}) =>{
        return React.createElement("div", {
            className: "titleTxt"
        }, elementTxt);
    };

    const InputElementPrice = ({id, text, value, onChange}) => {
        return [
            React.createElement("label", {
                key: `label4${id}`,
                htmlFor: id
            }, text),
            React.createElement("input", {
                key: `inputElementPrice4${id}`,
                id: id,
                type: "number",
                className: "",
                value: value,
                onChange: (e) =>{
                    if(!isNaN(e.target.value) && e.target.value !== ""){
                        onChange(parseFloat(e.target.value));
                    }
                },
                onKeyPress: (e)=>{
                    inputPrevent.minLimitZero(e);
                    inputPrevent.notExponential(e);
                }
            })
        ];
    };

    const elementIMG = ({element}) =>{
        return React.createElement("img", {
            className: `assetStayStatic floatLeft`,
            src: `./imgs/assets/${element}/${element}.svg`
        });
    };

    const SubmitButton = ({text,onClick}) =>{
        return React.createElement("button", {
            className: "submitButtonActualize",
            onClick: () =>{onClick();}
        }, text);
    }

    return{
        ElementTitle: ElementTitle,
        InputElementPrice: InputElementPrice,
        SubmitButton: SubmitButton,
        elementIMG: elementIMG
    };

});