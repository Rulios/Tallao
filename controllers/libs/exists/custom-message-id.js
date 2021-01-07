const client = require("../DB_CONNECT");

module.exports = async function(id){
    let query = `
        SELECT 1 FROM custom_messages
        WHERE id = $1
        LIMIT 1;
    `;
    return (await client.query(query, [id])).rowCount;
}