"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        inputPrevent: "./frontendModules/inputPrevent",
    }
});
define(["react", "inputPrevent"], function(React, inputPrevent){
    
    //All the low components, in charge of just displaying single components

    const DayTitle = ({dayTxt}) =>{
        return React.createElement("div", {
            className: "titleTxt"
        }, dayTxt);
    };

    const InputTimeDay = ({id, text, value, onChange}) => {
        return [
            React.createElement("label", {
                key: `label4${id}`,
                htmlFor: id
            }, text),
            React.createElement("input", {
                key: `inputTime4${id}`,
                id: id,
                type: "time",
                className: "floatRight",
                value: value,
                onChange: (e) =>{
                    if(inputPrevent.isInputTime(e.target.value)){
                        onChange(e.target.value);
                    }
                }
            })
        ];
    };

    const submitButton = ({text,onClick}) =>{
        return React.createElement("button", {
            className: "submitButtonActualize1",
            onClick: () =>{onClick();}
        }, text);
    }

    return{
        DayTitle: DayTitle,
        InputTimeDay: InputTimeDay,
        submitButton: submitButton
    };

});