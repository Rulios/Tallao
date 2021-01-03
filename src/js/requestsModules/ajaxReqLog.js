const ajaxReq = require("./ajaxReq");

async function login(obj = {}){
    //params: inputEmail, inputPassword, userType
    return await ajaxReq.post("/log/login", obj);
}

async function logout(){
    //no parameters
    return await ajaxReq.post("/log/logout");
}

module.exports = {
    login: login,
    logout: logout,
};
