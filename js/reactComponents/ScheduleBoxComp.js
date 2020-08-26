"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
    }
});
define(["react"], function(React){
    
    //All the low components, in charge of just displaying single components

    const DayTitle = ({day}) =>{
        return React.createElement("div", {
            className: "titleTxt"
        });
    };

    const InputTimeDay = ({id, text, value}) => {
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
                value: value
            })
        ];
    };

    return{
        DayTitle: DayTitle,
        InputTimeDay: InputTimeDay
    };

});