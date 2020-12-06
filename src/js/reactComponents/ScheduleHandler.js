"use strict";

const React = require("react");
const ScheduleBoxContainer = require("./ScheduleBoxContainers");
const ajaxReqLaundryConfigs = require("../requestsModules/ajaxReqLaundryConfigs");

/* This is the high order component, this is where AJAX requests performs
Controls all the outputs */

const daysEs = {
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo"
};

async function getSchedule(){
    try {
        let {data: {schedule}} = await ajaxReqLaundryConfigs.fetchSchedule();
        return schedule;
    }catch(err){console.error(err);}
}

class Schedule extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            days: {
                monday: {startHour: "", endHour: ""},
                tuesday: {startHour: "", endHour: ""},
                wednesday: {startHour: "", endHour: ""},
                thursday: {startHour: "", endHour: ""},
                friday: {startHour: "", endHour: ""},
                saturday: {startHour: "", endHour: ""},
                sunday: {startHour: "", endHour: ""},
            }
        };  

    }

    onChangeSchedule(day, value, cycle){
        let prevDays = JSON.parse(JSON.stringify(this.state.days));
        prevDays[day][cycle] = value;
        console.log(prevDays);
        this.setState({
            days: prevDays
        });
    }

    updateSchedule(){
        ajaxReqLaundryConfigs.updateSchedule(this.state.days)
        .then(({status}) =>{
            if(status === 200){
                ScheduleBoxContainer.SuccessMessage();
            }
        }).catch(err =>{
            console.error(err);
        })
    }

    componentDidMount(){
        if(this.props.mode === "edit"){ 
            //fetch data
            getSchedule().then((schedule) =>{
                this.setState({
                    days: schedule
                });
            });
        }
    }

    render(){
        let el2Render = [];
        if(this.props.mode === "edit"){
            el2Render = Object.keys(this.state.days).map(day =>{
                return React.createElement(ScheduleBoxContainer.EditBox, {
                    key: `editDay${day}`,
                    idDay: day,
                    time: this.state.days[day],
                    onChangeSchedule: (day, value, cycle) =>{this.onChangeSchedule(day, value, cycle);}
                });
            });
            
            el2Render.push(//push the update schedule btn
                React.createElement(ScheduleBoxContainer.UpdateScheduleButton,{
                    key: "UpdateScheduleBtn",
                    status:"",
                    onClick: () => this.updateSchedule()
                })
            );

        }else if(this.props.mode === "use"){

        }
        
        return el2Render;
    }
}


module.exports =  Schedule;

