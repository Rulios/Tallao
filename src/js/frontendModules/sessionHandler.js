'use strict';
require.config({
    paths:{
        pageRedirection: "./frontendModules/pageRedirection",
        ajaxReq: "./ajax-requests/ajaxReq",
        log: "./ajax-requests/log"
    }
});

define(["pageRedirection", "ajaxReq", "log"], function(page, ajaxReq, log){

    function check(){
        let query =  ajaxReq.doAJAX("GET", "./php/DBSession/keepSession.php")
        query.then(dataJSON =>{

            try{
                let data = JSON.parse(dataJSON);

                if(!data.status) ErrorAction();
            }catch(err){
                ErrorAction();
            }
            
        }).catch(err => console.error(err)) ;
    }


    function ErrorAction(){
        //destroy every session
        log.logout().then(() =>{
            ErrMessage();
        }).catch(err =>{
            ErrMessage();
        });
        
    }
    
    function ErrMessage(){
        alert("Vuelve a Iniciar Sesión");
        page.bounceToLogin();
    }

    return{
        check:check
    };

    

});
