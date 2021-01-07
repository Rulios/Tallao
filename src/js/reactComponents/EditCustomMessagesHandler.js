"use strict";

const React = require("react");
const EditCustomMessagesContainers = require("./EditCustomMessagesContainers");
const {fetch, deleteMessage, update} = require("../ajax-requests/custom-messages");

async function getCustomMessages(){
    try {
        let {data:messages} = await fetch();
        return messages;
    }catch(err){console.error(err);}
}

function renderUpdateButton({status, onClick}){ 
    return React.createElement("div", { 
        className: "row small-mediumSeparation"
    },
        React.createElement(EditCustomMessagesContainers.UpdateElementsPriceButton,{
            onClick: () => onClick()
        })
    );
}

function renderNewMessageButton({onClick}) {
    return React.createElement("div", {className: "row"},
        React.createElement(EditCustomMessagesContainers.AddNewMessageButton, {
            onClick: () => onClick()
        })
    );
}

function renderCustomMessages({messages, deleteMessage, 
    onChangeTag, onChangeColorTag, onChangeMessage}){

        return React.createElement("div" ,{
            className: "row small-mediumSeparation "
        },
            Object.keys(messages).map(messageID =>{
                return React.createElement(EditCustomMessagesContainers.EditBox, {
                    key: `EditCustomMessage4${messageID}`,
                    messageDetails: messages[messageID],
                    inputHandlers: {
                        deleteMessage: (id) =>deleteMessage(id),
                        onChangeTag: (id, value) => onChangeTag(id,value),
                        onChangeColorTag: (id, value) => onChangeColorTag(id,value),
                        onChangeMessage: (id, value) => onChangeMessage(id,value)
                    }
                });
            })
        );
}

class EditCustomMessages extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            messages:[]
        };
    }

    addNewMessage(){
        //this will generate a id just for frontend state manipulation
        //the true id will be made on backend
        //the temp id is produced having the difference of data in ms
        //from jan 1 1970
        let id = Math.random().toString(36).substr(2, 20);
        let newMessages = JSON.parse(JSON.stringify(this.state.messages));
        newMessages[id] = {
            id: id,
            color_tag: "#FFFFFF",
            tag: "",
            message: ""
        };
        this.setState({
            messages: newMessages
        });
    }

    changeTagHandler(id, value){    
        let newMessages = JSON.parse(JSON.stringify(this.state.messages));
        newMessages[id]["tag"] = value;
        this.setState({
            messages: newMessages
        });
    }

    changeColorTagHandler(id, value){    
        let newMessages = JSON.parse(JSON.stringify(this.state.messages));
        newMessages[id]["color_tag"] = value;
        this.setState({
            messages: newMessages
        });
    }

    changeMessageHandler(id, value){    
        let newMessages = JSON.parse(JSON.stringify(this.state.messages));
        newMessages[id]["message"] = value;
        this.setState({
            messages: newMessages
        });
    }

    deleteMessage(id){
        const messages = JSON.parse(JSON.stringify(this.state.messages));
        const newMessages = {};
        Object.keys(messages).map(value =>{ //ignore
            if(value !== id){
                newMessages[value] = messages[value];
            }
        });

        deleteMessage({messageID:id})
        .then(response => {
            this.setState({messages:newMessages});
        }).catch(err => EditCustomMessagesContainers.ErrorMessage())
    }

    updateCustomMessages(){
        update({messages: JSON.stringify(this.state.messages)})
        .then(response =>{
            EditCustomMessagesContainers.SuccessMessage();
        }).catch(err =>{
            EditCustomMessagesContainers.ErrorMessage();
        });
    }

    componentDidMount(){
        //fetch data
        getCustomMessages().then(messages =>{
            let messageObjWID = {};
            //iterate for every message
            messages.map(message =>{
                //get the id of the message
                let {id} = message;
                //assign it as the prop name
                messageObjWID[id] = Object.assign({}, message);
            })
            this.setState({
                messages : messageObjWID
            });
        });
    }

    render(){
        let el2Render = [];

        el2Render.push( //apend the add new custom message btn
            React.createElement(renderNewMessageButton,{
                key: "AddNewCustomMessageBtn",
                onClick: () => this.addNewMessage()
            })
        );
            //append the edit custom messages boxes
        if(Object.keys(this.state.messages).length){
            el2Render.push(
                React.createElement(renderCustomMessages, {
                    key: "EditCustomMessagesBoxes",
                    messages: this.state.messages,
                    deleteMessage: (id) => this.deleteMessage(id),
                    onChangeTag: (id, value) => this.changeTagHandler(id,value),
                    onChangeColorTag: (id, value) => this.changeColorTagHandler(id,value),
                    onChangeMessage: (id, value) => this.changeMessageHandler(id,value)
                })
            );
        }

        el2Render.push( //append the update btn
            React.createElement(renderUpdateButton, {
                key : "UpdateCustomMessagesBtn",
                status: "",
                onClick: () => this.updateCustomMessages()
            })
        ); 
        
        return el2Render;
    }

};

module.exports =  EditCustomMessages;