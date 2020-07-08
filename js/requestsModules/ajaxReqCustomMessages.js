define(["ajaxReq"], function(ajaxReq){

    async function update(obj){
        //props: initials, messageObj(json format)

        try{    
            return await ajaxReq.doAJAX("POST", "./php/submitUpdateCustomMessage.php", obj);
        }catch(err){
            console.error(err);
        }
    }

    async function fetch(obj){
        //props: inputInitials
        try{
            return await ajaxReq.doAJAX("POST", "./php/fetchCustomMessages.php", obj);
        }catch(err){
            console.error(err);
        }

    }

    async function deleteMessage(obj){
        //props: idMessage
        try{
            return await ajaxReq.doAJAX("POST", "./php/deleteMessageSuperuser.php", obj);
        }catch(err){
            console.log(err);
        }
    }

    return{
        update: update,
        fetch: fetch,
        deleteMessage: deleteMessage
    };

});
