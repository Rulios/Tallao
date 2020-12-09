"use strict";

const React = require("react");
const EditCustomMessagesComp = require("./EditCustomMessagesComp");

/* This is a middle order component, responsible for translation
and bundling of low order components */
const textEs = {
    tagTxt: "Etiqueta:",
    tagPlaceholder: "algo rápido...",
    colorTxt: "Color:",
    messageTxt: "Texto:",
    messageTxtPlaceholder: "texto...",
    addNewMessage: "+ Añadir un nuevo mensaje personalizado",
    updateSuccess: "¡Mensajes actualizados!",
    update: "Actualizar Mensajes Personalizados",
    updateError: "ERROR AL ACTUALIZAR MENSAJES"
};

function AddNewMessageButton({onClick}) {
    return [
        React.createElement("div", {key: "divAddNewMessage1", className:"col-lg-4"}),
        React.createElement("div", {
            key: "divAddNewMessage2", 
            className:"col-lg-4",
            style:{
                paddingRight: "3em",
                paddingLeft :"3em"
            }
        },
            React.createElement(EditCustomMessagesComp.AddNewMessageButton, {
                text: textEs.addNewMessage,
                onClick: () => {onClick();}
            })
        )
    ];
}

//this function uses hooks
function EditCustomMessageBox({messageDetails, inputHandlers}){
    //messageObj contains tag, color_tag, message, status (not in use right now)
    const [isHover, setHover] = React.useState(false);
    return React.createElement("div", {
        className: "col-lg-4 smallMarginBottom ",
        style: {
            padding: "1em",
            transitionDuration: "0.3s",
            boxShadow: (isHover) ? `0 1px 4px ${messageDetails.color_tag}, 0 0 30px 2px ${messageDetails.color_tag} `: ""
        },
        onMouseOver: () =>{
            setHover(true);
        },
        onMouseOut: () =>{
            setHover(false);
        }
    },
        [
            React.createElement(EditCustomMessagesComp.CloseMessageButton,{
                key: `CloseMessageButton4${messageDetails.id}`,
                onClick: () => inputHandlers.deleteMessage(messageDetails.id)
            }),
            React.createElement(EditCustomMessagesComp.TitleDiv, {
                key: `TitleDiv4${messageDetails.id}`,
                text: messageDetails.tag
            }),
            React.createElement(EditCustomMessagesComp.ColorDiv, {
                key: `ColorDiv4${messageDetails.id}`,
                color: messageDetails.color_tag
            }),
            [
                MessageDetailsDiv({
                    messageDetails: messageDetails,
                    inputHandlers: inputHandlers
                })
            ]
        ]
    )
}

function MessageDetailsDiv({messageDetails, inputHandlers}){
    return [
        React.createElement("div", {
            key: `Details4${messageDetails.id}`,
            className: "oneEMSeparation"
        },
            [
                React.createElement(EditCustomMessagesComp.LabelForInput, {
                    key: `Lbl4InputTag4${messageDetails.id}`,
                    text: textEs.tagTxt,
                    inputID: `inputTag4${messageDetails.id}`
                }),
                React.createElement(EditCustomMessagesComp.TextInput, {
                    key: `inputTag4${messageDetails.id}`,
                    id: `inputTag4${messageDetails.id}`,
                    value: messageDetails.tag,
                    placeholder: textEs.tagPlaceholder,
                    onChange: (value)  =>{inputHandlers.onChangeTag(messageDetails.id,value);}
                }),
                React.createElement("br", {key: `BrTag${messageDetails.id}`}),
                React.createElement(EditCustomMessagesComp.LabelForInput, {
                    key: `Lbl4InputColor4${messageDetails.id}`,
                    text: textEs.colorTxt,
                    inputID: `inputColor${messageDetails.id}`
                }),
                React.createElement(EditCustomMessagesComp.ColorInput, {
                    key: `inputColor${messageDetails.id}`,
                    id: `inputColor${messageDetails.id}`,
                    value: messageDetails.color_tag,
                    onChange: (value)  =>{inputHandlers.onChangeColorTag(messageDetails.id,value);}
                }),
                React.createElement("br", {key: `BrColor${messageDetails.id}`}),
                React.createElement(EditCustomMessagesComp.LabelForInput, {
                    key: `Lbl4InputMsgTxt4${messageDetails.id}`,
                    text: textEs.messageTxt,
                    inputID: `inputMsgTxt4${messageDetails.id}`
                }),
                React.createElement(EditCustomMessagesComp.TextArea, {
                    key: `inputMsgTxt4${messageDetails.id}`,
                    id: `inputMsgTxt4${messageDetails.id}`,
                    value: messageDetails.message,
                    placeholder: textEs.messageTxtPlaceholder,
                    onChange: (value)  =>{inputHandlers.onChangeMessage(messageDetails.id,value);}
                }),
            ]
        )
    ];  
};

function UpdateElementsPriceButton ({onClick}){
    return React.createElement(EditCustomMessagesComp.submitButton, {
        text: textEs.update,
        onClick: () =>{onClick();}
    });
}

function SuccessMessage(){
    alert(textEs.updateSuccess);
}

function ErrorMessage(){
    alert(textEs.updateError);
}

module.exports = {
    AddNewMessageButton:AddNewMessageButton,
    EditBox: EditCustomMessageBox,
    UpdateElementsPriceButton: UpdateElementsPriceButton,
    SuccessMessage: SuccessMessage,
    ErrorMessage:ErrorMessage
};

//example of EditCustomMessageBox

/* <div class="col-lg-4 smallMarginBottom hoverCustomColorShadow">
    <button class="closeButtonStyle">x</button>
    <div class="titleTxt text-center oneEMSeparation">Mensaje de Buenos Días</div>
    <div style="width:100%; height: 2px;" class="seeBorder"></div>

    <div class="oneEMSeparation"> HERE IS WHERE MESSAGEDETAILSDIV  APPENDS
        <label for="" class="subTxt">Etiqueta:</label>
        <input type="text" class="inputMessageTagStyle" placeholder="algo rápido...">
        <br>
        <label for="" class="subTxt">Color:</label>
        <input type="color" class="floatRight">
        <br>
        <label for= "" class="subTxt">Texto:</label>
        <textarea name="" id="" class="customTextAreaStyle" placeholder="texto..."></textarea>
    </div>
</div> */

//example of addNewMessage

/* <div class="col-lg-4"></div>
<div class="col-lg-4" style="padding-left:3em; padding-right:3em"">
    <button class="buttonAddCustomMessage bold" >
        <!-- <i class="fa fa-plus" aria-hidden="true"></i> -->
        + Añadir un nuevo mensaje personalizado
    </button>
</div> */
