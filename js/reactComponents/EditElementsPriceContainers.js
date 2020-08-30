"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        EditElementsPriceComp: "./reactComponents/EditElementsPriceComp"
    }
});
define(["react", "EditElementsPriceComp"], function(React, EditElementsPriceComp){

    /* This is a middle order component, responsible for translation
    and bundling of low order components */

    const textEs = {
        shirt: "Camisa",
        pants: "Pantalon",
        skirt: "Falda",
        coat: "Saco",
        sweater: "Suéter",
        pleatedSkirt: "Falda Plizada",
        overall: "Overol",
        jumper: "Jumper",
        blouse: "Blusa",
        largeSuit: "Vestido",
        quilt: "Colcha",
        updateSuccess: "¡Precios actualizados!",
        update: "Actualizar precios",
        pricePerUnit: "Precio por unidad($):"
    };

    function EditElementPriceBox({idElement, price, onChangePrice}){ //price is a obj
        return React.createElement("div", {
            className: "col-lg-4 smallMarginBottom hoverShadow"
        },
            [
                React.createElement(EditElementsPriceComp.elementIMG, {
                key: `elementIMG4${idElement}`,
                element: idElement
            }),
                React.createElement("div", {key:`elementDetails4${idElement}`,className: "text-center"},
                    [
                        React.createElement(EditElementsPriceComp.ElementTitle, {
                            key: `titleDay${idElement}`,
                            elementTxt: textEs[idElement]
                        }),
                        React.createElement(EditElementsPriceComp.InputElementPrice,{
                            key: `EditElementPrice4${idElement}`,
                            id: `EditElementPrice4${idElement}`,
                            text: textEs.pricePerUnit,
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
        return React.createElement(EditElementsPriceComp.submitButton, {
            text: textEs.update,
            onClick: () =>{onClick();}
        });
    }

    function SuccessMessage(){
        alert(textEs.updateSuccess);
    }

    return{
        EditBox: EditElementPriceBox,
        UpdateElementsPriceButton: UpdateElementsPriceButton,
        SuccessMessage: SuccessMessage
    };

});

//example of EditElementPriceBox
/*
<div class="col-lg-4 smallMarginBottom hoverShadow">
    <div class="titleTxt">Camisa</div>
    <label for="priceshirt">Precio($):</label>
    <input type="number" id="priceshirt" class="floatRight">
</div>
*/