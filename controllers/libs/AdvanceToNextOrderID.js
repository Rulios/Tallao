module.exports = function(idChar, idNumber){
    const LIMIT = 10000;

    if(idNumber === LIMIT){
        //advances to the next ASCII character
        return {idChar: GetNextChar(idChar), idNumber: 0};
    }else{
        //just increments the id_number
        return {idChar: idChar, idNumber: Number(idNumber+1)};
    }
}