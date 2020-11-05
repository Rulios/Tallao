"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        inputPrevent: "./frontendModules/inputPrevent",
    }
});
define(["react", "inputPrevent"], function(React, inputPrevent){
    
    //All the low components, in charge of just displaying single components

    const CloseMessageButton = ({onClick}) =>{
        return React.createElement("button",{
            className: "closeButtonStyle",
            onClick: () => {onClick();}
        }, "x");
    };

    const TitleDiv = ({text}) =>{
        return React.createElement("div", {
            className: "titleTxt text-center oneEMSeparation"
        }, text);
    };

    const LabelForInput = ({text, inputID}) =>{
        return React.createElement("label", {
            htmlFor: `${inputID}`
        }, text);
    };

    const TextInput = ({value, id, placeholder, onChange}) =>{
        return React.createElement("input", {
            type: "text",
            className: "inputMessageTagStyle",
            placeholder: placeholder,
            id: id,
            value: value,
            onChange: (e) =>{
                onChange(e.target.value);
            }
        });
    };

    const ColorInput = ({id, value, onChange}) =>{
        return React.createElement("input" ,{
            type:"color",
            value: value,
            id: id,
            className: "floatRight",
            onChange: (e) =>{
                if(inputPrevent.isHexColor(e.target.value)){
                    onChange(e.target.value);
                }
            }
        });
    };

    const TextArea = ({value, id, placeholder, onChange}) =>{
        return React.createElement("textarea", {
            id: id,
            value: value,
            placeholder: placeholder,
            className: "customTextAreaStyle",
            onChange: (e) =>{
                onChange(e.target.value);
            }
        });
    };

    const ColorDiv = ({color}) =>{
        return React.createElement("div", {
            style: {
                width: "100%",
                height: "2px",
                backgroundColor: color                
            }
        });
    };

    const AddNewMessageButton = ({text, onClick}) =>{
        return React.createElement("button", {
            className: "bold buttonAddCustomMessage",
            onClick: () =>{onClick();}
        }, text);
    };

    const submitButton = ({text,onClick}) =>{
        return React.createElement("button", {
            className: "submitButtonUpdateMessages",
            onClick: () =>{onClick();}
        }, text);
    }

    return{
        TitleDiv:TitleDiv,
        CloseMessageButton: CloseMessageButton,
        submitButton: submitButton,
        LabelForInput:LabelForInput,
        TextInput: TextInput,
        ColorInput: ColorInput,
        TextArea:TextArea,
        ColorDiv:ColorDiv,
        AddNewMessageButton:AddNewMessageButton
    };

});