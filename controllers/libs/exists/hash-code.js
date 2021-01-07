const client = require("../DB_CONNECT");

module.exports = async function(hashcode, userType){
    let query = "";

    if(userType === "user"){
        query = `
            SELECT 1 FROM users
            WHERE hashcode = $1;
        `;
    }else if(userType === "laundry"){
        query = `
            SELECT 1 FROM laundries
            WHERE hashcode = $1;
        `;
    }

    return (await client.query(query, [hashcode])).rowCount;
}