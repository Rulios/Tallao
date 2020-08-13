// main.js
require.config({
    // module name mapped to CDN url
    paths: {
        // Require.js appends `.js` extension for you
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development',
        ajaxReqTime: "../js/requestsModules/ajaxReqServerTime"
    }
});

define(["react", "react-dom", "ajaxReqTime"],
function(React, ReactDOM, ajaxReq){


    function DateInput(props){
        //props: 
        //min (DateInput format) - specify the min limit of input
        //onChange (event)
        return(
            React.createElement("input",{
                type:"date",
                min: props.min,
                className: props.className,
                onChange: (e) => {props.getDate(e);}
            })
        )
    }

    function TimeInput(props){
        //props: 
        //min (DateInput format) - specify the min limit of input
        //onChange (event)
        return(
            React.createElement("input",{
                type:"time",
                min: props.min,
                className: props.className,
                onChange: (e) => {props.getTime(e);}
            })
        )
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
                        this.updateDateTime().then(obj =>{
                            Object.assign(obj, {ajaxLoaded: true});
                            this.updateEveryMinute();
                            this.setState(obj);
                        });
                        return null;
                    }
                    
                    return returnObj;
                });
            }, 60000);
        }
        
        splitDate(dateString){
            //returns a object with day, month, monthString, year
            const months = [
                "enero", "febrero", "marzo", "abril", "mayo", "junio",
                "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
            ];
            let arr = dateString.split("/");
            return{
                day: parseInt(arr[0]),
                month: parseInt(arr[1]),
                monthString: months[parseInt(arr[1]) -1],
                year: parseInt(arr[2])
            }
        }

        async updateDateTime(){
            try{
                let query = await ajaxReq.fetchDateTimeServer();
                let dateTime = JSON.parse(query);

                let newObj = {};
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

        returnTodayDate(){
            return this.props.getTodayDate({
                day: this.state.day,
                month: this.state.month,
                year: this.state.year
            });
        }
        componentDidMount(){
            //get time from server
            this.updateDateTime().then(obj =>{
                this.updateEveryMinute();
                Object.assign(obj, {ajaxLoaded: true});
                Object.assign(obj, this.splitDate(obj.date));
                this.setState(obj);
            }).then(() =>{
                //return data to main component
                this.returnTodayDate();
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
        TimeInput: TimeInput
    };


});