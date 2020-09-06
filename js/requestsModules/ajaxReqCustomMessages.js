require.config({
    paths:{
        ajaxReq: "./requestsModules/ajaxReq"
    }
});
define(["ajaxReq"], function(ajaxReq){

    async function update(obj){
        //props:  messageObj(json format)

        try{    
            return await ajaxReq.doAJAX("POST", "./php_copia/DBCustomMessages/submitUpdateCustomMessage.php", obj);
        }catch(err){
            console.error(err);
        }
    }

    async function fetch(){
        //props: 
        try{
            return await ajaxReq.doAJAX("GET", "./php_copia/DBCustomMessages/fetchCustomMessages.php");
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