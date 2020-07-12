require.config({
    paths:{
        ajaxReq: "./requestsModules/ajaxReq"
    }
});
define(["ajaxReq"], function(ajaxReq){

    async function email(obj){
        //props: inputEmail, userType
        try{
            return await ajaxReq.doAJAX("POST", "./php/checkRepEmail.php", obj);
        }catch(err){
            console.error(err);
        }
        
    }

    async function laundryInitials(obj){
        //props: inputInitials
        try{
            return await ajaxReq.doAJAX("POST", "./php/checkRepInitials.php", obj);
        }catch(err){
            console.error(err);
        }
    }

    return {
        email: email,
        laundryInitials: laundryInitials
    };

});

