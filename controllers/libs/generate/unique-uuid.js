const {v4 : uuidv4} = require("uuid");
const ExistsUUID = require("../exists/uuid");

module.exports = async function(userType){
    let rowCountUUID = 1;
    let hashcode = "";
    do{
        hashcode = uuidv4();

        rowCountUUID = await ExistsUUID(hashcode, userType); //check if exists the uuid
    }while(rowCountUUID);

    return hashcode;
}