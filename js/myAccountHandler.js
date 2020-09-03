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
        ChangePasswordHandler: "./reactComponents/ChangePasswordHandler",
        ScheduleHandler: "./reactComponents/ScheduleHandler",
        EditServiceOfferHandler: "./reactComponents/EditServiceOfferHandler",
        EditElementsPriceHandler: "./reactComponents/EditElementsPriceHandler",
        EditCustomMessagesHandler: "./reactComponents/EditCustomMessagesHandler"
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
            );
        });

        require(["ScheduleHandler"], function(Schedule){
            ReactDOM.render(
                React.createElement(Schedule, {
                    mode: "edit"
                }),
                document.getElementById("divScheduleAppend")
            );
        });

        require(["EditServiceOfferHandler"], function(ServiceOfferHandler){
            ReactDOM.render(
                React.createElement(ServiceOfferHandler, {}),
                document.getElementById("ServiceOfferEditContainer")
            );
        });

        require(["EditElementsPriceHandler"], function(EditElementsPriceHandler){
            ReactDOM.render(
                React.createElement(EditElementsPriceHandler, {
                    service: "iron",
                }),
                document.getElementById("EditElementsPriceContainer")
            )
        });

        require(["EditCustomMessagesHandler"], function(EditCustomMessagesHandler){
            console.log(EditCustomMessagesHandler);
            ReactDOM.render(
                React.createElement(EditCustomMessagesHandler, {}),
                document.getElementById("divAppendCustomMessages")
            );
        });

    });

    class Main extends React.Component{
        constructor(props){
            super(props);
        }
    }

});