const client = require("./DBConnect");

module.exports = async function(hashcode){
    let query = `
        SELECT initials FROM laundries 
        WHERE hashcode = $1
    `;


    return (await client.query(query, [hashcode])).rows[0].initials;
}