define(["ajaxReq"], function(ajaxReq){

    async function registerUser(obj = {}){
        //props: id, inputName, inputLastname, inputEmail, inputPassword
        //      inputTargetMarket

        try{
            return await ajaxReq.doAJAX("POST", "./php/register.php", obj);
        }catch(err){
            console.error(err);
        };
    }

    async function registerSuperUser(obj= {}){
        //props: inputInitials, inputLaundryName, inputLocation
        //inputName, inputLastname, inputEmail, inputPassword
        try{

            return await ajaxReq.doAJAX("POST", "./php/masterRegister.php", obj);

        }catch(err){
            console.error(err);
        }

    }

    return {
        registerUser: registerUser,
        registerSuperUser: registerSuperUser
    };

});
