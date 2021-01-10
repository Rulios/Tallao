// main.js
"use strict";

const React = require("react");
const inputPrevent = require("../frontendModules/inputPrevent");
const {fetchDateTimeServer} = require("../ajax-requests/server-time");
const dayjs = require("dayjs");
const {getStaticText} = require("../translation/translator");

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

async function getDateTimeFromServer(){
    //format from server: YYYY/MM/DD
    try{
        let {data: {dateTime}} = await fetchDateTimeServer();
        return dateTime;
    }catch(err){console.error(err);}
}

function getMonthString(monthIndex){
    const months = [
        "january", "february", "march", "april", "may", "june",
        "july", "august", "september", "october", "november", "december"
    ];
    return getStaticText(months[monthIndex]);
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
            let stringDate = `
                ${this.state.day} ${getStaticText("of")} ${this.state.monthString} ${getStaticText("of")} ${this.state.year}
            `;
            
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
    getDateTimeFromServer:getDateTimeFromServer,
    calcTimeDifference:calcTimeDifference,
};;