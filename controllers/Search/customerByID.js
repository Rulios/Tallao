const client = require("../libs/DBConnect");
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

            //if(!result.rowCount) return res.status(204).json(null);
            if(!result.rowCount) throw new Error();
            
            return res.status(200).json(result.rows[0]);

        }catch(err){
            return res.status(400).end();
        }
        
            
    }); 
}