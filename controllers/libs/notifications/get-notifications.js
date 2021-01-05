const client = require("../DBConnect");

module.exports = async function (getter, getter_role, shouldFetchViewed = false){
    const QUERY = buildQuery(getter_role, shouldFetchViewed);
    const VALUES = [getter];


    return (await client.query(QUERY, VALUES)).rows;
}

function buildQuery(userRole, shouldFetchViewed){

    let QUERY = {};

    if(shouldFetchViewed){ //fetch both states (viewed and not viewed)
        QUERY = {
            user: `
                SELECT id, emitter, code, extras
                FROM notifications_for_users
                WHERE getter = $1
                ORDER BY created_at DESC;
            `,
            laundry: `
                SELECT id, emitter, code, extras
                FROM notifications_for_laundries
                WHERE getter = $1
                ORDER BY created_at DESC;
            `
        };
    }else{ //fetch only the ones that hasn't been viewed
        QUERY = {
            user: `
                SELECT id, emitter, code, extras
                FROM notifications_for_users
                WHERE getter = $1
                    AND getter_has_viewed = FALSE
                ORDER BY created_at DESC;
            `,
            laundry: `
                SELECT id, emitter, code, extras
                FROM notifications_for_laundries
                WHERE getter = $1
                    AND getter_has_viewed = FALSE
                ORDER BY created_at DESC;
            `
        };
    }

    return QUERY[userRole];
}