const client = require("../../DB_CONNECT");

module.exports = async function(id, getter_role){

    const QUERY = buildQuery(getter_role);

    return (await client.query(QUERY, [id])).rowCount;
}

function buildQuery(getter_role){
    const QUERY_BY_ROLE = {
        user: `
            SELECT 1 
            FROM notifications_for_users
            WHERE id = $1
            LIMIT 1;
        `
    };

    return QUERY_BY_ROLE[getter_role];
}