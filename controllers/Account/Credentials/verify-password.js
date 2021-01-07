const client = require("../../libs/DB_CONNECT");
const bcrypt = require("bcrypt");

module.exports = function(credentials){

    credentials.post("/verifyPassword", async function(req,res){
        try{
            const {userType, hashcode} = req.session;
            let {inputPassword} = req.body;
            let databasePassword = await getPassword(userType, hashcode);

            //compare passwords
            let comparison = await bcrypt.compare(inputPassword, databasePassword);

            return res.status(200).json(comparison);

        }catch(err){
            console.log(err);
            return res.status(500).end();
        }

    });
}

async function getPassword(userType, hashcode){
    let query = buildQuery(userType);
    return (await client.query(query, [hashcode])).rows[0].password;
}

function buildQuery(userType){
    if(userType == "user"){
        return `
            SELECT password 
            FROM users 
            WHERE hashcode= $1
            LIMIT 1`;
    }else if(userType == "laundry"){
        return `
            SELECT password 
            FROM laundries 
            WHERE hashcode= $1
            LIMIT 1`;
    }
}
