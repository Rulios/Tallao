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
        formVerification:["frontendModules/formVerification"],
        sessionHandler: "frontendModules/sessionHandler",
        AccountCreds: "./reactComponents/AccountCreds",
        ChangePasswordHandler: "./reactComponents/ChangePasswordHandler"
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

        require(["AccountCreds"], function(AccountCreds){
            ReactDOM.render(
                React.createElement(AccountCreds),
                document.getElementById("accountCredsContainer")
            );
          
        });

        require(["ChangePasswordHandler"], function(ChangePassword){
            ReactDOM.render(
                React.createElement(ChangePassword),
                document.getElementById("changePasswordContainer")
            )
        });

    });

    class Main extends React.Component{
        constructor(props){
            super(props);
        }
    }

});