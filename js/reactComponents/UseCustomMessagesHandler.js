// main.js
require.config({
    // module name mapped to CDN url
    paths: {
        // Require.js appends `.js` extension for you
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development',
        UseCustomMessagesContainers: "./reactComponents/UseCustomMessagesContainers",
        ajaxReqCustomMessages: "../js/requestsModules/ajaxReqCustomMessages"
    }
});

// load the modules defined above
//inputs shouldn't have a children
//styles should be a object
define(['react', 'react-dom',"UseCustomMessagesContainers", "ajaxReqCustomMessages"], function(React, ReactDOM,UseCustomMessagesContainers, ajaxReq) {
  
    class UseCustomMessages extends React.Component{
    
        constructor(props){
            super(props);

            this.state = {
                ajaxLoaded: false,
                messages: {}
            }
        }

        appendMessageToText(messageID){
            let currentTxt = document.getElementById(this.props.targetID).value;
            document.getElementById(this.props.targetID).value = `${currentTxt} ${this.state.messages[messageID]["message"]}`;
        }

        componentDidMount(){
            let that = this;
            if(!this.state.ajaxLoaded){
                ajaxReq.fetch().then(data =>{
                    //start parsing JSON string and storing it
                    let messages = {};
                    JSON.parse(data).map(value =>{
                        let {id, colorTag, tag, message} = value;
                        messages[id] = {};
                        messages[id]["colorTag"] = colorTag;
                        messages[id]["tag"] = tag;
                        messages[id]["message"] = message;
                    })
                    //store on obj, to then be stored on Component state
                    this.setState({
                        messages: messages,
                        ajaxLoaded: true
                    });
                })
            }
        }

        render(){
            if(this.state.ajaxLoaded){
                return(
                    Object.keys(this.state.messages).map(messageID =>{
                        let {colorTag, tag, message} = this.state.messages[messageID];
                        let txt = "";
                        return React.createElement(UseCustomMessagesContainers.InstantMsgTag, {
                            key:messageID,
                            id: messageID,
                            colorTag: colorTag,
                            text: tag,
                            onClick: (messageID) => this.appendMessageToText(messageID)
                        });
                    })
                );
            }else{
                return(null);
            }
        }
    }

    return UseCustomMessages;
    
});
