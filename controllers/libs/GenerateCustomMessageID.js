const uniqid = require("uniqid");
const ExistsCustomMessageID = require("./ExistsCustomMessageID");

module.exports = async function(laundryInitials){
    //generate and check if the custom message id exists
    let messageID = "";
    let rowCountCustomMessageID = 1;
    do{
        messageID = uniqid(`${laundryInitials}-`);
        rowCountCustomMessageID = await ExistsCustomMessageID([messageID]);
    }while(rowCountCustomMessageID);
    return messageID;
}