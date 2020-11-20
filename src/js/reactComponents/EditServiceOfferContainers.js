"use strict";
const React = require("react");
const ServiceOfferComp = require("./EditServiceOfferComp");

/* This is a middle order component, responsible for translation
and bundling of low order components */

const textEs = {
    iron: "Planchado",
    wash_iron: "Lavado y Planchado",
    wash: "Lavado",
    dry_clean: "Lavado en seco",
    updateSuccess: "¡Actualizado la oferta de servicios!",
    update: "Actualizar oferta de servicios"
}

function EditServiceOfferBox({service,checked, onChecked}){
    return React.createElement("div", {
        className: "col-lg-3"
    }, 
        [
            React.createElement(ServiceOfferComp.ServiceCheckBox, {
                key: `checkbox4${service}`,
                service: service,
                checked: checked,
                onChecked: (isChecked) =>{onChecked(service, isChecked);}
            }),
            React.createElement(ServiceOfferComp.ServiceLabel,{
                key: `label4${service}`,
                service: service,
                serviceTxt: textEs[service]
            })
        ]
    )
}

function UpdateServiceOfferButton ({onClick}){
    return React.createElement(ServiceOfferComp.UpdateButton, {
        text: textEs.update,
        onClick: () =>{onClick();}
    });
}

function SuccessMessage(){
    alert(textEs.updateSuccess);
}

module.exports = {
    EditBox: EditServiceOfferBox,
    UpdateServiceOfferButton: UpdateServiceOfferButton,
    SuccessMessage: SuccessMessage
};
//example of EditServiceOfferBoxs
/*
 <div class="col-lg-3 " >
    <input type="checkbox" value="iron" id="checkBoxIron">
    <label class="middleVerticalAlign" for="checkBoxIron">Planchado</label> 
</div>
*/