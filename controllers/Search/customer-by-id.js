const client = require("../libs/DB_CONNECT");
const validator = require("validator");
module.exports = function(search){
    search.get("/customerByID", async function(req,res){
        try{
            let {inputCustomerID} = req.query;
            let query = `
                SELECT name, surname FROM users
                WHERE public_id= $1 LIMIT 1;
            `;

            let result = await client.query(query,[inputCustomerID]);

            if(typeof result.rows[0] === "undefined") return res.status(200).json(null);
            
            //if(!result.rowCount) return res.status(404).end();

            return res.status(200).json(result.rows[0]);

        }catch(err){
            return res.status(400).end();
        }
        
            
    }); 
}