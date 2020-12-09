const client = require("./DBConnect");

module.exports = async function(customer_id){

    //returns customer name by the public_id of the customer

    let query = `
        SELECT name, surname
        FROM users 
        WHERE public_id = $1
        LIMIT 1;
    `
    let result = await client.query(query, [customer_id]);

    if(!result.rowCount) return null;
    return `${result.rows[0].name.trim()} ${result.rows[0].surname.trim()}`;
}