"use strict";

const getLastOrderID = require("../../libs/get/last-order-id");
const getPublicID = require("../../libs/get/public-id");
const advanceToNextOrderID = require("../../Orders/helpers/advance-to-next-order-id");

module.exports = function(configs){

    configs.get("/currentOrderID", async function(req,res){
        try{
            let {userType, hashcode} = req.session;
            if(userType !== "laundry") return res.status(403).end();

            const LAUNDRY_INITIALS = await getPublicID(userType, hashcode);
            let {id_char, id_number}  = await getLastOrderID(LAUNDRY_INITIALS);
            let currentOrderID = advanceToNextOrderID(id_char, id_number);


            return res.status(200).json(currentOrderID);

        }catch(err){
            console.log(err);
            return res.status(500).end();
        }
    });

}