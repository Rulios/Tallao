const ajaxReq = require("./ajaxReq");

async function update(obj){
    //props:  messageObj(json format)

    try{    
        return await ajaxReq.put("/Laundry/customMessages/update", obj);
    }catch(err){
        console.error(err);
    }
}

async function fetch(){
    //props: 
    try{
        return await ajaxReq.get("/Laundry/customMessages/fetch");
    }catch(err){
        console.error(err);
    }

}

async function deleteMessage(obj){
    //props: idMessage
    try{
        return await ajaxReq.delete("/Laundry/customMessages/delete", obj);
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    update: update,
    fetch: fetch,
    deleteMessage: deleteMessage
};