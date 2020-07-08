
define(["ajaxReq"], function(ajaxReq){

    async function email(obj){
        //props: inputEmail
        try{
            return await ajaxReq.doAJAX("POST", "./php/checkRepEmail.php", obj);
        }catch(err){
            console.error(err);
        }
        
    }

    async function laundryInitials(obj){
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

