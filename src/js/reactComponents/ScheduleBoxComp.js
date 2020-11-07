"use strict";

const React = require("react");
const inputPrevent = require( "./frontendModules/inputPrevent");

//All the low components, in charge of just displaying single components

const DayTitle = ({dayTxt}) =>{
    return React.createElement("div", {
        className: "titleTxt"
    }, dayTxt);
};

const InputTimeDay = ({id, text, value, onChange}) => {
    return [
        React.createElement("label", {
            key: `label4${id}`,
            htmlFor: id
        }, text),
        React.createElement("input", {
            key: `inputTime4${id}`,
            id: id,
            type: "time",
            className: "floatRight",
            value: value,
            onChange: (e) =>{
                if(inputPrevent.isInputTime(e.target.value)){
                    onChange(e.target.value);
                }
            }
        })
    ];
};

const submitButton = ({text,onClick}) =>{
    return React.createElement("button", {
        className: "submitButtonActualize1",
        onClick: () =>{onClick();}
    }, text);
}

module.exports = {
    DayTitle: DayTitle,
    InputTimeDay: InputTimeDay,
    submitButton: submitButton
};