const client = require("../libs/DBConnect");
const validator = require("validator");
const bcrypt = require("bcrypt");
const {v4 : uuidv4} = require("uuid");
const ExistsUUID = require("../libs/ExistsUUID");
const inputs = require("../libs/Inputs");
const LaundryOnce = require("./LaundryOnce");

const saltRounds = 10;

module.exports.set = function(app){

    app.post("/register/laundryRegister", function(req,res){
        try{
            let {
                inputInitials, inputLaundryName,
                inputLocation, inputName, inputSurname,
                inputEmail, inputPassword
            } = req.body;

            let Inputs = {
                inputInitials: inputInitials,
                inputLaundryName: inputLaundryName,
                inputLocation: inputLocation,
                inputName: inputName,
                inputSurname: inputSurname,
                inputEmail: inputEmail,
                inputPassword: inputPassword
            }
          
            //check if exists the inputs
            let {exists, field} = inputs.checkIfEmpty(Inputs);
            if(!exists) return res.status(400).json({error:"MISSING_FIELD", field:field});
            //check if initials are all uppercase
            if(!validator.isUppercase(Inputs.inputInitials)) return res.status(400).json({error: "NOT_UPPERCASE", field: "laundryInitials"});
            //check if falls into the range of 4-6 characters 
            if(!validator.isByteLength(Inputs.inputInitials, {min: 4, max:6})) return res.status(400).json({error: "NOT_IN_RANGE", min: 4, max:6});
            //check if the laundry name contains the term of "Lavandería"
            if(!Inputs.inputLaundryName.includes("Lavandería") && !Inputs.inputLaundryName.includes("Lavanderia"))
                return res.status(400).json({error: "NOT_NAMING_LAUNDRY"})
            //check if inputEmail is email
            if(!validator.isEmail(Inputs.inputEmail)) return res.status(400).json({error: "NOT_EMAIL", field:"inputEmail"});

            //escape all the inputs
            inputs.escapeAll(Inputs);

            bcrypt.hash(Inputs.inputPassword, saltRounds, async function(err, passwordWHash){
                let {
                    inputInitials: escInitials, inputLaundryName: escLaundryName,
                    inputLocation: escLocation, inputName: escName, inputSurname: escSurname,
                    inputEmail: escEmail 
                } = Inputs;

                //generate uuid to hashcode
                let hashcode = "";
                //check for uuid collisions
                //generate for every collision
                try{
                    let rowCountUUID = 1;
                    do{
                        hashcode = uuidv4();

                        let queryCountUUID = await ExistsUUID(hashcode, "laundry");
                        rowCountUUID = queryCountUUID.rowCount;
                    }while(rowCountUUID);
                }catch(err){
                    throw new Error();
                }
                

                let query = `
                    INSERT INTO laundries(initials, hashcode, name, location, legalReprName, legalReprSurname, email, password)
                    VALUES($1, $2, $3, $4, $5, $6, $7, $8)
                    LIMIT 1
                `;
                let values = [
                    escInitials, hashcode, escLaundryName, escLocation,
                    escName, escSurname, escEmail, passwordWHash
                ];

                await client.query(query,values);

                LaundryOnce(escInitials);

                return res.status(200).json({status:"OK"});
            }); 

        }catch(err){
            console.log(err);
            return res.status(500).send({error: "THERES_A_PROBLEM"});
        }
  
    });

}