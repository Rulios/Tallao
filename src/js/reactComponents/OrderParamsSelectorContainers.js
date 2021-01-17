"use strict";

const React = require("react");
const OrderParamsSelectorComp = require("./OrderParamsSelectorComp");

const {getStaticText} = require("../../../translation/frontend/translator");

/* This is a middle order component, responsible for translation
and bundling of low order components */

function MainContainer({
    paramsObj, statusObj, changeHandler, inputsValues,
}){
    //values (obj)
    //changeHandler (obj)
    //handle when one or two date inputs
    let Inputs = [];
    switch (true){
        case ((paramsObj.paramSelected === "dateAssign" || paramsObj.paramSelected === "dateReceive")):
            Inputs.push(
                React.createElement(DateTimeInput, {
                    key: paramsObj.paramSelected,
                    id: paramsObj.paramSelected,
                    values: {
                        date: inputsValues.date.end,
                        time: inputsValues.hour.end
                    },
                    changeHandler: {
                        onDateChange: (value) => changeHandler.onDateChange("end", value),
                        onHourChange: (value) => changeHandler.onHourChange("end", value)
                    }
                })
            );
        break;

        case (paramsObj.paramSelected === "dateRange"):
            Inputs.push(
                React.createElement(DateTimeInput, {
                    key: "StartDateInput",
                    id: "StartDateInput",
                    isDateRange: true,
                    rangeType: "startDate",
                    values: {
                        date: inputsValues.date.start,
                        time: inputsValues.hour.start
                    },
                    changeHandler: {
                        onDateChange: (value) => changeHandler.onDateChange("start", value),
                        onHourChange: (value) => changeHandler.onHourChange("start", value)
                    }
                }),
                React.createElement(DateTimeInput, {
                    key: "EndDateInput",
                    id: "EndDateInput",
                    isDateRange: true,
                    rangeType: "endDate",
                    values: {
                        date: inputsValues.date.end,
                        time: inputsValues.hour.end
                    },
                    changeHandler: {
                        onDateChange: (value) => changeHandler.onDateChange("end", value),
                        onHourChange: (value) => changeHandler.onHourChange("end", value)
                    }
                }),
            ); 
        break;

        case (paramsObj.paramSelected === "orderID"):
            Inputs.push(
                React.createElement(OrderInput,{
                    key:"orderIDInput",
                    id: "orderIDInput",
                    values: inputsValues.order,
                    onBlur: () => changeHandler.onTxtBlur(),
                    onChange: {
                        orderChar:(value) => changeHandler.onOrderChange("char",value),
                        orderNumber:(value) => changeHandler.onOrderChange("number",value),
                    } 
                })
            );
        break;

        case (paramsObj.paramSelected === "customerID"):
            Inputs.push(
                React.createElement(TextInput,{
                    key: "customerIDInput",
                    id: "customerIDInput",
                    value: inputsValues.txt,
                    txtType: "customerID",
                    onChange: (value) => changeHandler.onTxtChange("customerID",value),
                    onBlur: () => changeHandler.onTxtBlur()
                })
            );
        break;
    }
    
    return [
        React.createElement("div", {
            key: "Col1",
            className: "col-lg-4"
        }, 
            React.createElement(paramListSelect, {
                paramsArr: paramsObj.paramList,
                selected: paramsObj.paramSelected,
                onChange: (selected) => changeHandler.onParamSelectedChange(selected)   
            })
        ),

        React.createElement("form", {
            key: "FormParam",
            className: "col-lg-8 paramBoxStyle"
        },
            React.createElement("fieldset", {
                className: "border p-2"
            },
                [
                    React.createElement(OrderParamsSelectorComp.Legend4Div, {
                        key: "Legend4Div",
                        text: getStaticText("paramForSearch")
                    }),
                    React.createElement(SelectStatusInput,{
                        key: "SelectStatusInput",
                        statusArr: statusObj.statusList,
                        selected: statusObj.statusSelected,
                        onChange: (selected) => changeHandler.onStatusSelectedChange(selected)
                    }),
                ],
                Inputs.map(inputField =>{
                    return inputField;
                })
            )            
        )
    ];
    
}

function paramListSelect({paramsArr, selected, onChange}){
    //params (array)
    return [
        React.createElement(OrderParamsSelectorComp.Label4Input, {
            key: "Lbl4ParamList",
            id: "SelectParamList",
            text: getStaticText("searchBy")
        }),
        React.createElement("select", {
            key: "SelectParamList",
            id: "SelectParamList",
            value: selected,
            onChange: (e) => onChange(e.target.value)
        },
            paramsArr.map(parameter =>{
                return React.createElement("option", {
                    key: `OptionParamList${parameter}`,
                    value: parameter
                }, getStaticText(parameter));
            })
        )
    ];
}

function SelectStatusInput({statusArr, selected, onChange}){
    //status (array)
    return [
        React.createElement(OrderParamsSelectorComp.Label4Input, {
            key: "Lbl4StatusInput",
            id: "SelectStatusInput",
            text: getStaticText("status")
        }),
        React.createElement("select", {
            key: "SelectStatusInput",
            id: "SelectStatusInput",
            value: selected,
            onChange: (e) => onChange(e.target.value)
        },
            statusArr.map(status =>{
                return React.createElement("option" ,{
                    key: `OptionStatusInput${status}`,
                    value : status
                }, getStaticText(status))                    
            })
        )
    ];
}

function DateTimeInput({id,rangeType, values, changeHandler, isDateRange}){
    //changeHandler (obj with 2 functions)
    return React.createElement("div", {className: "container"},
        React.createElement("div", {className: "row"},
            [   
                React.createElement("div", {key: `DivDate${id}`, className:"col-xs-12"},
                    [
                        React.createElement(OrderParamsSelectorComp.Label4Input, {
                            key: `LblDate${id}`,
                            id: id,
                            text: (typeof isDateRange !== "undefined") ? getStaticText(rangeType) : getStaticText("date")
                        }),
                        React.createElement(OrderParamsSelectorComp.InputDate, {
                            key: `Date4${id}`,
                            id: `inputDate4${id}`,
                            value: values.date,
                            onChange: (value) =>changeHandler.onDateChange(value)
                        })
                    ]
                ),
                React.createElement("div", {key: `DivTime${id}`,className: "col-xs-12"}, 
                    [
                        React.createElement(OrderParamsSelectorComp.Label4Input, {
                            key: `LblTime${id}`,
                            id: id,
                            text: getStaticText("time")
                        }),
                        React.createElement(OrderParamsSelectorComp.InputTime, {
                            key: `Time4${id}`,
                            id: `inputTime4${id}`,
                            value: values.time,
                            onChange: (value) => changeHandler.onHourChange(value)
                        })
                    ]
                )
            ]
        )
    );
}

function TextInput ({id,txtType, value , onChange, onBlur}) {
    return  React.createElement("div", null, 
            [
                React.createElement(OrderParamsSelectorComp.Label4Input, {
                    key: `LblText${id}`,
                    id: id,
                    text: `${getStaticText(txtType)}:`
                }),
                React.createElement(OrderParamsSelectorComp.InputText,{
                    key: `Text${id}`,
                    id: id,
                    value: value,
                    onChange: (txt) => onChange(txt),
                    onBlur: () => onBlur()
                })
            ]
    );
}

function OrderInput ({id, values , onChange, onBlur}) {
    return  React.createElement("div", null, 
            [
                React.createElement(OrderParamsSelectorComp.Label4Input, {
                    key: `LblText${id}`,
                    id: id,
                    text: `${getStaticText("orderID")}:`
                }),

                React.createElement("div", {
                    key : "OrderInputFields",
                    style:{
                        display:"inline-block"
                    }
                },
                    [
                        React.createElement(OrderParamsSelectorComp.InputText,{
                            key: `Char${id}`,
                            id: `Char4${id}`,
                            value: values.char,
                            isCharInput: true,
                            onChange: (value) => onChange.orderChar(value),
                            onBlur: () => onBlur()
                        }),
                        React.createElement(OrderParamsSelectorComp.InputNumber, {
                            key: `Number${id}`,
                            id: id,
                            value: values.number,
                            onChange: (value) => onChange.orderNumber(value),
                            onBlur: () => onBlur()
                        })
                    ]
                )
                
            ]
    );
}

module.exports = MainContainer;
//example of MainContainer

/* <div class="col-lg-4">
    <label for="selectMetricFunnel">Buscar por:</label>
    <select name="selectMetricFunnel" id="selectMetricFunnel">
        <option value="date-assign" selected>Fecha asignada</option>
        <option value="date-receive">Fecha recibida</option>
        <option value="date-range">Entre dos fechas </option>
        <option value="order-id">Número de Orden (ID)</option>
        <option value="customer-id">Identificación del cliente</option>
    </select>
</div>

<form class="col-lg-8 paramBoxStyle ">

    <fieldset class="border p-2 " id="paramElements">

        <legend class="w-auto legendTxt">Parámetros de la búsqueda</legend>
        
        <div id="divStatusInput" class="">

            <label for="selectInputStatus" >Estado:</label>

            <select  id="selectInputStatus">
                <option value="status-all">Todos los estados</option>
                <option value="status-wait">En espera</option>
                <option value="status-ironing">Planchando</option>
                <option value="status-ready">Listo</option>
                
            </select>
            
        </div>

        

        <div id="divStartDateInput" class="hide container">
            
                <div class="row">
                
                    <div class="col-xs-12">
                        <label for="startDateParamInput" >Fecha:</label>
                        <input type="date"  id="startDateParamInput">
                    </div>
                
                    <div class="col-xs-12">
                        <label for="startHourParamInput">Hora:</label>
                        <input type="time"  id="startHourParamInput">
                    </div>    

                </div>        
        </div>

        <div id="divEndDateInput" class="hide container">
            
            <div class="row">
            
                <div class="col-xs-12">
                    <label for="endDateParamInput">Fecha:</label>
                    <input type="date"  id="endDateParamInput">
                </div>
            
                <div class="col-xs-12">
                    <label for="endHourParamInput">Hora:</label>
                    <input type="time"  id="endHourParamInput">
                </div>    

            </div>        
        </div>

        <div id="divTxtInput" class="">
            <label for="txtParamInput">Número de orden:</label>
            <div style="display:inline-block">
                <input type="text" style="width:2em">
                <input class="inputTxtParamSearch" type="number" id="txtParamInput">
            </div>
            
        </div>


    </fieldset>

</form> */