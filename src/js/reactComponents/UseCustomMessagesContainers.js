"use strict";

const React = require("react");

/* This is a middle order component, responsible for translation
and bundling of low order components */


const InstantMsgTag = ({id, colorTag, text, onClick}) =>{
    return(
        React.createElement("button", {
            className:"instantMsgTagStyle bottomLineLinkAnimation",
            style: {backgroundColor : colorTag},
            onClick: () => { onClick(id);}
        }, text)
    );
};

module.exports = {
    InstantMsgTag:InstantMsgTag
};
