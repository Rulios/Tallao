"use strict";

const React = require("react");
const EditElementsPriceComp = require("./EditElementsPriceComp");
const {getStaticText} = require("../../../translation/frontend/translator");

/* This is a middle order component, responsible for translation
and bundling of low order components */

//Hook is the only exception to this component
//When the element is a hook it shouldn´t have col-lg-4 nor floatLeft when rendering its svg

function EditElementPriceBox({idElement, price,isHook = false, onChangePrice}){ //price is a obj
    return React.createElement("div", {
        className: `${(!isHook)? "col-lg-4" : "col-lg-12"} smallMarginBottom hoverShadow`
    },
        [
            React.createElement(EditElementsPriceComp.elementIMG, {
                key: `elementIMG4${idElement}`,
                element: idElement,
        }),
            React.createElement("div", {key:`elementDetails4${idElement}`,className: "text-center"},
                [
                    React.createElement(EditElementsPriceComp.ElementTitle, {
                        key: `titleDay${idElement}`,
                        elementTxt: getStaticText(idElement)
                    }),
                    React.createElement(EditElementsPriceComp.InputElementPrice,{
                        key: `EditElementPrice4${idElement}`,
                        id: `EditElementPrice4${idElement}`,
                        text: `${getStaticText("pricePerUnit")}($):`,
                        value: price,
                        onChange: (value) =>{
                            onChangePrice(idElement, value);
                        }
                    }),
                ]
            )
        ]
        
    );

}

function UpdateElementsPriceButton ({onClick}){
    return React.createElement(EditElementsPriceComp.SubmitButton, {
        text: getStaticText("updateElementsPrice"),
        onClick: () => onClick()
    });
}

function SuccessMessage(){
    alert(getStaticText("updateElementsPriceSuccess"));
}

module.exports = {
    EditBox: EditElementPriceBox,
    UpdateElementsPriceButton: UpdateElementsPriceButton,
    SuccessMessage: SuccessMessage
};

//example of EditElementPriceBox
/*
<div class="col-lg-4 smallMarginBottom hoverShadow">
    <div class="titleTxt">Camisa</div>
    <label for="priceshirt">Precio($):</label>
    <input type="number" id="priceshirt" class="floatRight">
</div>
*/