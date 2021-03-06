"use strict";

const React = require("react");
const OrderParamsSelector = require("./OrderParamsSelectorContainers");
const dayjs = require("dayjs");
const Time = require("./Time");


/* This is the high order component, this is where AJAX requests performs
    Controls all the outputs */
     
class SearchOrderSection extends React.Component{

    constructor(props){

        /* 
            This component receives as props userType(string)
            and getSearchParams(params)
        */

        super(props);

        const PARAM_LIST = {
            laundry: ["dateAssign", "dateReceive",
                        "dateRange", "orderID", "customerID"],
            user: ["dateAssign", "dateReceive",
                "dateRange", "orderID"]
        };  

        this.state = {
            paramSelected : "dateAssign",
            paramList: PARAM_LIST[this.props.userType],
            statusSelected:"all",
            statusList: [
                "all", "wait", "processing", "ready", "retired"
            ],
            txt: "",
            date: {
                start: "",
                end: ""
            },
            hour: {
                start: "00:00",
                end: "23:59"
            },
            order: {
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
        let newDate = JSON.parse(JSON.stringify(this.state.date));
        newDate[field] = value;
        this.setState({date: newDate});
    }

    hourInputHandler(field, value){
        let newHour = JSON.parse(JSON.stringify(this.state.hour));
        newHour[field] = value;
        this.setState({hour: newHour});
    }

    txtInputHandler(field,value) {
        if(field === "customerID") value = value.toUpperCase();
        this.setState({txt: value});
    }

    onTxtBlurHandler() {   
        this.returnData(this.state);
    }

    orderInputHandler(field, value){
        let newOrderParam = JSON.parse(JSON.stringify(this.state.order));
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
                txt: newState.txt,
                date: newState.date,
                hour: newState.hour,
                order: newState.order
            }
        });
    }

    componentDidMount(){
        Time.getDateTimeFromServer().then(dateTime =>{
            let newDate = JSON.parse(JSON.stringify(this.state.date));
            //set both dates to the same date, so it can show 
            //orders from only one date
            newDate["start"] = dayjs(dateTime).format("YYYY-MM-DD");
            newDate["end"] = dayjs(dateTime).format("YYYY-MM-DD");
            this.setState({date: newDate});
        });
    }

    shouldComponentUpdate(newProps, newState){

        let {hour: prevHour, date: prevDate, 
            paramSelected: prevParamSelected, 
            statusSelected: prevStatusSelected} = this.state;

        let {hour: newHour, date: newDate, 
            paramSelected: newParamSelected,
            statusSelected: newStatusSelected} = newState;

        let hasParamSelectedChanged = prevParamSelected !== newParamSelected;
        let hasStatusSelectedChanged = prevStatusSelected !== newStatusSelected;
        let hasHourChanged = prevHour !== newHour;
        let hasDateChanged = prevDate !== newDate;

        let shouldReturnData = (
            hasParamSelectedChanged || hasStatusSelectedChanged || hasHourChanged || hasDateChanged
        );
        
        if(shouldReturnData){
            this.returnData(newState);
        }

        if(this.state === newState) return false;
        return true;
    }

    render(){
        return React.createElement(OrderParamsSelector,{
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
                onTxtChange: (field, value) => this.txtInputHandler(field, value),
                onTxtBlur: () =>this.onTxtBlurHandler(),
                onOrderChange: (field, value) => this.orderInputHandler(field, value)
            },
            inputsValues: {
                order: this.state.order,
                txt: this.state.txt,
                date: this.state.date,
                hour: this.state.hour
            }
        })
    }
}

module.exports = SearchOrderSection;