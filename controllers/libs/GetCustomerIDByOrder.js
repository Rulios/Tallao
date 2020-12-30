const client = require("./DBConnect");

module.exports = async function({laundryInitials, id_char, id_number}){
    const QUERY = `
        SELECT  customer_id
        FROM orders
        WHERE laundry_initials = $1
            AND id_char = $2
            AND id_number = $3
        LIMIT 1;
    `;
    return (await client.query(QUERY, [laundryInitials, id_char, id_number])).rows[0].customer_id;
}