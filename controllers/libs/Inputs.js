const validator = require("validator");

//these functions receives as parameters objects

function escapeAll(obj){
    //escapes all inputs
    Object.keys(obj).map(input =>{
        obj[input] = validator.escape(obj[input]);
    });
}

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

module.exports = {
    escapeAll: escapeAll,
    checkIfEmpty: checkIfEmpty
};