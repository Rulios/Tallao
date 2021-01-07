const client = require("../DB_CONNECT");


module.exports = async function(inputEmail, userType){
    let query = `
        SELECT 1 
        FROM ${getTableName(userType)}
        WHERE email = $1
        LIMIT 1;
    `;
    let values = [inputEmail];
 
    return (await client.query(query, values)).rowCount;
}
function getTableName(userType){
    if(userType === "laundry"){
        return "laundries";
    }else if(userType === "user"){
        return "users";
    }
}