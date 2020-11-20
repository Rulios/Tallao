"use strict";

const serviceOffer = require("express").Router();
const { default: validator } = require("validator");
const client = require("../../libs/DBConnect");
const GetLaundryInitials = require("../../libs/GetLaundryInitials");

const SERVICEOFFER_STRINGS = [
    "iron", "washIron", "wash", "dryClean"
];

serviceOffer.get("/fetch", async function(req, res){
    let {hashcode, userType} = req.session;
    let laundryInitials = "";
    let query = `
        SELECT serviceOffer FROM laundries
        WHERE initials = $1 
        LIMIT 1;
    `;

    if(userType === "laundry"){
        laundryInitials = await GetLaundryInitials(hashcode);
    }else if (userType === "user"){
        laundryInitials = req.body.laundryInitials;
    }

    return res.json((await client.query(query, [laundryInitials])).rows[0]);
});

serviceOffer.put("/update", async function(req,res){
    try{
        let {hashcode, userType} = req.session;
        let serviceOffer = req.body;
        if(!validator.isIn(serviceOffer, SERVICEOFFER_STRINGS)) return res.status(400).end();

        let query = `
            UPDATE  laundries 
            SET serviceOffer = $1
            WHERE hashcode = $2
        `;

        await client.query(query, [JSON.stringify(serviceOffer), hashcode]);
        return res.status(200).json({message: "OK"});


    }catch(err){
        console.log(err);
        return res.status(500).end();
    }
    
});

module.exports = serviceOffer;