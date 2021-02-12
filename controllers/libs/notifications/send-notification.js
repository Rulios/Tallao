const client = require("../DB_CONNECT");
const {v4 : uuidv4} = require("uuid");
const existsNotification = require("./helpers/exists-notification");
const {emitNotification} = require("../socketio/events");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

module.exports = async function(io ,{
    emitter, emitter_role, getter, getter_role, code, extras = {}
}){


    if(shouldNotificationBeSet(emitter_role, getter)){
        const QUERY = buildQuery(emitter_role);
        const NOTIF_ID = await buildNotificationID(emitter, getter, getter_role);
        const CREATED_AT = dayjs.utc().format();
        const VALUES = [
            NOTIF_ID,
            emitter, 
            getter,
            code,
            JSON.stringify(extras),
            CREATED_AT
        ];

        let result = await client.query(QUERY, VALUES);

        emitNotification(io, getter_role, getter);
    }
    
}

function buildQuery(emitter_role){
    const QUERIES_BY_EMITTER_ROLE = {
        laundry: `
            INSERT INTO notifications_for_users
            (id, emitter, getter, code, extras, created_at)
            VALUES ($1, $2, $3, $4, $5::json, $6::timestamptz)
            LIMIT 1;
        `
    };
    return QUERIES_BY_EMITTER_ROLE[emitter_role];
}

async function buildNotificationID(emitter, getter, getter_role){
    let id = "";
    do{
        id = `${emitter}-${uuidv4()}-${getter}`;
    }while(await existsNotification(id, getter_role));
    return id;
}

function shouldNotificationBeSet(emitter_role, getter){
    let isNullUserGetter = emitter_role === "laundry" && getter === "" || getter === "NULL";

    return !isNullUserGetter;
}