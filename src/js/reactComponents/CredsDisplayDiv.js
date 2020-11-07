"use strict";

const React = require("react");

const BoldSpan = ({text}) =>{
    return (
        React.createElement("span", {
            className:"bold small-rightMargin"}, text)
    );
}

const ValueSpan = ({text}) =>{
    return(
        React.createElement("span", null, text)
    );
}

function DataDisplayDiv_6({field, value}){
    return(
        React.createElement("div", {
            className: "col-lg-6"
        }, 
            React.createElement(BoldSpan, {text: field}),
            React.createElement(ValueSpan, {text: value})
        )
    );
}

function DataDisplayDiv_12({field, value}){
    return(
        React.createElement("div", {
            className: "col-lg-12"
        }, 
            React.createElement(BoldSpan, {text: field}),
            React.createElement(ValueSpan, {text: value})
        )
    );
}

module.exports = {
    Div12: DataDisplayDiv_12,
    Div6: DataDisplayDiv_6
};
