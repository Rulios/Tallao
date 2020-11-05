// main.js
require.config({
    // module name mapped to CDN url
    paths: {
        // Require.js appends `.js` extension for you
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development',
        inputPrevent: "./frontendModules/inputPrevent",
        ajaxReqTime: "../js/requestsModules/ajaxReqServerTime"
    }
});

define(["react", "react-dom", "ajaxReqTime", "inputPrevent"],
function(React, ReactDOM, ajaxReq, inputPrevent){


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
        let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;
        let objDiff  = {
        days: 0,
        hours : 0,
        minutes: 0,
        timeStatus : "" //Two values, past or future.
                        //To determine if a order date assign is on the past or on the future
        };
        /* console.log(dateFuture);
        console.log(dateNow);
        console.log(diffInMilliSeconds); */
        // calculate days
        const days = Math.floor(diffInMilliSeconds / 86400);
        diffInMilliSeconds -= days * 86400;
       // console.log('calculated days', days);

        // calculate hours
        const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
        diffInMilliSeconds -= hours * 3600;
       // console.log('calculated hours', hours);

        // calculate minutes
        const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
        diffInMilliSeconds -= minutes * 60;
        //console.log('minutes', minutes);

        objDiff.timeStatus = ((dateFuture - dateNow) < 0) ? "past": "future";

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
            let query = await ajaxReq.fetchDateTimeServer();
            let dateTime = JSON.parse(query);
            let newObj = {};
            //convert NaN to uppecase, and numbers char to number
            Object.keys(dateTime).map(timeProp =>{
                if(!isNaN(dateTime[timeProp])){
                    newObj[timeProp] = parseInt(dateTime[timeProp]);
                }else{
                    newObj[timeProp] = dateTime[timeProp].toUpperCase();
                }
            });
            return newObj;
        }catch(err){console.error(err);}
    }

    function splitDate(dateString){
        //returns a object with day, month, monthString, year
        //from string format YYYY/MM/DD
        const months = [
            "enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];
        let arr = dateString.split("-");
        return{
            year: parseInt(arr[0]),
            month: parseInt(arr[1]),
            day: parseInt(arr[2]),
            monthString: months[parseInt(arr[1]) -1],
        };
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
                hour: this.state.hour12,
                minutes: this.state.minutes,
                cycle: this.state.cycle
            });
        }

        processDateTime(){
            getDateTimeFromServer().then(obj =>{
                Object.assign(obj, {ajaxLoaded: true});
                Object.assign(obj, splitDate(obj.date));
                this.setState(obj);
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
                stringDate +=  `${this.state.hour12}:${(this.state.minutes / 10 < 1) ? `0${this.state.minutes}`:this.state.minutes}${this.state.cycle}`;
                return(
                    React.createElement("span", null,stringDate)
                );
            }else{
                return null;
            }
        }
    }

    return{
        Timer: Timer,
        DateInput: DateInput,
        TimeInput: TimeInput,
        convert12hTo24h:convert12hTo24h,
        convert24hTo12h:convert24hTo12h,
        getDateTimeFromServer:getDateTimeFromServer,
        splitDate:splitDate,
        calcTimeDifference:calcTimeDifference,
    };


});