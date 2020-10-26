'use strict';
require.config({
    paths:{
        pageRedirection: "./frontendModules/pageRedirection",
        ajaxReq: "./requestsModules/ajaxReq"
    }
});

define(["pageRedirection", "ajaxReq"], function(page, ajaxReq){

    function check(){
        let query =  ajaxReq.doAJAX("GET", "./php_copia/DBSession/keepSession.php")
        query.then(dataJSON =>{
            let data = JSON.parse(dataJSON);

            /* if(!data.status){
                alert("Vuelve a Iniciar Sesión");
                page.bounceToLogin();
            } */
        })
        .catch(err => console.error(err)) ;
    }

    return{
        check:check
    }
    
});