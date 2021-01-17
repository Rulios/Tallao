"use strict";

const React = require("react");
const ScheduleBoxComp = require("./ScheduleBoxComp");
const {getStaticText} = require("../../../translation/frontend/translator");

/* This is a middle order component, responsible for translation
and bundling of low order components */

function EditScheduleBox({idDay, time, onChangeSchedule}){ //time is a obj
    return React.createElement("div", {
        className: "col-lg-4 smallMarginBottom hoverShadow"
    },
        [
            React.createElement(ScheduleBoxComp.DayTitle, {
                key: `titleDay${idDay}`,
                dayTxt: getStaticText(idDay)
            }),
            React.createElement(ScheduleBoxComp.InputTimeDay,{
                key: `startDay${idDay}`,
                id: `startDay${idDay}`,
                text: `${getStaticText("startDay")}:`,
                value: time.startHour,
                onChange: (value) =>{
                    onChangeSchedule(idDay, value, "startHour");
                }
            }),
            React.createElement("br", {key: `id${idDay}`}),
            React.createElement(ScheduleBoxComp.InputTimeDay,{
                key: `endDay${idDay}`,
                id: `endDay${idDay}`,
                text: `${getStaticText("endDay")}:`,
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
        text: getStaticText("updateSchedule"),
        onClick: () =>{onClick();}
    });
}

function SuccessMessage(){
    alert(getStaticText("updateScheduleSuccess"));
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