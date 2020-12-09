const {isAlpha, isInt} = require("validator");
module.exports = function(char, number){
    try{
        if(!isAlpha(char)) return false;
        if(!isInt(number.toString())) return false;
        return true;
    }catch(err){
        return false;
    }
}