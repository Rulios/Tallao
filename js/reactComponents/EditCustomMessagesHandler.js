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

    class EditCustomMessages extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                messages:[]
            };
        }

        componentDidMount(){
            //render update button
            renderUpdateButton({
                status: "", 
                onClick: () => {this.updateElementsPrice();}
            });
            //fetch data
            getCustomMessages().then(dataJSON =>{
                
                let ArrObj = JSON.parse(dataJSON);
                if(ArrObj !== "null") {
                    this.setState({
                        messages : ArrObj
                    });
                }
            });
        }

        render(){
            console.log(this.state);
            if(this.state.messages.length){
                return this.state.messages.map(message =>{
                    return React.createElement(EditCustomMessagesContainers.EditBox, {
                        key: `EditCustomMessage4${message.id}`,
                        messageDetails: message
                    });
                });
            }else{
                return null;
            }
        }

    };

    return EditCustomMessages;
});