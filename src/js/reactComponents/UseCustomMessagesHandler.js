
const React = require("react");
const UseCustomMessagesContainers = require("./UseCustomMessagesContainers");
const ajaxReqCustomMessages = require("../requestsModules/ajaxReqCustomMessages");


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
            ajaxReqCustomMessages.fetch().then(data =>{
                //start parsing JSON string and storing it
                let messages = {};
                data.map(value =>{
                    let {id, color_tag, tag, message} = value;
                    messages[id] = {};
                    messages[id]["color_tag"] = color_tag;
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
                    let {color_tag, tag, message} = this.state.messages[messageID];
                    let txt = "";
                    return React.createElement(UseCustomMessagesContainers.InstantMsgTag, {
                        key:messageID,
                        id: messageID,
                        color_tag: color_tag,
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

module.exports = UseCustomMessages;
