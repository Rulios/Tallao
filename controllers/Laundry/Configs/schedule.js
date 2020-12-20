"use strict";

const schedule = require("express").Router();
const client = require("../../libs/DBConnect");
const GetPublicID = require("../../libs/GetPublicID");
const validator = require("validator");
const {DAYS, NAME_RANGE_HOURS} = require("../../libs/CONSTANTS");


schedule.get("/fetch", async function(req,res){
    let {hashcode, userType} = req.session;
    let laundryInitials = "";
    let query = `
        SELECT schedule FROM laundries
        WHERE initials = $1 
        LIMIT 1;
    `;

    if(userType === "laundry"){
        laundryInitials = await GetPublicID(userType, hashcode);
    }else if (userType === "user"){
        laundryInitials = req.body.laundryInitials;
    }

    return res.json((await client.query(query, [laundryInitials])).rows[0]);
});


schedule.put("/update", async function(req,res){
    try{
        let {hashcode, userType} = req.session;
        let schedule = req.body;
        if(!validateScheduleFormat(schedule)) return res.status(400).end();

        let query = `
            UPDATE  laundries 
            SET schedule = $1
            WHERE hashcode = $2
        `;

        await client.query(query, [JSON.stringify(schedule), hashcode]);
        return res.status(200).json({message: "OK"});


    }catch(err){
        console.log(err);
        return res.status(500).end();
    }
    
});

module.exports = schedule;

function validateScheduleFormat(scheduleObj){
    try{
        ///iterate for every day
        Object.keys(scheduleObj).map(days =>{
            //check if falls in the days range
            if(!validator.isIn(days, DAYS)) throw new Error("not falling in days");
            //iterate for every range hour (startHour, endHour) in a day
            Object.keys(scheduleObj[days]).map(rangeHours =>{
                //check if the prop name falls in the range 
                if(!validator.isIn(rangeHours, NAME_RANGE_HOURS)) throw new Error("name not in range hours");
                //check if the value is in a time format (24h)
                if(!checkIfTime(scheduleObj[days][rangeHours])) throw new Error("not a time format");
            });
        });
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}

function checkIfTime(time){
    try{
        if(time){ //it doesn't matter if time is empty
            const [hours, minutes] = time.split(":");
            if(!validator.isInt(hours.toString())) throw new Error(`${hours} not int hours`);
            if(!validator.isInt(minutes.toString())) throw new Error("not int minutes");
        }
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
    
}