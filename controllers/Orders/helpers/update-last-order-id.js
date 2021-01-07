const client = require("../../libs/DB_CONNECT");

module.exports = async function(laundryInitials, {idChar, idNumber}){

    //remove whitespace
    idChar = idChar.trim();

    let query = `
        UPDATE last_order_id
        SET id_char = $1::varchar, id_number = $2::int
        WHERE laundry_initials = $3;
    `;

    return (await client.query(query, [idChar, idNumber, laundryInitials])).rowCount;
}