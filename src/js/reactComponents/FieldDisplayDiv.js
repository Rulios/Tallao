"use strict";

const React = require("react");
const CredsDisplayDiv = require("./reactComponents/CredsDisplayDiv");

const OneFieldDisplay = ({field, value}) =>{

    return(
        React.createElement("div", {
            className: "row formRowSeparation"
        },
            React.createElement(CredsDisplayDiv.Div12, {
                field: field,
                value : value
            })
        )
    );
};

const TwoFieldDisplay = ({field1, value1, field2, value2}) =>{
    return(
        React.createElement("div", {
            className: "row formRowSeparation"
        },
            React.createElement(CredsDisplayDiv.Div6, {
                field: field1,
                value : value1
            }),
            React.createElement(CredsDisplayDiv.Div6, {
                field: field2,
                value : value2
            })
        )
    );
};

module.exports = {
    OneFieldDisplay: OneFieldDisplay,
    TwoFieldDisplay, TwoFieldDisplay
}

//example of two fields display
/* <div class="row supTxt-TitleTxt-Separation">

    <div class="col-lg-6">
        <b>Nombre:</b>

        <span id="showName"></span>
    </div>

    <div class="col-lg-6">
        <b>Apellido:</b>

        <span id="showLastname"></span>
    </div>

</div> */

//example of one field display
/* <div class="row formRowSeparation">

    <div class="col-lg-12 ">
        <b>Correo electrónico:</b>

        <span id="showEmail"></span>
    </div>

</div> */