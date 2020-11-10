const $ = require("jquery");

async function doAJAX(type, url, obj){
    return await $.ajax({
        type: type,
        url: url,
        dataType: "json",
        data: obj
    });
}

module.exports = {
    doAJAX: doAJAX
};