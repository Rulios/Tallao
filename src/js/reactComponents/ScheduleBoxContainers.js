"use strict";

const React = require("react");
const ScheduleBoxComp = require("./ScheduleBoxComp");

/* This is a middle order component, responsible for translation
and bundling of low order components */

const textEs = {
    start: "Entrada:",
    end: "Salida:",
    update: "Actualizar horario de servicio",
    updateSuccess: "¡Horario actualizado!",
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo"
}

function EditScheduleBox({idDay, time, onChangeSchedule}){ //time is a obj
    return React.createElement("div", {
        className: "col-lg-4 smallMarginBottom hoverShadow"
    },
        [
            React.createElement(ScheduleBoxComp.DayTitle, {
                key: `titleDay${idDay}`,
                dayTxt: textEs[idDay]
            }),
            React.createElement(ScheduleBoxComp.InputTimeDay,{
                key: `startDay${idDay}`,
                id: `startDay${idDay}`,
                text: textEs.start,
                value: time.startHour,
                onChange: (value) =>{
                    onChangeSchedule(idDay, value, "startHour");
                }
            }),
            React.createElement("br", {key: `id${idDay}`}),
            React.createElement(ScheduleBoxComp.InputTimeDay,{
                key: `endDay${idDay}`,
                id: `endDay${idDay}`,
                text: textEs.end,
                value: time.endHour,
                onChange: (value) =>{
                    onChangeSchedule(idDay, value, "endHour");
                }
            })
        ]
    );

}

function UpdateScheduleButton ({onClick}){
    return React.createElement(ScheduleBoxComp.submitButton, {
        text: textEs.update,
        onClick: () =>{onClick();}
    });
}

function SuccessMessage(){
    alert(textEs.updateSuccess);
}

module.exports = {
    EditBox: EditScheduleBox,
    UpdateScheduleButton: UpdateScheduleButton,
    SuccessMessage: SuccessMessage
};

//example of EditScheduleBox
/*
<div class="col-lg-4 smallMarginBottom">
    <div class="titleTxt">Lunes</div>
    <label for="startMonday">Entrada:</label>
    <input id="startMonday" type="time" class="floatRight">
    <br>
    <label for="endMonday">Salida:</label>
    <input id="endMonday" type="time" class="floatRight">
</div>
*/