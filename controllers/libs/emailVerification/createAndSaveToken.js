const client = require("../DBConnect");
const crypto = require("crypto");
const dayjs = require("dayjs");
const DATE_TIME_FORMAT = require("../DATE_TIME_FORMAT");

module.exports = async function(hashcode){
    const TOKEN = crypto.randomBytes(16).toString("hex");
    const CREATED_AT = dayjs().format(DATE_TIME_FORMAT);
    let query = "";

    if(await isTokenExistsOnDB(hashcode)){
        query = buildUpdateQuery();
        await client.query(query, [TOKEN, CREATED_AT, hashcode]);
    }else{
        query = buildInsertQuery();
        await client.query(query, [hashcode, TOKEN, CREATED_AT]);
    }

    return TOKEN;

}

async function isTokenExistsOnDB(hashcode){
    const QUERY = `
        SELECT 1 
        FROM verification_tokens
        WHERE hashcode = $1
        LIMIT 1;
    `;
    return (await client.query(QUERY, [hashcode])).rowCount;
}


function buildInsertQuery(){
    return `
        INSERT INTO verification_tokens
        (hashcode, token, created_at)
        VALUES ($1, $2, $3);
    `;
}

function buildUpdateQuery(){
    return `
        UPDATE verification_tokens
        SET token = $1, created_at = $2
        WHERE hashcode = $3;
    `;
}


