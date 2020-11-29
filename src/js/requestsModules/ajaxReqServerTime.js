const ajaxReq = require("./ajaxReq");

async function fetchDateTimeServer(){
    return await ajaxReq.doAJAX("GET", "/time/fetch");
}

module.exports = {
    fetchDateTimeServer: fetchDateTimeServer
};