const client = require("./DBConnect");

module.exports = async function(userType, hashcode){
    let query = "";

    if(userType === "laundry"){
        query = `
            SELECT initials FROM laundries 
            WHERE hashcode = $1 LIMIT 1;
        `;
        return (await client.query(query, [hashcode])).rows[0].initials;
        
    }else if(userType === "user"){
        query = `
            SELECT public_id FROM users 
            WHERE hashcode = $1 LIMIT 1;
        `;
        return (await client.query(query, [hashcode])).rows[0].public_id;
    }


    
}