requirejs.config({
    paths:{
        jquery: [
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
            "../Tallao/js/lib/jquery"]
    }
});

define(["jquery"], function($){

    async function update(obj){
        //props: initials, messageObj(json format)

        try{    
            return await doAJAX("POST", "./php/submitUpdateCustomMessage.php", obj);
        }catch(err){
            console.error(err);
        }
    }

    async function fetch(obj){
        //props: inputInitials
        try{
            return await doAJAX("POST", "./php/fetchCustomMessages.php", obj);
        }catch(err){
            console.error(err);
        }

    }

    async function deleteMessage(obj){
        //props: idMessage
        try{
            return await doAJAX("POST", "./php/deleteMessageSuperuser.php", obj);
        }catch(err){
            console.log(err);
        }
    }

    return{
        update: update,
        fetch: fetch,
        deleteMessage: deleteMessage
    }

});

async function doAJAX(type, url, obj){

    return await $.ajax({

        type: type,
        url: url,
        data: obj

    });

}