const client = require("../../libs/DBConnect");
const GetLaundryInitials = require("../../libs/GetLaundryInitials");

module.exports = function(customMessages){
    customMessages.get("/fetch", async function(req,res){
        try{
            const {hashcode, userType} = req.session;
            const laundryInitials = await GetLaundryInitials(hashcode);

            let query = `
                SELECT id, color_tag, tag, message FROM custom_messages
                WHERE laundry_initials = $1;
            `;

            let result = await client.query(query, [laundryInitials]);
            
            return res.status(200).json(result.rows);
        }catch(err){
            console.error(err);
            return res.status(500).end();
        }
        

    });
}