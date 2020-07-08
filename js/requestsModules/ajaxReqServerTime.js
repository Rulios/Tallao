require.config({

    paths:{

        jquery: [
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
            "../Tallao/js/lib/jquery"]
    }

});

define(["ajaxReq"], function(ajaxReq){

    async function fetchDateTimeServer(){

        return await $.ajax({
            type:"POST",
            url:"./php/fetchDateTimeServer.php"
        });

    }

    return {
        fetchDateTimeServer: fetchDateTimeServer
    };

});