const { query } = require("./DBConnect");
const client = require("./DBConnect");

module.exports = async function(hashcode, userType){
    const QUERY = `
        SELECT email
        FROM ${getTableName(userType)}
        WHERE hashcode = $1
        LIMIT 1;
    `;

    return (await client.query(QUERY, [hashcode])).rows[0].email;
}

function getTableName(userType){
    if(userType === "laundry"){
        return "laundries";
    }else if(userType === "user"){
        return "users";
    }
}
