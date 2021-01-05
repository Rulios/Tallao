const ajaxReq = require("./ajaxReq");

async function fetchNotifications(){
    return await ajaxReq.get("/notification/fetch");
}

module.exports = {
    fetchNotifications: fetchNotifications
};