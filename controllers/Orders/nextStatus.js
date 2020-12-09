const client = require("../libs/DBConnect");
const GetLaundryInitials = require("../libs/GetLaundryInitials");
const isOrderNotation = require("../libs/isOrderNotation");

const ORDER_STATUS = require("../../meta/ORDER_STATUS");

module.exports = function(orders){

    orders.put("/nextStatus", async function(req,res){

        try{
            let {hashcode, userType} = req.session;
            if(userType !== "laundry") throw new Error("Not usertype");
            let laundryInitials = await GetLaundryInitials(hashcode);
            let {id_char, id_number} = req.body;

            if(!isOrderNotation(id_char, id_number)) return res.status(400).json({error: "NOT_ORDER_NOTATION"});

            let currentStatus = await getCurrentOrderStatus(laundryInitials, id_char, id_number);
            let nextStatus = goToNextStatus(currentStatus);

            if(!nextStatus) return res.status(200).json({message: "ALREADY_IN_LAST_STATUS"});
            //query

            let query = `
                UPDATE orders 
                SET status = $1
                WHERE laundry_initials = $2
                AND id_char = $3
                AND id_number = $4;
            `;

            await client.query(query, [nextStatus, laundryInitials, id_char, id_number]);
            return res.status(200).end();

        }catch(err){
            console.log(err);
            return res.status(500).end();
        }
    });
}

async function getCurrentOrderStatus(laundryInitials, id_char, id_number){
    let query = `
        SELECT status 
        FROM orders
        WHERE laundry_initials= $1
        AND id_char = $2
        AND id_number = $3 
        LIMIT 1;
    `;

    return (await client.query(query, [laundryInitials, id_char, id_number])).rows[0].status;
}

function goToNextStatus(currentStatus){
    let currentStatusIndex = ORDER_STATUS.indexOf(currentStatus); 

    //check if the current status is the same as the last status
    if(currentStatusIndex === ORDER_STATUS.length -1) return null;
    //go to the next status
    return ORDER_STATUS[currentStatusIndex + 1];
}
