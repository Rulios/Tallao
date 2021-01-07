const validator = require("validator");
const ExistsPublicID = require("../libs/exists/public-id");

module.exports = function(checkExists){
    //validate if exists same laundryInitials on db
    checkExists.get("/LaundryInitials", function(req, res){

        try{
            let inputInitials = req.query.inputInitials;
            //check if exists inputInitials
            if(validator.isEmpty(inputInitials)) return res.status(400).json({error: "MISSING_FIELD", field:"laundryInitials"});
        
            //check if all uppercase
            if(!validator.isUppercase(inputInitials)) return res.status(400).json({error: "NOT_UPPERCASE", field: "laundryInitials"});
            //check if falls into the range of 4-6 characters 
            if(!validator.isByteLength(inputInitials, {min: 4, max:6})) return res.status(400).json({error: "NOT_IN_RANGE", min: 4, max:6});
     
            //query
            ExistsPublicID(inputInitials, "laundry").then(result =>{
                if(result){
                    return res.json({exists: true});
                } else{
                    return res.json({exists: false});
                }
            }).catch((err) => {throw Error(err)});

        }catch(err){
            return res.status(500).send({error: "THERES_A_PROBLEM"});
        } 

    });
}