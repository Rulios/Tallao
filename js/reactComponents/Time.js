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
                onChange: (e) => {
                    if(inputPrevent.isInputTime(e.target.value)){
                        props.getTime(e.target.value);
                    }
                }
            })
        );
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
            monthString: months[parseInt(arr[2]) -1],
        }
    }

    class Timer extends React.Component{

        constructor(props){
            super(props);
            this.state={
                ajaxLoaded: false
            }
        }

        updateEveryMinute(){
            let timer = setInterval(() =>{
                this.setState(()=>{
                    let returnObj = {};
                    //increment
                    if(this.state.minutes + 1 == 60){
                        returnObj["minutes"] = 0;
                        returnObj["hour12"] = this.state.hour12 + 1;
                    }else{
                        returnObj["minutes"] = this.state.minutes + 1;
                        
                    }

                    //fetchs new date time from server
                    if(returnObj["hour12"] == 12){
                        clearInterval(timer);
                        returnObj["ajaxLoaded"] = false;
                        getDateTimeFromServer().then(obj =>{
                            Object.assign(obj, {ajaxLoaded: true});
                            this.updateEveryMinute();
                            this.setState(obj);
                        });
                        return null;
                    }
                    this.returnTodayDateTime();
                    return returnObj;
                });
            }, 60000);
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
        componentDidMount(){
            //get time from server
            getDateTimeFromServer().then(obj =>{
                this.updateEveryMinute();
                Object.assign(obj, {ajaxLoaded: true});
                Object.assign(obj, splitDate(obj.date));
                this.setState(obj);
            }).then(() =>{
                //return data to main component
                this.returnTodayDateTime();
            });
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
        getDateTimeFromServer:getDateTimeFromServer,
        splitDate:splitDate
    };


});