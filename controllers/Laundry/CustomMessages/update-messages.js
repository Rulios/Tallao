const client = require("../../libs/DB_CONNECT");
const GetPublicID = require("../../libs/get/public-id");
const GenerateCustomMessageID = require("../../libs/generate/custom-message-id");
const ExistsCustomMessageID = require("../../libs/exists/custom-message-id");
const validator = require("validator");
module.exports = function(customMessages){
    
    customMessages.put("/update", async function(req,res){
        try{
            const {hashcode, userType} = req.session;
            const laundryInitials = await GetPublicID(userType, hashcode);
            let messages = JSON.parse(req.body.messages);

            Object.values(messages).map(async (messageProps) =>{
                //check if color_tag is a hex color
                if(!validator.isHexColor(messageProps.color_tag)) throw new Error("Not hex color");
     
                if(await ExistsCustomMessageID(messageProps.id) && messageProps.id.includes(laundryInitials)){
                    //it exists, just update message
                    await updateMessage(messageProps);
                }else{
                    messageProps.id = await GenerateCustomMessageID(laundryInitials);
                    //doesn't exists, insert new custom message
                    await insertMessage(laundryInitials, messageProps);
                }
            });

            return res.status(200).end();
        }catch(err){
            console.log(err);
            return res.status(400).end();
        }
        

        
    });
}

async function insertMessage(laundryInitials,{id, color_tag, tag, message}){
    let query = `
        INSERT INTO custom_messages
        (laundry_initials, id, color_tag, tag, message)
        VALUES ($1, $2, $3, $4, $5)
        LIMIT 1;
    `;
    await client.query(query, [laundryInitials, id, color_tag, tag, message]);
}

async function updateMessage({id, color_tag, tag, message}){
    let query = `
        UPDATE custom_messages
        SET color_tag = $1,
            tag = $2,
            message = $3
        WHERE id = $4 
    `;
    await client.query(query, [color_tag, tag, message, id]);
}
