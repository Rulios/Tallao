require.config({
    paths:{
        ajaxReq: "./requestsModules/ajaxReq"
    }
});
define(["ajaxReq"], function(ajaxReq){
    async function login(obj = {}){
        //params: inputEmail, inputPassword, userType
        return await ajaxReq.doAJAX("POST", "./php_copia/DBLogin/loginProcess.php", obj);
    }

    function urlExists(){
        
        let url = "./php_copia/DBLogin/loginProcess.php";
        console.log(url);
        $.ajax({
            url:"./php_copia/DBLogin/loginProcess.php",
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

    return {
        login: login,
        urlExists: urlExists
    };
});