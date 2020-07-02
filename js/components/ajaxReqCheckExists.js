requirejs.config({
    paths:{
        jquery: [
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
            "../Tallao/js/lib/jquery"]
    }
});

define(["jquery"], function($){

    async function email(obj){
        //props: inputEmail
        try{
            return await doAJAX("POST", "./php/checkRepEmail.php", obj);
        }catch(err){
            console.error(err);
        }
        
    }

    async function laundryInitials(obj){
        try{
            return await doAJAX("POST", "./php/checkRepInitials.php", obj);
        }catch(err){
            console.error(err);
        }
    }

    return {
        email: email,
        laundryInitials: laundryInitials
    };

});

async function doAJAX(type, url, obj){
    return await $.ajax({
        type: type,
        url: url,
        data: obj

    });
}