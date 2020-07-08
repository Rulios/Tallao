require.config({
    paths:{
        jquery: [
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
            "../Tallao/js/lib/jquery"]
    }
});
define(["jquery"], function($){

    async function doAJAX(type, url, obj){
        return await $.ajax({
            type: type,
            url: url,
            data: obj
        });
    }
    return {
        doAJAX: doAJAX
    };

});
