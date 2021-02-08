const feedback = require("express").Router();
const getLanguageStrings = require("../../translation/backend/get-language-strings");


require("./submit")(feedback);

feedback.get("/", function(req,res){
    res.render("pages/feedback/feedback", Object.assign(getLanguageStrings(req)));
});


module.exports = feedback;