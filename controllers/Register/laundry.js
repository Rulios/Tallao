const client = require("../libs/DB_CONNECT");
const validator = require("validator");
const bcrypt = require("bcrypt");
const {checkIfEmpty, trimAllExceptPassword} = require("../libs/inputHelpers");
const LaundryOnce = require("./_laundry-once");
const GenerateUniqueUUID = require("../libs/generate/unique-uuid");
const saltRounds = 10;


module.exports = function(register){

    register.post("/laundry", async function(req,res){
        try{
            let inputs = req.body;
          
            let {exists, field} = checkIfEmpty(inputs);
            if(!exists) return res.status(400).json({error:"MISSING_FIELD", field:field});

            if(!validator.isUppercase(inputs.initials)) return res.status(400).json({error: "NOT_UPPERCASE", field: "laundryInitials"});
            if(!validator.isByteLength(inputs.initials, {min: 4, max:6})) return res.status(400).json({error: "NOT_IN_RANGE", field: "laundryInitials",min: 4, max:6});

            if(!isValidPrefixLaundryName(inputs.laundryName)) return res.status(400).json({error: "NOT_NAMING_LAUNDRY"})

            if(!validator.isEmail(inputs.email)) return res.status(400).json({error: "NOT_EMAIL", field:"email"});

            trimAllExceptPassword(inputs);

            //generate uuid to hashcode
            let hashcode = await GenerateUniqueUUID("laundry");

            let hashedPassword = await bcrypt.hash(inputs.password, saltRounds); 

            let {
                initials, laundryName, location, name, surname, email
            } = inputs; 

            let query = `
                INSERT INTO laundries(initials, hashcode, name, location, legalReprName, legalReprSurname, email, password)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8)
                LIMIT 1
            `;
            let values = [
                initials, hashcode, laundryName, location,
                name, surname, email, hashedPassword
            ];

            await client.query(query,values);

            LaundryOnce(initials);

            return res.status(200).json({status:"OK"});

        }catch(err){
            console.log(err);
            return res.status(500).send({error: "THERES_A_PROBLEM"});
        }
  
    });

}

function isValidPrefixLaundryName(laundryName){
    if(!laundryName.includes("Lavandería") && !laundryName.includes("Lavanderia")){
        return false;
    }
    return true;
}