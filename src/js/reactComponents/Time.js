// main.js
"use strict";

const React = require("react");
const inputPrevent = require("../frontendModules/inputPrevent");
const dayjs = require("dayjs");
const {getStaticText} = require("../../../translation/frontend/translator");
const useServerDateTime = require("../custom-hooks/useServerDateTime");

function DateInput(props){
    //props: 
    //min (DateInput format) - specify the min limit of input
    //onChange (event)
    return(
        React.createElement("input",{
            id: props.id,
            type:"date",
            min: props.min,
            className: props.className,
            value: props.value,
            onChange: (e) => {
                if(inputPrevent.isInputDate(e.target.value)){
                    props.getDate(e.target.value);
                }
            }
        })
    );
}

function TimeInput(props){
    //props: 
    //min (DateInput format) - specify the min limit of input
    //onChange (event)
    return(
        React.createElement("input",{
            id: props.id,
            type:"time",
            min: props.min,
            className: props.className,
            value: props.value,
            onChange: (e) => {
                if(inputPrevent.isInputTime(e.target.value)){
                    props.getTime(e.target.value);
                }
            }
        })
    );
}

function calcTimeDifference(dateFuture, dateNow){
    //returns a obj with the time difference in days, months and years
    let objDiff  = {
        days: 0,
        hours : 0,
        minutes: 0,
        timeStatus : "" //Two values, past or future.
                        //To determine if a order date assign is on the past or on the future
    };

    let diffInMilliSeconds = dayjs(dateFuture).diff(dayjs(dateNow)) / 1000; 
    //set event context
    objDiff.timeStatus = (diffInMilliSeconds < 0) ? "past": "future";

    //transform it to absolute value
    diffInMilliSeconds = Math.abs(diffInMilliSeconds);
    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    objDiff.days = days;
    objDiff.hours = hours;
    objDiff.minutes = minutes;

    return objDiff;
}



module.exports = {
    DateInput: DateInput,
    TimeInput: TimeInput,
    calcTimeDifference:calcTimeDifference,
};;