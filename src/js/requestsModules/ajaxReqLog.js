const ajaxReq = require("./ajaxReq");

async function login(obj = {}){
    //params: inputEmail, inputPassword, userType
    return await ajaxReq.doAJAX("POST", "./php/DBLog/loginProcess.php", obj);
}

async function logout(){
    //no parameters
    return await ajaxReq.doAJAX("DELETE", "./php/DBLog/logout.php");
}

function urlExists(){
    
    $.ajax({
        url:"./php/DBLogin/loginProcess.php",
        type:'HEAD',
        error: function()
        {
            console.error("ADAWAW");
        },
        success: function()
        {
            console.log("Existe")
        }
    });
   
}

module.exports = {
    login: login,
    logout: logout,
    urlExists: urlExists
};
