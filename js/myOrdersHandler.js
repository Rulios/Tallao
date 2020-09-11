"use strict";
require.config({
    paths: {
        jquery: [
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
            "./lib/jquery"],
        design: "design.new",
        bootstrap: "./lib/bootstrap.bundle.min",
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development',
        sessionHandler: "frontendModules/sessionHandler",
        SearchOrdersParamHandler: "./reactComponents/SearchOrdersParamHandler"
    },
    shim: {
        bootstrap: {
            deps: ["jquery"]
        },
    }
});
require(["jquery", "react", "react-dom", "design", "bootstrap"], 
function($,React, ReactDOM){ 

    $(document).ready(() =>{

        require(["sessionHandler"], function(session){
            session.check();
        });
        let obj  ={};
        require(["SearchOrdersParamHandler"], function(SearchOrder){
            ReactDOM.render(
                React.createElement(SearchOrder,{
                    getSearchParams: (params) =>{console.log(params)},
                }),
                document.getElementById("SearchOrderParamContainer")
            );
        });

    });

    

    

});

