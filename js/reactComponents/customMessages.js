// main.js
require.config({
    // module name mapped to CDN url
    paths: {
        // Require.js appends `.js` extension for you
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development'
    }
});

// load the modules defined above
//inputs shouldn't have a children
//styles should be a object
define(['react', 'react-dom'], function(React, ReactDOM) {
    const color = {
        none: "",
        skyblue: "#7FE5FF",
        green: "#87E8C1",
        violet: "#DCA2E8",
        orange: "#EBAB28"
    };

    const colorString = {
        none: "",
        skyblue: "Celeste",
        green: "Verde",
        violet: "Violeta",
        orange: "Naranja"
    };

    function InstantMsgTag(props){
        //props: colorTag, tagTxt, msgTxt
        return(
            React.createElement("button", {
                className:"instantMsgTagStyle bottomLineLinkAnimation",
                style: {backgroundColor : props.colorTag},
                onClick: () => { props.onClickAppendTargetID(props.targetID, props.messageTxt)}
            }, props.tagTxt)
        );
    }

    function MessageBox(props){
        
        return(
            //refactored with indentations
            React.createElement("div", {
                className: "col-lg-4 subTxt styleMessageBox",
                style: {"backgroundColor": props.colorTag}
            },
                React.createElement("div", {
                    className: "container-fluid"
                },
                    React.createElement("button",{
                        className: "closeMessageButtonStyle",
                        onClick: () => {props.onDeleteMessage(props.id)}
                    }, "x"),
                    React.createElement("div",{className: "row"},
                        React.createElement("div", {className: "col-lg-3"},
                            React.createElement("label", {
                                htmlFor: `inputMessageTag${props.id}`
                            }, "Etiqueta:")
                        ),
                        React.createElement("div",{className: "col-lg-9"},
                            React.createElement("input",{
                                id: `inputMessageTag${props.id}`,
                                type: "text",
                                name: "messageTag",
                                className: "inputMessageTagStyle",
                                placeholder: "algo rápido...",
                                value: props.tagTxt,
                                onChange : (e) => {props.onChangeTagTxt(props.id, e);}
                           })
                        )
                    ),
                    React.createElement("div",{className: "row smallSeparation"},
                        React.createElement("div",{className:"col-lg-4"},
                            React.createElement("label",{
                                htmlFor: `selectMessageColor${props.id}`
                            }, "Color:")
                        ),
                        React.createElement("div",{className: "col-lg-8"},
                            React.createElement("select",{
                                id: `selectMessageColor${props.id}`,
                                className: "customColorTagStyle",
                                value: Object.keys(color)[Object.values(color).indexOf(props.colorTag)],
                                onChange: (e) => {props.onChangeColorTag(props.id, e)}
                            }, Object.keys(color).map(value =>{
                                return React.createElement("option",{
                                    key: value,
                                    value: value,
                                }, colorString[value]);
                            }))
                        )
                    ),
                    React.createElement("div", {className: "row smallSeparation"},
                        React.createElement("div", {className: "col-lg-2"},
                            React.createElement("label", {
                                htmlFor: `messageTextArea${props.id}` 
                            }, "Texto:")
                        ),
                        React.createElement("div", {className: "col-lg-9"},
                            React.createElement("input", {
                                type: "textarea",
                                id: `messageTextArea${props.id}`,
                                type: "text",
                                placeholder: "texto...",
                                className: "customTextAreaStyle",
                                value: props.messageTxt,
                                onChange: (e) =>{props.onChangeMessageTxt(props.id, e)}
                            })
                        )
                    )
                )
            )
        );
    }

    //main
    class MessagePanel extends React.Component{
        //params: data (passed as json string), mode = "use" | "edit"
        //params: idElement (id of the HTML). 
        //    (props.targetID) In use mode, it will just target the container to append txt
        //              In edit mode, target the container which will fill

        /* there will be two modes
        1) editMode = means that the message can be edited, so it creates a
        messageBox to be editable
        2) useMode = means that it will only appear just to click and use */
        constructor(props){
            super(props);

            //start parsing JSON string and storing it
            let messages = {};
            let cop;
            JSON.parse(this.props.data).map(value =>{
                let {id, colortag, tag, message} = value;
                messages[id] = {};
                messages[id]["colorTag"] = colortag;
                messages[id]["tagTxt"] = tag;
                messages[id]["messageTxt"] = message;
            })

            //store on obj, to then be stored on Component state
            this.state = {
                messages:messages
            }
        }

        //functions passed when mode = "edit"
        changeTagTxt(id, e){//event : onChangeTagTxt
            const messages = JSON.parse(JSON.stringify(this.state.messages));
            messages[id]["tagTxt"] = e.target.value;
            this.setState({messages:messages});
        }

        changeColorTag(id, e){ //event : onChangeColorTag
            const messages = JSON.parse(JSON.stringify(this.state.messages));
            messages[id]["colorTag"] = e.target.value;
            this.setState({messages:messages});
        }

        changeMessageTxt(id, e){ //event : onChangeMessageTxt
            const messages = JSON.parse(JSON.stringify(this.state.messages));
            messages[id]["messageTxt"] = e.target.value;
            this.setState({messages:messages});
        }

        deleteMessage(id, e){ //event : onDeleteMessage
            const messages = JSON.parse(JSON.stringify(this.state.messages));
            const newMessages = {};
            Object.keys(messages).map(value =>{ //ignore
                if(value !== id){
                    newMessages[value] = messages[value];
                }
            });
            this.setState({messages:newMessages});
            //delete on DB
            require(["./requestsModules/ajaxReqCustomMessages"], function (ajaxReq){
                let query = ajaxReq.deleteMessage({idMessage: id});
                query.catch(err => console.error(err));
            });
        }

        //use mode
        appendTargetID(id, message){
            let currentTxt = document.getElementById(id).value;
            document.getElementById(id).value = `${currentTxt} ${message}`;
        }

        render(){
            return(
                Object.keys(this.state.messages).map(value =>{
                    let {colorTag, tagTxt, messageTxt} = this.state.messages[value];
                    let txt = "";
                    if(this.props.mode === "edit"){
                        return React.createElement(MessageBox, {
                            key:value,
                            id: value,
                            colorTag: colorTag,
                            tagTxt: tagTxt,
                            messageTxt: messageTxt,
                            onChangeTagTxt: (id, e) =>{this.changeTagTxt(value, e)},
                            onChangeColorTag: (id, e) => {this.changeColorTag(value, e)},
                            onChangeMessageTxt: (id , e) =>{ this.changeMessageTxt(value, e)},
                            onDeleteMessage: (id , e) => {this.deleteMessage(value, e)}
                        });
                  
                        
                    }else if(this.props.mode === "use"){
                        return React.createElement(InstantMsgTag, {
                            key:value,
                            id: value,
                            colorTag: colorTag,
                            tagTxt: tagTxt,
                            messageTxt: messageTxt,
                            targetID: this.props.targetID,
                            onClickAppendTargetID: (targetID, messageTxt) => this.appendTargetID(targetID, messageTxt)
                        });
                    }
                })
            );
        }
    }

    /* require(["./requestsModules/ajaxReqCustomMessages"], function(ajaxReq){
        ajaxReq.fetch().then(data =>{
            ReactDOM.render(
                React.createElement(MessagePanel, {data:data, mode: "use", targetID:"inputIndications"}),
                document.getElementById("appendCustomMessages") 
            )
        }).catch(err => console.error(err));
    }); */
    return {
        MessagePanel: MessagePanel
    };
    
});

/* 
This is how MessageBox looks on HTML

<div class="supTxt-TitleTxt-Separation">
    <div class="row">
        <!-- begins -->
        <div class="col-lg-4 subTxt styleMessageBox">
            <div class="container-fluid">
                <button class="closeMessageButtonStyle">x</button>
                <div class="row">
                    <div class="col-lg-3">
                        <label for="inputMessageTag">Etiqueta:</label>
                    </div>
                    <div class="col-lg-9">
                        <input type="text" name="messageTag" class="inputMessageTagStyle" placeholde="algo rápido...">
                    </div>
                </div>
                <div class="row smallSeparation">
                    <div class="col-lg-4">
                        <label for="selectMessageColor">Color:</label>
                    </div>
                    <div class="col-lg-8">
                        <select name="" class="customColorTagStyle" id="">
                            <option value="blue">Azul</option>
                        </select>
                    </div>
                </div>
                <div class="row smallSeparation">
                    <div class="col-lg-2">
                        <label for="messageTextArea">Texto:</label>
                    </div>
                    <div class="col-lg-10">
                        <textarea name="" class="customTextAreaStyle" id="messageTextArea" placeholder="texto..." cols="30" rows="10"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> 

///////////////////////ON VARIABLES//////////////////////////


const mainColumnDiv = React.createElement(divComp.DivCColLg4, {
    class: "subTxt styleMessageBox",
    style: `background-color: ${this.props.colorTag}`
});
const innerContainer = React.createElement("div", {
    class: "container-fluid"
});
const closeMessageButton = React.createElement("button",{
    class: "closeMessageButtonStyle",
    onClick: ""
}, "x");

const tagRowDiv = React.createElement(divComp.DivCRow,{});
const tagColumnLabel = React.createElement(divComp.DivCColLg3, {});
const tagLabel = React.createElement("label", {
    htmlFor: ""
}, "Etiqueta:");
const tagColumnInput = React.createElement(divComp.DivCColLg9,{});
const tagInput = React.createElement("input",{
    id: this.props.id,
    type: "text",
    name: "messageTag",
    class: "inputMessageTagStyle",
    placeholder: "algo rápido...",
    onChange = ""
}, this.props.tagTxt);       

const colorRowDiv = React.createElement(divComp.DivCRowSmallSep,{});
const colorColumnLabel = React.createElement(divComp.DivCColLg4,{});       
const colorLabel = React.createElement("label",{
    htmlFor: ""
}, "Color:");       
const colorColumnSelect = React.createElement(divComp.DivCColLg8,{});       
const colorSelect = React.createElement("select",{
    class: "customColorTagStyle",
    onChange: ""
}, color.map(value =>{
    React.createElement("option",{
        key: value,
        value: value
    }, colorString[value]);
}));     

const messageRowDiv = React.createElement(divComp.DivCRowSmallSep);
const messageColumnLabel = React.createElement(divComp.DivCColLg2);
const messageLabel = React.createElement("label", {
    htmlFor: `messageTextArea${this.props.id}` 
}, "Texto:");
const messageColumnTextArea = React.createElement(divComp.DivCColLg10);
const messageTextArea = React.createElement("textarea", {
    id: `messageTextArea${this.props.id}`,
    type: "text",
    placeholder: "texto...",
    class : "customTextAreaStyle",
    onChange: ""
}, this.props.messageTxt);




*/