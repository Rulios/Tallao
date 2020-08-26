"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        ScheduleBoxComp: "./reactComponent/ScheduleBoxComp"
    }
});
define(["react", "ScheduleBoxComp"], function(React, ScheduleBoxComp){

    /* This is a middle order component, responsible for translation
    and bundling of low order components */

    const textEs = {
        start: "Entrada:",
        end: "Salida:"
    }

    function EditScheduleBox({day, time}){ //time is a obj
        return React.createElement("div", {
            className: "col-lg-4"
        },
            [
                React.createElement(ScheduleBoxComp.DayTitle, {
                    key: `titleDay${day}`,
                    day: day
                }),
                React.createElement(ScheduleBoxComp.InputTimeDay,{
                    key: `startDay${day}`,
                    id: `startDay${day}`,
                    text: textEs.start,
                    value: time.start
                }),
                React.createElement("br"),
                React.createElement(ScheduleBoxComp.InputTimeDay,{
                    key: `endDay${day}`,
                    id: `endDay${day}`,
                    text: textEs.end,
                    value: time.end
                })
            ]
        );
    }
    
});

//example of EditScheduleBox
/*
<div class="col-lg-4 ">
    <div class="titleTxt">Lunes</div>
    <label for="startMonday">Entrada:</label>
    <input id="startMonday" type="time" class="floatRight">
    <br>
    <label for="endMonday">Salida:</label>
    <input id="endMonday" type="time" class="floatRight">
</div>
*/