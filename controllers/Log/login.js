"use strict";

const validator = require("validator");
const ValidateSchema = require("./ValidateSchema");
const inputs = require("../libs/Inputs");
const userTypeRange = ["laundry", "user"];



module.exports.set = function(app){

    app.post("/login", async function(req,res){

        /* passport.authenticate("login", async(err, hashcode,userType, info) =>{
            try{
                if(err || !hashcode) throw new Error();
            }catch(err){
                console.log(err);
                return res.status(500).send({error: "WRONG_CREDENTIALS"});
            }

            req.login(hashcode, {session:false}, async (err) =>{
                if(err) return next(err);

                const body = {hashcode: hashcode, userType: userType};
                console.log(body);
                const token = jwt.sign({user: body}, "top_secret");
                console.log(token);
                return res.status(200).json({token});
            });
        })(req,res,next); */
        try{
            let {inputEmail, inputPassword, userType} = req.body;
            let Inputs = {
                inputEmail: inputEmail,
                inputPassword: inputPassword,
                userType: userType
            };
            //check if the userType falls in the range
            if(!validator.isIn(userType, userTypeRange)) throw new Error();
            //check if inputEmail is email
            if(!validator.isEmail(Inputs.inputEmail)) return res.status(400).json({error: "NOT_EMAIL", field:"inputEmail"});

            //escape all the inputs
            inputs.escapeAll(Inputs);

            let validate = await ValidateSchema(Inputs.inputEmail, Inputs.inputPassword, userType);
            let {hashcode, validated} = validate;

            if(validated){
                //create session cookie
                let sess = req.session;
                sess.hashcode = hashcode;
                sess.userType = Inputs.userType;
                return res.status(200).json({login: "OK", userType: Inputs.userType});

            }else{
                //unauthorized
                return res.status(401).send({error: "WRONG_CREDENTIALS"});
            }
        }catch(err){
            console.log(err);
            return res.status(500).send({error: "THERES_A_PROBLEM"});
        }

    });


};