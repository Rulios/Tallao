const ajaxReq = require("./ajaxReq");

async function fetchDateTimeServer(){
    return await ajaxReq.doAJAX("GET", "");
}

module.exports = {
    fetchDateTimeServer: fetchDateTimeServer
};