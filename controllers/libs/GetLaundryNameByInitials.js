const client = require("./DBConnect");

module.exports = async function(laundryInitials){
    const QUERY = `
        SELECT name
        FROM laundries 
        WHERE initials = $1
        LIMIT 1;
    `;
  
    return (await client.query(QUERY, [laundryInitials])).rows[0].name.trim();
}