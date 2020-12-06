const client = require("../../libs/DBConnect");
const ExistsCustomMessageID = require("../../libs/ExistsCustomMessageID");

module.exports = function(customMessages){
    customMessages.delete("/delete", async function(req,res){
        try{
            let id = req.body.messageID;
            console.log(id);
            let query = "";
            if(await ExistsCustomMessageID(id)){
                query =`
                    DELETE FROM custom_messages
                    WHERE id = $1;
                `;
                await client.query(query, [id]);
            }
            return res.status(200).end();
        }catch(err){
            console.log(err);
            return res.status(500).end();
        }
    });
}