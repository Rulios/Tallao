"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        EditCustomMessagesComp: "./reactComponents/EditCustomMessagesComp"
    }
});
define(["react", "EditCustomMessagesComp"], function(React, EditCustomMessagesComp){

    /* This is a middle order component, responsible for translation
    and bundling of low order components */
    const textEs = {
        tagTxt: "Etiqueta:",
        tagPlaceholder: "algo rápido...",
        colorTxt: "Color:",
        messageTxt: "Texto:",
        messageTxtPlaceholder: "texto...",
        updateSuccess: "¡Precios actualizados!",
        update: "Actualizar Mensajes Personalizados",
    };

    //this function uses hooks
    function EditCustomMessageBox({messageDetails}){
        //messageObj contains tag, colorTag, message, status (not in use right now)
        const [isHover, setHover] = React.useState(false);
        return React.createElement("div", {
            className: "col-lg-4 smallMarginBottom ",
            style: {
                padding: "1em",
                transitionDuration: "0.3s",
                boxShadow: (isHover) ? `0 1px 4px ${messageDetails.colorTag}, 0 0 30px 2px ${messageDetails.colorTag} `: ""
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
                    key: `CloseMessageButton4${messageDetails.id}`
                }),
                React.createElement(EditCustomMessagesComp.TitleDiv, {
                    key: `TitleDiv4${messageDetails.id}`,
                    text: messageDetails.tag
                }),
                React.createElement(EditCustomMessagesComp.ColorDiv, {
                    key: `ColorDiv4${messageDetails.id}`,
                    color: messageDetails.colorTag
                }),
                [
                    MessageDetailsDiv({
                        messageDetails: messageDetails
                    })
                ]
            ]
        )
    }

    function MessageDetailsDiv({messageDetails}){
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
                        placeholder: textEs.tagPlaceholder
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
                        value: messageDetails.colorTag
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
                        placeholder: textEs.messageTxtPlaceholder
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

    return{
        EditBox: EditCustomMessageBox,
        UpdateElementsPriceButton: UpdateElementsPriceButton,
        SuccessMessage: SuccessMessage
    };

});

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
