const client = require("../DB_CONNECT");

module.exports = async function(getter, getter_role){
    const QUERY = buildQuery(getter_role);

    await client.query(QUERY, [getter]);

};

function buildQuery(getter_role){
    const QUERY_BY_ROLE = {
        user: `
            UPDATE notifications_for_users
            SET getter_has_viewed = TRUE
            WHERE getter = $1
                AND getter_has_viewed = FALSE;
        `,
        laundry: `
            UPDATE notifications_for_laundries
            SET getter_has_viewed = TRUE
            WHERE getter = $1
                AND getter_has_viewed = FALSE;
        `
    };
    return QUERY_BY_ROLE[getter_role];
};
