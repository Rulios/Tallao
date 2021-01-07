"use strict";

const validator = require("validator");
const ExistsHashCode = require("./exists/hash-code");

//middlewares to validate if the user w/ its usertype can access the resource

module.exports = async function(hashcode, userType){
    try{
        if(validator.isEmpty(hashcode)) throw new Error("Empty hashcode");
        if(!validator.isUUID(hashcode)) throw new Error("NOT UUID");
        
        if(await ExistsHashCode(hashcode, userType)){
            return true;
        }else{
            return false;
        }
    }catch(err){
        console.error(err);
        return false;
    }
}
