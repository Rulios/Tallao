const client = require("../DB_CONNECT");


//IMPORTANT DETAIL:
//publicID IS THE GENERAL TERM FOR RELATING BOTH USERTYPES
//FOR THE LAUNDRY USERTYPE IN THE DB IS CALLED AS INITIALS

module.exports = async function(publicID, userType){
    let query = "";
    let values = [publicID];
    if(userType === "user"){
        query = "SELECT 1 FROM users WHERE public_id = $1 LIMIT 1;";
    }else if(userType === "laundry"){
        query = "SELECT 1 FROM laundries WHERE initials = $1 LIMIT 1;";
    }

    return (await client.query(query, values)).rowCount;
}