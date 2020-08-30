"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development',
        ScheduleBoxContainer: "./reactComponents/ScheduleBoxContainers",
        ajaxReqSuperUserConfigs: "./requestsModules/ajaxReqSuperUserConfigs",
    }
});
define(["react", "react-dom","ScheduleBoxContainer", "ajaxReqSuperUserConfigs"], 
function(React, ReactDOM,ScheduleBoxContainer, ajaxReq){

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
            let query = await ajaxReq.fetchSchedule();
            return query;
        }catch(err){console.error(err);}
    }
    
    function renderUpdateButton({status, onClick}){ 
        ReactDOM.render(
            React.createElement(ScheduleBoxContainer.UpdateScheduleButton,{
                onClick: () =>{onClick();}
            }),
            document.getElementById("UpdateScheduleButtonContainer")
        );
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
            ajaxReq.updateSchedule(JSON.stringify(this.state.days))
            .then(response =>{
                if(response === "OK"){
                    ScheduleBoxContainer.SuccessMessage();
                }
            }).catch(err =>{
                console.error(err);
            })
        }

        componentDidMount(){
            if(this.props.mode === "edit"){ 
                //render update button
                renderUpdateButton({
                    status: "", 
                    onClick: () => {this.updateSchedule();}
                });
                //fetch data
                getSchedule().then(ScheduleJSON =>{
                    let fetchedSchedule = JSON.parse(ScheduleJSON);
                    this.setState({
                        days: fetchedSchedule
                    });
                });
            }
        }

        render(){
            let that = this;
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
            }else if(this.props.mode === "use"){

            }
      
            return el2Render;
        }
    }


    return Schedule;
});

