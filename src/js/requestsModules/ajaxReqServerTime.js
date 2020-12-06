const ajaxReq = require("./ajaxReq");

async function fetchDateTimeServer(){
    return await ajaxReq.get("/time/fetch");
}

module.exports = {
    fetchDateTimeServer: fetchDateTimeServer
};