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
        OrderBoxSearchBundle: "./reactComponents/OrderBoxSearchBundle"
    },
    shim: {
        bootstrap: {
            deps: ["jquery"]
        },
    }
});
require(["jquery", "react", "react-dom","OrderBoxSearchBundle", "design", "bootstrap"], 
function($,React, ReactDOM, OrderBoxSearchBundle){ 

    //this file acts like a bundle, since all the components here
    //needs to be connected to a only true source of data

    $(document).ready(() =>{

        require(["sessionHandler"], function(session){
            session.check();
            ReactDOM.render(
                React.createElement(OrderBoxSearchBundle),
                document.getElementById("OrderParamsSelectorContainer")
            )
        });
    });
});
