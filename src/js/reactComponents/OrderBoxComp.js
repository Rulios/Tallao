"use strict";

const React = require("react");
const inputPrevent = require("../frontendModules/inputPrevent");

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

const CenterBoldDiv = ({text, color, isDetailsText}) =>{
    return React.createElement("div", {
        className: `text-center bold ${(typeof isDetailsText !== "undefined" && isDetailsText) ? "detailsText": ""}`,
        style: {
            color: (typeof color !== "undefined") ? color: "black"
        }
    }, text);
};

const FieldValue = ({id, fieldTxt, value}) =>{
    return React.createElement("div", null, 
        [
            React.createElement("span", {
                key: `FieldSpan${id}`,
                className: "bold"
            }, fieldTxt),
            React.createElement("span", {
                key: `ValueSpan${id}`,
                style:{float:"right"}
            }, value)
        ]
    );
};



module.exports = {
    H3:H3,
    HrGrey:HrGrey,
    CenterBoldDiv:CenterBoldDiv,
    FieldValue: FieldValue
};