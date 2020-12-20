const client = require("../libs/DBConnect");
const {isLength} = require("validator");
const GetCustomerNameByID = require("../libs/GetCustomerNameByID");
const isOrderNotation = require("../libs/isOrderNotation");
const GetPublicID = require("../libs/GetPublicID");
module.exports = function(orders){
    orders.put("/updateCustomerAffiliate", async function(req,res){
        
        try{
            const {userType, hashcode} = req.session;
            let {orderID: {id_char, id_number}, customerID} = req.body;
            if(userType !== "laundry") return res.status(403).end();
            let laundry_initials = await GetPublicID(userType, hashcode);
            let customerName = "";
            //check for correct order notation
            if(!isOrderNotation(id_char, id_number)) return res.status(400).json({error : "NOT_ORDER_NOTATION"});
            
            //check if the customerId falls in range
            if(!isLength(customerID, 5,6)) return res.status(400).json({error: "NOT_IN_RANGE", field:"customerID"});
    
            //get customer name by id
            customerName = await GetCustomerNameByID(customerID);
            if(!customerName) return res.status(400).json({error: "WRONG_PUBLIC_ID"});
            
            //query
            let query = `
                UPDATE orders
                SET customer_id = $1::varchar,
                    customer_name = $2::varchar
                WHERE id = $3
                AND laundry_initials = $4; 
            `;
            
            let result = await client.query(query, [customerID, customerName, `${id_char}${id_number}`, laundry_initials]);
            if(!result.rowCount) return res.status(400).end();

            return res.status(200).json("OK");
        }catch(err){
            console.log(err);
        }
    
    });
}