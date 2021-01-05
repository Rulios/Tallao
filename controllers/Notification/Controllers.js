const notification = require("express").Router();

require("./fetch-notifications")(notification);

notification.get("/", function(req,res){
    return res.redirect("/");
});


module.exports = notification;