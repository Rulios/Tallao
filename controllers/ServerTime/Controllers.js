const dayjs = require("dayjs");
const time = require("express").Router();


time.get("/fetch", function(req,res){

    let dateTime = dayjs().format(/* "YYYY-MM-DD HH:MM A" */);
    res.status(200).json({dateTime: dateTime});
 
});

module.exports = time;