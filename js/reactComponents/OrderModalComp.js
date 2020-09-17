"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        inputPrevent: "./frontendModules/inputPrevent",
    }
});
define(["react", "inputPrevent"], function(React, inputPrevent){
    
    //All the low components, in charge of just displaying single components

    const FieldRightValue = ({id, fieldTxt, value, tabSpaces}) =>{
        tabSpaces = (typeof tabSpaces === "undefined") ? 0 : parseInt(tabSpaces);
        return React.createElement("div", null, 
            [
                React.createElement("span", {
                    key: `FieldSpan${id}`,
                    className: "bold",
                    style:{
                        paddingLeft: `${1*tabSpaces}em`
                    }
                }, `${fieldTxt}`),
                React.createElement("span", {
                    key: `ValueSpan${id}`,
                    style:{float:"right"}
                }, value)
            ]
        );
    };

    //doesn't float right
    const FieldValue = ({id, fieldTxt, value}) =>{
        return React.createElement("div", null, 
            [
                React.createElement("span", {
                    key: `FieldSpan${id}`,
                    className: "bold"
                }, fieldTxt),
                React.createElement("span", {
                    key: `ValueSpan${id}`,
                }, value)
            ]
        );
    };

    const CenterBoldDiv = ({text, color, isDetailsText}) =>{
        return React.createElement("div", {
            className: `text-center bold ${(typeof isDetailsText !== "undefined" && isDetailsText) ? "detailsText": ""}`,
            style: {
                color: (typeof color !== "undefined") ? color: "black"
            }
        }, text);
    };

    const CloseMessageButton = ({onClick}) =>{
        return React.createElement("button",{
            className: "closeButtonStyle",
            onClick: () => {onClick();}
        }, "x");
    };

    const ModalStateButton = ({text}) =>{
        return React.createElement("button", {
            className: "col-lg-12 modalStateButton"
        }, text);
    };

    const Legend4Div = ({text}) =>{
        return React.createElement("legend", {
            className: "w-auto legendTxt"
        }, text);
    };
  

    return{
        FieldValue:FieldValue,
        FieldRightValue:FieldRightValue,
        CenterBoldDiv:CenterBoldDiv,
        CloseMessageButton:CloseMessageButton,
        ModalStateButton:ModalStateButton,
        Legend4Div:Legend4Div,
    };

});