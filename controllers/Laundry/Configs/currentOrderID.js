"use strict";

const GetLastOrderID = require("../../libs/GetLastOrderID");
const GetPublicID = require("../../libs/GetPublicID");
const AdvanceToNextOrderID = require("../../libs/AdvanceToNextOrderID");

module.exports = function(configs){

    configs.get("/currentOrderID", async function(req,res){
        try{
            let {userType, hashcode} = req.session;
            if(userType !== "laundry") return res.status(403).end();

            const LAUNDRY_INITIALS = await GetPublicID(userType, hashcode);
            let {id_char, id_number}  = await GetLastOrderID(LAUNDRY_INITIALS);
            let currentOrderID = AdvanceToNextOrderID(id_char, id_number);


            return res.status(200).json(currentOrderID);

        }catch(err){
            console.log(err);
            return res.status(500).end();
        }
    });

}