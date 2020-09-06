"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development',
        EditCustomMessagesContainers: "./reactComponents/EditCustomMessagesContainers",
        ajaxReqCustomMessages: "./requestsModules/ajaxReqCustomMessages",
    }
});

define(["react", "react-dom", "EditCustomMessagesContainers", "ajaxReqCustomMessages"],
function(React, ReactDOM, EditCustomMessagesContainers, ajaxReq){

    async function getCustomMessages(){
        try {
            let query = await ajaxReq.fetch();
            return query;
        }catch(err){console.error(err);}
    }

    function renderUpdateButton({status, onClick}){ 
        ReactDOM.render(
            React.createElement(EditCustomMessagesContainers.UpdateElementsPriceButton,{
                onClick: () =>{onClick();}
            }),
            document.getElementById("UpdateCustomMessagesButtonContainer")
        );
    }

    function renderNewMessageButton({onClick}) {
        ReactDOM.render(
            React.createElement(EditCustomMessagesContainers.AddNewMessageButton, {
                onClick: () =>{onClick();}
            }),
            document.getElementById("AddNewMessageButtonContainer")
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
            console.log(id);
            let newMessages = JSON.parse(JSON.stringify(this.state.messages));
            newMessages[id] = {
                id: id,
                colorTag: "#000000",
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
            newMessages[id]["colorTag"] = value;
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
            this.setState({messages:newMessages});

            ajaxReq.deleteMessage({idMessage:id})
            .catch(err => EditCustomMessagesContainers.ErrorMessage())
        }

        updateCustomMessages(){
            ajaxReq.update({messageObj: JSON.stringify(this.state.messages)})
            .then(response =>{
                if(response === "OK"){
                    EditCustomMessagesContainers.SuccessMessage();
                }
            }).catch(err =>{
                EditCustomMessagesContainers.ErrorMessage();
            });
        }

        componentDidMount(){
            //render add new message button
            renderNewMessageButton({
                onClick: () => {this.addNewMessage();}
            })
            //render update button
            renderUpdateButton({
                status: "", 
                onClick: () => {this.updateCustomMessages();}
            });
            //fetch data
            getCustomMessages().then(dataJSON =>{
                
                let ArrObj = JSON.parse(dataJSON);
                let newMessages = {}
                
                if(ArrObj !== "null") {
                    ArrObj.map(message =>{
                        newMessages[message.id] = message;
                    });
                    this.setState({
                        messages : newMessages
                    });
                }
            });
        }

        render(){
          
            if(Object.keys(this.state.messages).length){
                return Object.keys(this.state.messages).map(messageID =>{
                    return React.createElement(EditCustomMessagesContainers.EditBox, {
                        key: `EditCustomMessage4${messageID}`,
                        messageDetails: this.state.messages[messageID],
                        inputHandlers: {
                            deleteMessage: (id) =>{this.deleteMessage(id);},
                            onChangeTag: (id, value) =>{this.changeTagHandler(id,value);},
                            onChangeColorTag: (id, value) =>{this.changeColorTagHandler(id,value);},
                            onChangeMessage: (id, value) =>{this.changeMessageHandler(id,value);}
                        }
                    });
                });
            }else{
                return null;
            }
        }

    };

    return EditCustomMessages;
});