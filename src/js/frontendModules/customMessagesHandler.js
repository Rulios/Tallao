"use strict";
define([], function(){

    //DELETE CUSTOM MESSAGE should be called directly from AjaxReq
    //Not from this module. Because adding it, will be repetition

    let messages =  [];
    const color = {
        none: "",
        skyblue: "#7FE5FF",
        green: "#87E8C1",
        violet: "#DCA2E8",
        orange: "#EBAB28"
    }
    const colorString = {
        none: "",
        skyblue: "Celeste",
        green: "Verde",
        violet: "Violeta",
        orange: "Naranja"
    };

    function storeCustomMessages(data, mode){

        /* there will be two modes
        1) editMode = means that the message can be edited, so it creates a
        messageBox to be editable
        2) useMode = means that it will only appear just to click and use */

        let dataObj = JSON.parse(data);
        let keys = Object.keys(dataObj);

        if(mode == "edit"){

            keys.map(value => {
            // console.log(dataObj[keys[i]]);
            let idMessage = dataObj[value]["id"];
            let colorTag = dataObj[value]["colortag"];
            let tagTxt = dataObj[value]["tag"];
            let msgTxt = dataObj[value]["message"];

            customMessages.createNewMessageBox(superuser.initials, idMessage, colorTag, tagTxt, msgTxt );
            });
            
        }else if(mode == "use"){

            keys.map(value => {
            // console.log(dataObj[keys[i]]);
            let idMessage = dataObj[value]["id"];
            let colorTag = dataObj[value]["colortag"];
            let tagTxt = dataObj[value]["tag"];
            let msgTxt = dataObj[value]["message"];

            customMessages.messages.push(idMessage);
            customMessages.createInstantMsgTag(idMessage, colorTag, tagTxt, msgTxt);
            });
        }
    }

    function submit(){
        let params = {};    
        let paramJSON = "";

        messages.map(value =>{
            //define as obj
            params[value] = {};
            params[value]["msgTagName"] = customMessages[value]["msgTagName"];
            params[value]["msgColor"] = customMessages[value]["msgColor"];
            params[value]["msgText"] = customMessages[value]["msgText"];
        });

        //send as JSON string
        paramJSON = JSON.stringify(params);

        require(["../requestsModules/ajaxReqCustomMessages"], function(ajaxReq){
            return ajaxReq.update({messageObj: paramJSON});
        });
    }

    function createNewMessageBox({}){
        //params: laundryInitials, idMessage, colorTag, tagTxt, msgTxt
    }


});