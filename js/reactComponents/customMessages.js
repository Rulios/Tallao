// main.js
require.config({
    // module name mapped to CDN url
    paths: {
        // Require.js appends `.js` extension for you
        'react': 'https://unpkg.com/react@16/umd/react.production.min',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.production.min'
        /* jquery: [
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
            "../Tallao/js/lib/jquery"] */
    }
});

// load the modules defined above
require(['react', 'react-dom'], function(React, ReactDOM) {

    class InstantMsgTag extends React.component{
        //props: colorTag, tagTxt, msgTxt
        //the key is idMessage which this tag represents
        //but won't be on props
        constructor(props){
            super(props);
        }

        render(){
            return(
                React.createElement("button", {
                    class:"instantMsgTagStyle bottomLineLinkAnimation",
                    dataColor: props.colorTag,
                    dataMsg: props.msgTxt
                }, props.tagTxt)
            );
        }
    }

    class MessageBox extends React.component{
        //params: laundryInitials, idMessage, colorTag, tagTxt, msgTxt
        constructor(props){
            super(props);
        }

        

        render(){
           return(

            );
        }


    }

    //main
    class MessagePanel extends React.component{
        //params: data (passed as json string), mode = "use" | "edit"
        //params: idElement (id of the HTML). 
        //    (props.inputBoxID) In use mode, it will just target the container to show
        //              In edit mode, target the container which will fill

        /* there will be two modes
        1) editMode = means that the message can be edited, so it creates a
        messageBox to be editable
        2) useMode = means that it will only appear just to click and use */
        constructor(props){
            super(props);
            //start parsing JSON string and storing it
            const keys = Object.keys(JSON.parse(data));
            let messages = {};

            keys.map(value => {
                let [id, colortag, tag, message] = keys[value];
                messages[id] = {};
                messages[id]["colorTag"] = colortag;
                messages[id]["tagTxt"] = tag;
                messages[id]["messageTxt"] = message;

                if(this.props.mode === "edit"){
                    React.createElement(MessageBox, {
                        key:id,
                        id: id,
                        colorTag: colorTag,
                        tagTxt: tagTxt,
                        messageTxt: messageTxt,
                        onChangeTagTxt: this.changeTagTxt(id, txt),
                        onChangeColorTag: this.changeColorTag(id, color),
                        onChangeMessageTxt: this.changeMessageTxt(id, txt),
                        onDeleteMessage: this.deleteMessage(id)
                    });
                }else if(this.props.mode === "use"){
                    React.createElement(InstantMsgTag, {
                        key:id,
                        id: id,
                        colorTag: colorTag,
                        tagTxt: tagTxt,
                        messageTxt: messageTxt,
                        inputBoxID: this.props.inputBoxID
                    });
                }
            });

            //store on obj, to then be stored on component state
            this.state = {
                messages: messages
            }; 
        }

        //functions passed when mode = "edit"
        changeTagTxt(id, txt){//event : onChangeTagTxt
            const messages = JSON.parse(JSON.stringify(this.state.messges));
            messages[id]["tagTxt"] = txt;
            this.setState({messages:messages});
        }

        changeColorTag(id, color){ //event : onChangeColorTag
            const messages = JSON.parse(JSON.stringify(this.state.messges));
            messages[id]["colorTag"] = txt;
            this.setState({messages:messages});
        }

        changeMessageTxt(id, txt){ //event : onChangeMessageTxt
            const messages = JSON.parse(JSON.stringify(this.state.messges));
            messages[id]["messageTxt"] = txt;
            this.setState({messages:messages});
        }

        deleteMessage(id){ //event : onDeleteMessage
            const messages = JSON.parse(JSON.stringify(this.state.messges));
            const newMessages = {};
            Object.keys(messages).map(value =>{ //ignore
                if(value !== id){
                    newMessages[value] = messages[value];
                }
            });
            this.setState({messages:newMessages});
            //delete on DB
            require(["../requestsModules/ajaxReqCustomMessages"], function (ajaxReq){
                let query = ajaxReq.deleteMessage({idMessage: id});
                query.catch(err => console.error(err));
            });
        }

    }


    return {
        InstantMsgTag: InstantMsgTag
    };
    
});