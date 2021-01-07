const client = require("../libs/DB_CONNECT");
module.exports = async function(hashcode){

    const QUERY = `
        SELECT verified
        FROM users 
        WHERE hashcode = $1
        LIMIT 1;
    `;

    let isVerified = (await client.query(QUERY, [hashcode])).rows[0].verified;
    return isVerified;
};