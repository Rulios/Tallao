"use strict";
const React = require("react");
const inputPrevent = require("../frontendModules/inputPrevent");

//All the low components, in charge of just displaying single components
const Label4Input = ({id, text}) =>{
    return React.createElement("label", {
        className: "small-rightMargin",
        htmlFor: id
    }, text);
};

const Legend4Div = ({text}) =>{
    return React.createElement("legend", {
        className: "w-auto legendTxt"
    }, text);
};

const InputDate = ({id, value,onChange}) =>{
    return React.createElement("input", {
        id: id,
        type: "date",
        //value : value,
        onChange: (e) =>{
            if(inputPrevent.isInputDate(e.target.value)){
                onChange(e.target.value);
            }
        }
    });
};

const InputTime = ({id, value,onChange}) =>{
    return React.createElement("input", {
        id: id,
        type: "time",
        value : value,
        onChange: (e) =>{
            if(inputPrevent.isInputTime(e.target.value)){
                onChange(e.target.value);
            }
        }
    });
};

const InputText = ({id, isCharInput, value, onChange}) =>{
    return React.createElement("input", {
        id: id,
        type: "text",
        value : value,
        maxLength: "7",
        style: {
            width: (isCharInput) ? "2em" : ""
        },  
        onChange : (e) =>{
            onChange(e.target.value);
        },
        onKeyPress : (e) =>{
            e.target.value = e.target.value.toUpperCase();
        }
    });
}

const InputNumber = ({id, value, onChange}) =>{
    return React.createElement("input", {
        id: id,
        type: "number",
        value: value,
        onChange: (e) =>{ 
            onChange(e.target.value);
        }
    })
}

module.exports = {
    Label4Input:Label4Input,
    Legend4Div:Legend4Div,
    InputDate:InputDate,
    InputTime:InputTime,
    InputText:InputText,
    InputNumber:InputNumber
};