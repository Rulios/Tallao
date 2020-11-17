const client = require("./DBConnect");
const validator = require("validator");

const userTypeRanges = ["laundry", "user"];

module.exports = async function(uuid, userType){
    //check if userType falls in range
    if(!validator.isIn(userType, userTypeRanges)) throw Error("USERTYPE_NOT_IN_RANGE");

    let query = "";
    let values = [uuid];
    if(userType === "user"){
        query = "SELECT 1 FROM users WHERE hashcode = $1 LIMIT 1";
    }else if(userType === "laundry"){
        query = "SELECT 1 FROM laundries WHERE hashcode = $1 LIMIT 1";
    }

    return (await client.query(query, values)).rowCount;
}