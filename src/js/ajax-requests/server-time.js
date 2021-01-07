const ajaxReq = require("./ajax-req");

async function fetchDateTimeServer(){
    return await ajaxReq.get("/time/fetch");
}

module.exports = {
    fetchDateTimeServer: fetchDateTimeServer
};