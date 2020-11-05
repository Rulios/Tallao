'use strict';

require.config({
    paths:{
        jquery: [
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
            "./lib/jquery"],
        design: "design",
        bootstrap: ["./lib/bootstrap.bundle.min"],
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development',
        sessionHandler: "frontendModules/sessionHandler",
        ajaxReqUserCreds : "./requestsModules/ajaxReqUserCreds",
        ajaxReqOrders: "./requestsModules/ajaxReqOrders",
        Time: "./reactComponents/Time",
        Navbar: "./reactComponents/NavbarHandler"
    },
    shim: {
        bootstrap: {
            deps: ["jquery"]
        },
    }
});
require(["jquery", "react", "react-dom", "design", "bootstrap"], 
function($,React, ReactDOM){

    require(["sessionHandler"], function(session){
        session.check();

        RenderNavbar();
        /* ReactDOM.render(
            React.createElement(Main, {}),
            document.getElementById("root")
        ); */
    });


    function Main(){
        return null;
    }

    function RenderNavbar(){
        require(["Navbar"], function(Navbar){
            ReactDOM.render(
                React.createElement(Navbar, {
                    componentList: [
                        "Logo", 
                        "MyOrders",
                        "MyAccount",
                        "Logout",
                        "LanguageSelect"
                    ]
                }), document.getElementById("NavbarContainer")
            );
        });
    }

});
