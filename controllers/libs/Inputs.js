const validator = require("validator");



function checkIfEmpty(obj){
    //iterates for all the keys to check if the value is empty
    //If it's empty, it should return a false statement with a field value
    //ONLY FOR STRING VALUES
    Object.keys(obj).map(input =>{
        if(validator.isEmpty(obj[input]))
            return {exists: false, field: input};
    })
    return {exists: true};
}

function trimAllExceptPassword(inputs){
    Object.keys(inputs).map(input =>{
        if(input !== "password") inputs[input] = inputs[input].trim();
    });
}

module.exports = {
    checkIfEmpty: checkIfEmpty,
    trimAllExceptPassword:trimAllExceptPassword
};