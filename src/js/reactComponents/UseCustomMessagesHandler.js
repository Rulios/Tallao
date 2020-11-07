
const React = require("react");
const UseCustomMessagesContainers = require("./reactComponents/UseCustomMessagesContainers");
const ajaxReqCustomMessages = require("../js/requestsModules/ajaxReqCustomMessages");


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

module.exports = UseCustomMessages;
