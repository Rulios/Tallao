"use strict";

const React = require("react");
const OrderParamsSelectorContainers = require("./OrderParamsSelectorContainers");
const Time = require("./Time");

/* This is the high order component, this is where AJAX requests performs
    Controls all the outputs */
     
class SearchOrderSection extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            paramSelected : "dateAssign",
            paramList: [
                "dateAssign", "dateReceive",
                "dateRange", "orderID", "customerID"
            ],
            statusSelected:"all",
            statusList: [
                "all", "wait", "processing", "ready", "retired"
            ],
            txtInput: "",
            dateInput: {
                start: "",
                end: ""
            },
            hourInput: {
                startHour: "00:00",
                endHour: "23:59"
            },
            orderInput: {
                char: "A",
                number: 1
            }
        };
    }

    paramSelectHandler(paramSelected){
        this.setState({
            paramSelected: paramSelected
        });
    }

    orderStatusSelectHandler(statusSelected){
        this.setState({statusSelected: statusSelected});
    }

    dateInputHandler(field, value){
        let newDate = JSON.parse(JSON.stringify(this.state.dateInput));
        newDate[field] = value;
        this.setState({date: newDate});
    }

    hourInputHandler(field, value){
        let newHour = JSON.parse(JSON.stringify(this.state.hourInput));
        newHour[field] = value;
        this.setState({hour: newHour});
    }

    txtInputHandler(value) {
        this.setState({txt: value});
    }

    orderInputHandler(field, value){
        let newOrderParam = JSON.parse(JSON.stringify(this.state.orderInput));
        if(field === "char") value = value.toUpperCase();
        newOrderParam[field] = value;
        this.setState({order: newOrderParam});
    }

    returnData(newState){
        this.props.getSearchParams({
            searchParams:{
                paramSelected: newState.paramSelected,
                statusSelected: newState.statusSelected,
            },
            inputsParams: {
                txt: newState.txtInput,
                date: newState.dateInput,
                hour: newState.hourInput,
                order: newState.orderInput
            }
        });
    }

    componentDidMount(){
        Time.getDateTimeFromServer().then(timeObj =>{
            let newDate = JSON.parse(JSON.stringify(this.state.dateInput));
            newDate["start"] = timeObj.date;
            newDate["end"] = timeObj.date;
            this.setState({dateInput: newDate});
        });
    }

    shouldComponentUpdate(newProps, newState){
        /*  console.log(this.state !== newState);
        console.log(this.props !== newProps); */
        if(this.state !== newState){
            this.returnData(newState);
            return true;
        }else{
            return false;
        }
    }

    render(){
        return React.createElement(OrderParamsSelectorContainers.MainContainer,{
            paramsObj: {
                paramSelected: this.state.paramSelected,
                paramList: this.state.paramList,
            },
            statusObj: {
                statusSelected: this.state.statusSelected,
                statusList: this.state.statusList,
            },
            changeHandler: {
                onParamSelectedChange: (selected) => this.paramSelectHandler(selected),
                onStatusSelectedChange: (selected) => this.orderStatusSelectHandler(selected),
                onDateChange:(field,value) =>this.dateInputHandler(field, value),
                onHourChange:(field, value) => this.hourInputHandler(field, value),
                onTxtChange: (value) => this.txtInputHandler(value),
                onOrderChange: (field, value) => this.orderInputHandler(field, value)
            },
            inputsValues: {
                orderInput: this.state.orderInput,
                txtInput: this.state.txtInput,
                dateInput: this.state.dateInput,
                hourInput: this.state.hourInput
            }
        })
    }
}

module.exports = SearchOrderSection;