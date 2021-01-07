const bcrypt = require("bcrypt");
const client = require("../../libs/DB_CONNECT");
const SALT_ROUNDS = require("../../libs/SALT_ROUNDS");

module.exports = function(credentials){
    credentials.post("/updatePassword", async function(req,res){

        try{
            const {userType, hashcode} = req.session;
            const {inputPassword} = req.body;

            let hashedPassword = await bcrypt.hash(inputPassword, SALT_ROUNDS);
            const query = buildQuery(userType);

            let isUpdated = (await client.query(query, [hashedPassword, hashcode])).rowCount;

            if(isUpdated){
                return res.status(200).end();
            }else{
                throw new Error("Can't update");
            }
            
        }catch(err){
            console.log(err);
            return res.status(500).end();
        }
    });
    
}

function buildQuery(userType){
    if(userType === "user"){
        return  `
            UPDATE users 
            SET password= $1 
            WHERE hashcode= $2`;
    }else if(userType === "laundry"){
        return  `
            UPDATE laundries 
            SET password= $1 
            WHERE hashcode= $2`;
    }
}