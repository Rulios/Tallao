const {escape} = require("validator");

function escapeObjValues(obj){
    try{
        Object.keys(obj).map(input =>{
            let objValue = obj[input];

            if(typeof objValue === "object"){ //for nested objs
                escapeObjValues(objValue);
            }else if(typeof objValue !== "number"){
                objValue = escape(objValue);
            }

        });
    }catch(err){
        console.error(err);
    }   
    
    return obj;
}

function escapeArrayOfObj(arrObj){
    arrObj.map(obj =>{
        escapeObjValues(obj);
    });
    return arrObj;
}

module.exports = {
    escapeObjValues: escapeObjValues,
    escapeArrayOfObj:escapeArrayOfObj
}