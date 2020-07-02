requirejs.config({
    paths:{
        jquery: [
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
            "../Tallao/js/lib/jquery"]
    }
});

define(["jquery"], function($){

    async function login(obj ={}){
        try{
            return await $.ajax({
                type: "method",
                url: "url",
                data: "data",
                dataType: "dataType",
                
            });
        }catch(err){
            console.error(err);
        }
    }

    return {login: login};
});