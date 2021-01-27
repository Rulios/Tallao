const dayjs = require("dayjs");
const time = require("express").Router();


time.get("/fetch", function(req,res){

    let dateTime = dayjs();
    
    return res.status(200).json({dateTime: dateTime});
 
});

module.exports = time;