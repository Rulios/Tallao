const ajaxReq = require("./ajax-req");

async function fetchNotifications(){
    return await ajaxReq.get("/notification/fetch");
}

module.exports = {
    fetchNotifications: fetchNotifications
};