const feedback = require("express").Router();

require("./submit")(feedback);

feedback.get("/", function(req,res){
    res.render("pages/feedback/feedback");
});


module.exports = feedback;