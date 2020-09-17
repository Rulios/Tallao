"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development',
        OrderParamsSelectorContainers: "./reactComponents/OrderParamsSelectorContainers",
        Time: "./reactComponents/Time"
    }
});
define(["react", "react-dom","Time","OrderParamsSelectorContainers"], 
function(React, ReactDOM,Time,OrderParamsSelectorContainers){

    /* This is the high order component, this is where AJAX requests performs
    Controls all the outputs */
     
    class SearchOrderSection extends React.Component{
        _todayDate;

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
                    "all", "wait", "processing", "ready"
                ],
                txtInput: "",
                dateInput: {
                    startDate: "",
                    endDate: ""
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
            this.setState({dateInput: newDate});
        }

        hourInputHandler(field, value){
            let newHour = JSON.parse(JSON.stringify(this.state.hourInput));
            newHour[field] = value;
            this.setState({hourInput: newHour});
        }

        txtInputHandler(value) {
            this.setState({txtInput: value});
        }

        orderInputHandler(field, value){
            let newOrderParam = JSON.parse(JSON.stringify(this.state.orderInput));
            if(field === "char")
                value = value.toUpperCase();
            newOrderParam[field] = value;
            this.setState({orderInput: newOrderParam});
        }

        returnData(newState){
            this.props.getSearchParams({
                searchParams:{
                    paramSelected: newState.paramSelected,
                    statusSelected: newState.statusSelected,
                },
                inputsParams: {
                    txtInput: newState.txtInput,
                    dateInput: newState.dateInput,
                    hourInput: newState.hourInput,
                    orderInput: newState.orderInput
                }
            });
        }

        componentDidMount(){
            Time.getDateTimeFromServer().then(timeObj =>{
                let newDate = JSON.parse(JSON.stringify(this.state.dateInput));
                newDate["startDate"] = timeObj.date;
                newDate["endDate"] = timeObj.date;
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

    return SearchOrderSection;
});

