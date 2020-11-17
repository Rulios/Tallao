const client = require("./DBConnect");
const validator = require("validator");

const userTypeRanges = ["laundry", "user"];

//IMPORTANT DETAIL:
//publicID IS THE GENERAL TERM FOR RELATING BOTH USERTYPES
//FOR THE LAUNDRY USERTYPE IN THE DB IS CALLED AS INITIALS

module.exports = async function(inputEmail, userType){
    let query = "";
    let values = [inputEmail];
    //set tablename depending on the userType
    if(userType === "user"){
        query = "SELECT 1 FROM users WHERE email = $1 LIMIT 1";
    }else if (userType === "laundry"){
        query = "SELECT 1 FROM laundries WHERE email = $1 LIMIT 1";
    }
    
    return (await client.query(query, values)).rowCount;
}