"use strict";

const React = require("react");
const {useState, useEffect} = React;
const dayjs = require("dayjs");
const cloneDeep = require("lodash.clonedeep");

const SEARCH_ORDER_PARAMS = require("../../../meta/SEARCH_ORDER_PARAMS");
const ORDER_STATUS = require("../../../meta/ORDER_STATUS");

const {HTML_DATE_FORMAT, HTML_TIME_FORMAT_UNTIL_MINUTES} = require("../../../meta/DATE_TIME_FORMATS");

const {getStaticText} = require("../../../translation/frontend/translator");


module.exports = function SearchOrderBox({
        userType, paramProps, inputs, onChange
    }){

    const SEARCH_PARAM_LIST = SEARCH_ORDER_PARAMS[userType];
    const STATUS_LIST = ["all", ...ORDER_STATUS];

    const [searchParamProps, setSearchParamProps] = useState(paramProps);
    const [searchInputs, setSearchInputs] = useState(inputs);

    useEffect(() => {
        onChange({
            paramProps: searchParamProps,
            inputs: searchInputs
        });
    }, [searchParamProps, searchInputs]);

    return (
        <div className="row supTxt-TitleTxt-Separation centerOnXs">
            <div className="col-lg-4">

                <label htmlFor="SelectParamList">{getStaticText("searchBy")}</label>

                <select id="SelectParamList" 
                onChange={(e) => {
                    let newSearchParamProps = cloneDeep(searchParamProps);
                    newSearchParamProps.paramSelected = e.target.value;
                    setSearchParamProps(newSearchParamProps);
                }}>
                    {SEARCH_PARAM_LIST.map(parameter => {
                        return <option key={`SearchParam-${parameter}`} value={parameter}>{getStaticText(parameter)}</option>
                    })}
                </select>
            </div>

            <form className="col-lg-8 paramBoxStyle">
                <fieldset className="border p-2">
                    <legend className="w-auto legendTxt">{getStaticText("paramForSearch")}</legend>

                    <label className="small-rightMargin" htmlFor="OrderStatusSelector">
                        {getStaticText("status")}
                    </label>

                    <select id="OrderStatusSelector" 
                    onChange={(e) => {
                        const newSearchParamProps = cloneDeep(searchParamProps);
                        newSearchParamProps.statusSelected = e.target.value;
                        setSearchParamProps(newSearchParamProps);
                    }}>
                        {
                            STATUS_LIST.map(status => {
                                return <option key={`${status}Status`} value={status}>{getStaticText(status)}</option>
                            })
                        }
                    </select>

                    <SearchInputFields 
                        paramSelected={searchParamProps.paramSelected} 
                        inputs={searchInputs}
                        setInputs={setSearchInputs}
                    />

                </fieldset>
            </form>
        </div>
    );  
}

function SearchInputFields({paramSelected, inputs, setInputs}){

    let InputComponents = [];

    switch(true){
        case paramSelected === "dateAssign" || paramSelected === "dateReceive":
            InputComponents.push(
                <DateTimeInput rangeType={paramSelected} key={`${paramSelected}SingleDateTimeInput`}
                    customDateText={paramSelected}
                    dateTime={inputs.dateTime.end}
                    onChange={(dateTime) => {
                        const newInputs = cloneDeep(inputs);
                        newInputs.dateTime["end"] = dateTime;
                        setInputs(newInputs);
                    }}
                />
            );
        break;

        case paramSelected === "dateRange":
            InputComponents.push(
                <DateTimeInput rangeType="startDate" key="DateRangeStartDateTimeInput"
                    customDateText="startDate"
                    dateTime={inputs.dateTime.start}
                    onChange={(dateTime) => {
                        const newInputs = cloneDeep(inputs);
                        newInputs.dateTime["start"] = dateTime;
                        setInputs(newInputs);
                    }}
                />,

                <DateTimeInput rangeType="endDate" key="DateRangeEndDateTimeInput"
                    customDateText="endDate"
                    dateTime={inputs.dateTime.end}
                    onChange={(dateTime) => {
                        const newInputs = cloneDeep(inputs);
                        newInputs.dateTime["end"] = dateTime;
                        setInputs(newInputs);
                    }}
                />
            );
        break;

        case paramSelected === "orderID":
            InputComponents.push(
                <OrderIDInput id="SearchOrderBox" key="OrderIDSearchInput"
                    orderID={{...inputs.order}}
                    onChange={(orderID) => {
                        const newInputs = cloneDeep(inputs);
                        newInputs.order = {...orderID}
                        setInputs(newInputs);
                    }}
                />
            );
        break;

        case paramSelected === "customerID":
            InputComponents.push(
                <TextInput id="SearchOrderBox" key="CustomerIDSearchInput"
                    customText="customerID"
                    value={inputs.txt}
                    onChange={(customerID) => {
                        const newInputs = cloneDeep(inputs);
                        newInputs.txt = customerID.toUpperCase();
                        setInputs(newInputs);
                    }}
                />
            );
        break;
    }

    return InputComponents;
}

function DateTimeInput({customDateText, rangeType, dateTime, 
        onChange}){

    return (
        <div className="container">
            <div className="row">

                <div className="col-xs-12">
                    <label htmlFor={`${rangeType}DateInput`} className="small-rightMargin">
                        {getStaticText(customDateText) ?? getStaticText("date")}
                    </label>

                    <input type="date" 
                        value={dayjs(dateTime).format(HTML_DATE_FORMAT)} 
                        onChange={(e) => {
                            let newDateTime = dayjs(dateTime);
                            let selectedDate = dayjs(e.target.value);

                            newDateTime = newDateTime.set("year", selectedDate.year());
                            newDateTime = newDateTime.set("month", selectedDate.month());
                            newDateTime = newDateTime.set("day", selectedDate.day());

                            onChange(newDateTime.format());
                        }}/>
                </div>

                <div className="col-xs-12">
                    <label htmlFor={`${rangeType}TimeInput`} className="small-rightMargin">
                        {getStaticText("time")}
                    </label>

                    <input type="time" 
                        value={dayjs(dateTime).format(HTML_TIME_FORMAT_UNTIL_MINUTES)} 
                        onChange={(e) => {
                            let newDateTime = dayjs(dateTime);
                            const [hour, minute] = e.target.value.split(":");

                            newDateTime = newDateTime.set("hour", hour);
                            newDateTime = newDateTime.set("minute", minute);
                            
                            onChange(newDateTime.format());
                        }}
                    />
                </div>

            </div>
        </div>
    );
}

function TextInput({id, customText, value, onChange}){

    const [textValue, setTextValue] = useState(value);

    return (
        <div>
            <label htmlFor={`${id}TextInput`} className="small-rightMargin">{getStaticText(customText)}</label>
            <input id={`${id}TextInput`} value={textValue} 
                onChange={(e) => {
                    setTextValue(e.target.value.toUpperCase())
                }}
                onBlur={(e) => {
                    onChange(textValue);
                }}
            />
        </div>
    );
}

function OrderIDInput({id, orderID: {char, number}, onChange}){

    const [idChar, setIDChar] = useState(char);
    const [idNumber, setIDNumber] = useState(number);

    const returnOrderID = () => {
        onChange({char: idChar, number: idNumber});
    };

    return (
        <div>
            <label htmlFor={`${id}OrderInput`} className="small-rightMargin">
                {getStaticText("orderID")}
            </label>

            <div style={{display: "inline-block"}} className="small-rightMargin">

                <input type="text" value={idChar} id={`${id}OrderIDCharInput`}
                    maxLength="7"
                    style={{width:"2em"}}
                    onChange={(e) => {
                        setIDChar(e.target.value.toUpperCase());
                    }}
                    onBlur={(e) => returnOrderID()}
                />

                <input type="number" value={idNumber} id={`${id}OrderIDNumberInput`}
                    onChange={(e) => setIDNumber(e.target.value.toUpperCase())}
                    onBlur={(e) => returnOrderID()}
                />
            </div>
        </div>
    );  
}
