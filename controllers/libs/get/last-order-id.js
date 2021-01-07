const client = require("../DB_CONNECT");

module.exports = async function(laundry_initials){

    let query = `
        SELECT id_char, id_number
        FROM last_order_id
        WHERE laundry_initials = $1
        LIMIT 1;
    `;

    return (await client.query(query, [laundry_initials])).rows[0];
}