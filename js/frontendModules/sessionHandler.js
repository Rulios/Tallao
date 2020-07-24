'use strict';
require.config({
    paths:{
        jquery: [
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
            "./lib/jquery"],
        pageRedirection: "./frontendModules/pageRedirection",
        ajaxReq: "./requestsModules/ajaxReq"
    }
});

define(["jquery", "pageRedirection", "ajaxReq"], function($, page, ajaxReq){

     function check(){
        let query =  ajaxReq.doAJAX("POST", "./php_copia/DBSession/keepSession.php")
        query.then(dataJSON =>{
            let data = JSON.parse(dataJSON);
            if(!data.status){
                alert("Vuelve a Iniciar Sesión");
                page.bounceToLogin();
            }
        })
        .catch(err => console.error(err)) ;
    }

    return{
        check:check
    }
    
});