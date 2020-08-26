require.config({
    paths:{
        ajaxReq: "./requestsModules/ajaxReq"
    }
});
define(["ajaxReq"], function(ajaxReq){
    //This module has functions that involves all the AJAX requests 
    //within the limits of User Credentials.

    async function verifyPassword(obj){
        //params: inputPassword (string, to be convalidate with DB data)
        return await ajaxReq.doAJAX("POST", "./php_copia/DBUserCreds/verifyPassword.php", obj);
    }

    async function newPassword(obj){
        //params: inputPassword(string, must be validated first)

        return await ajaxReq.doAJAX("POST", "./php_copia/DBUserCreds/updateNewPassword.php", obj);
    }

    async function fetchAccountCreds(){
        //paarams: none, it's on server side

        return await ajaxReq.doAJAX("POST", "./php_copia/DBUserCreds/fetchAccountCreds.php");
    }

    return{
        verifyPassword: verifyPassword,
        newPassword: newPassword,
        fetchAccountCreds: fetchAccountCreds
    };

});
