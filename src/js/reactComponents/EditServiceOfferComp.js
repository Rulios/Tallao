"use strict";

const React = require("react");
const inputPrevent = require("../frontendModules/inputPrevent");

 //All the low components, in charge of just displaying single components

 const ServiceCheckBox = ({service, checked, onChecked}) =>{
    return React.createElement("input", {
        id: `checkBox${service}`,
        type: "checkbox",
        value: service,
        className: "small-rightMargin",
        checked: checked,
        onChange: (e) => {onChecked(e.target.checked);}
    });
};

const ServiceLabel = ({serviceTxt, service}) =>{
    return React.createElement("label", {
        className: "middleVerticalAlign",
        htmlFor: `checkBox${service}`
    }, serviceTxt); 
};

const UpdateButton = ({text, onClick}) =>{
    return React.createElement("button", {
        className: "submitButtonActualize2",
        onClick: () => {onClick();}
    }, text);
}


module.exports = {
    ServiceCheckBox: ServiceCheckBox,
    ServiceLabel: ServiceLabel,
    UpdateButton: UpdateButton
};