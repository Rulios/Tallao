"use strict";

const elementsPrice = require("express").Router();
const client = require("../../libs/DB_CONNECT");
const GetPublicID = require("../../libs/get/public-id");
const validator = require("validator");
const SERVICES = require("../../../meta/SERVICES");
const {ELEMENTS, EXTRAS_ELEMENTS} = require("../../../meta/ELEMENTS");

elementsPrice.get("/fetch", async function(req,res){
    try{
        let {hashcode, userType} = req.session;
        let laundryInitials = "";
        let query = `
            SELECT iron, wash, wash_iron, dry_clean, extras FROM price_chart 
            WHERE laundry_initials= $1
            LIMIT 1;
        `;

        if(userType === "laundry"){
            laundryInitials = await GetPublicID(userType, hashcode);
        }else if (userType === "user"){
            laundryInitials = req.body.laundryInitials;
        }

        let result = (await client.query(query, [laundryInitials])).rows[0];
        
        return res.json(result);
    }catch(err){
        res.status(400).end();
    }
});

elementsPrice.put("/update", async function(req,res){
    try{
        let {hashcode, userType} = req.session;
        let {elementsPrice} = req.body;
        let laundry_initials = await GetPublicID(userType, hashcode);

        validateElementsPrice(elementsPrice);

        let query = `
            UPDATE price_chart
            SET iron = $1, wash_iron = $2,
                wash = $3, dry_clean = $4,
                extras = $5
            WHERE laundry_initials = $6
            ;
        `; 
        let jsonElementsPrice = stringifyObj(elementsPrice);

        let values = [
            jsonElementsPrice["iron"],
            jsonElementsPrice["wash_iron"],
            jsonElementsPrice["wash"],
            jsonElementsPrice["dry_clean"],
            jsonElementsPrice["extras"],
            laundry_initials
        ];

        let result = await client.query(query, values);
        if(!result.rowCount) return res.status(500).end();

        return res.status(200).json({message: "OK"});
    }catch(err){
        console.log(err);
        return res.status(400).end();
    }
});

function validateElementsPrice(elementsPrice){
    //iterate for every service 
    Object.keys(elementsPrice).map(service =>{
        //check if the prop name is not name extras and if it falls in the range
        if(service !== "extras" && !validator.isIn(service, SERVICES)) throw new Error("Not format");
        //iterate for every element
        Object.keys(elementsPrice[service]).map(element =>{
            //check if element exists in the CONSTANT unless it's hook
            //console.log(element);
            if((element !== "hook" && !validator.isIn(element, ELEMENTS)) && !validator.isIn(element, EXTRAS_ELEMENTS)) throw new Error("Element not in range");
            //check if the price is negative
            if(elementsPrice[service][element] < 0) throw new Error("Prices cannot be negative");
            //check if the price is decimal
            if(!validator.isDecimal(elementsPrice[service][element].toString())) throw new Error("Price not decimal");
        });
    });
    return true;
}

function stringifyObj(obj){
    let newObj = {};
    //stringifies all the nested objs in a obj
    Object.keys(obj).map(element =>{
        newObj[element] = JSON.stringify(obj[element]);
    });
    return newObj;
}



module.exports = elementsPrice;