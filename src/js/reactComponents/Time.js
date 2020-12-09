// main.js
"use strict";

const React = require("react");
const inputPrevent = require("../frontendModules/inputPrevent");
const ajaxReqTime = require("../requestsModules/ajaxReqServerTime");
const dayjs = require("dayjs");

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

function convert12hTo24h(time12h){
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
        hours = '00';
    }
    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
}

const convert24hTo12h = (time24) => {
    const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
    const period = +sHours < 12 ? 'AM' : 'PM';
    const hours = +sHours % 12 || 12;
    
    return {
        hours: hours,
        minutes: minutes,
        cycle: period
    };
}


async function getDateTimeFromServer(){
    //format from server: YYYY/MM/DD
    try{
        let {dateTime} = await ajaxReqTime.fetchDateTimeServer();
        return dayjs(dateTime);
    }catch(err){console.error(err);}
}

function getMonthString(month){
    const months = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    return months[month];
}

class Timer extends React.Component{

    constructor(props){
        super(props);
        this.state={
            ajaxLoaded: false
        }
    }

    returnTodayDateTime(){
        return this.props.getTodayDateTime({
            day: this.state.day,
            month: this.state.month,
            year: this.state.year,
            hour: this.state.hour,
            minutes: this.state.minutes,
            cycle: this.state.cycle,
            dateTime: this.state.dateTime
        });
    }

    processDateTime(){
        getDateTimeFromServer().then(dateTime =>{
        
            let newState = {
                day: dayjs(dateTime).date(),
                month: dayjs(dateTime).month(),
                monthString: getMonthString(dayjs(dateTime).month()),
                year: dayjs(dateTime).year(),
                hour: dayjs(dateTime).format("hh"),
                minutes: dayjs(dateTime).minute(),
                cycle: dayjs(dateTime).format("A"),
                dateTime : dayjs(dateTime).toDate()
            };
          
            Object.assign(newState, {ajaxLoaded: true});
            this.setState(newState);
        }).then(() =>{
            //return data to main component
            this.returnTodayDateTime();
        });
    }
    componentDidMount(){
        //get time from server
        this.processDateTime();
        setInterval(() =>{
            this.processDateTime();
        }, 60000);
    }    

    render(){
        if(this.state.ajaxLoaded){
            //return to the main component
            let stringDate = `${this.state.day} de ${this.state.monthString} de ${this.state.year}`;
            stringDate += " | ";
            stringDate +=  `${this.state.hour}:${(this.state.minutes / 10 < 1) ? `0${this.state.minutes}`:this.state.minutes}${this.state.cycle}`;
            return(
                React.createElement("span", null,stringDate)
            );
        }else{
            return null;
        }
    }
}

module.exports = {
    Timer: Timer,
    DateInput: DateInput,
    TimeInput: TimeInput,
    convert12hTo24h:convert12hTo24h,
    convert24hTo12h:convert24hTo12h,
    getDateTimeFromServer:getDateTimeFromServer,
    calcTimeDifference:calcTimeDifference,
};;