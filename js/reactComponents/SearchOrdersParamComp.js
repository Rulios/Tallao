"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        inputPrevent: "./frontendModules/inputPrevent",
    }
});
define(["react", "inputPrevent"], function(React, inputPrevent){
    
    //All the low components, in charge of just displaying single components
    const Label4Input = ({id, text}) =>{
        return React.createElement("label", {
            htmlFor: id
        }, text);
    };

    const Legend4Div = ({text}) =>{
        return React.createElement("legend", {
            className: "w-auto legendTxt"
        }, text);
    };

    const InputDate = ({id, value,onChange}) =>{
        return React.createElement("input", {
            id: id,
            type: "date",
            value : value,
            onChange: (e) =>{
                if(inputPrevent.isInputDate(e.target.value)){
                    onChange(e.target.value);
                }
            }
        });
    };

    const InputHour = ({id, value,onChange}) =>{
        return React.createElement("input", {
            id: id,
            type: "time",
            value : value,
            onChange: (e) =>{
                if(inputPrevent.isInputTime(e.target.value)){
                    onChange(e.target.value);
                }
            }
        });
    };

    const InputText = ({id, value, onChange}) =>{
        return React.createElement("input", {
            id: id,
            type: "text",
            value : value,
            onChange : (e) =>{
                onChange(e.target.value);
            },
            onKeyPress : (e) =>{
                e.target.value = e.target.value.toUpperCase();
            }
        });
    }

    return{
   
    };

});