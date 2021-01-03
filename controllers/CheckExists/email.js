const validator = require("validator");
const ExistsEmail = require("../libs/ExistsEmail");
const USER_TYPES = require("../../meta/USER_TYPES");

module.exports = function(checkExists){
    //validate if exists the same email on db
    checkExists.get("/Email", function(req, res){
        try{
            let inputEmail = req.query.inputEmail;
            let userType = req.query.userType;
            
            //check if exists inputEmail
            if(validator.isEmpty(inputEmail)) return res.status(400).json({error: "MISSING_FIELD", field:"inputEmail"});
            //check if inputEmail is email
            if(!validator.isEmail(inputEmail)) return res.status(400).json({error: "NOT_EMAIL", field:"inputEmail"});
            //check if exists userType
            if(validator.isEmpty(userType)) return res.status(403).end();
            //check if userType falls in the range
            if(!validator.isIn(userType, USER_TYPES)) return res.status(403).end();


            ExistsEmail(inputEmail, userType).then(result =>{
                if(result){
                    return res.json({exists: true});
                } else{
                    return res.json({exists: false});
                }
            }).catch((err) => {console.log(err);throw Error(err);});

        }catch(err){
            return res.status(500).send({error: "THERES_A_PROBLEM"});
        } 
    });
}