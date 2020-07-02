requirejs.config({
    paths:{
        jquery: [
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
            "../Tallao/js/lib/jquery"]
    }
});

define(["jquery"], function($){

    async function registerUser(obj = {}){
        //props: id, inputName, inputLastname, inputEmail, inputPassword
        //      inputTargetMarket

        try{

            return await doAJAX("POST", "./php/register.php", obj);

        }catch(err){
            console.error(err);
        };
    }

    async function registerSuperUser(obj= {}){
        //props: inputInitials, inputLaundryName, inputLocation
        //inputName, inputLastname, inputEmail, inputPassword
        try{

            return await doAJAX("POST", "./php/masterRegister.php", obj);

        }catch(err){
            console.error(err);
        }

    }

    return {
        registerUser: registerUser,
        registerSuperUser: registerSuperUser
    };

});

async function doAJAX(type, url, obj){

    return await $.ajax({

        type: type,
        url: url,
        data: obj

    });

}