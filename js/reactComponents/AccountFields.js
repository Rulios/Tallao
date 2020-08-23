"use strict";

require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        FieldDisplayDiv: "./reactComponents/FieldDisplayDiv"
    }
});

define(["react", "FieldDisplayDiv"], function(React, FieldDisplayDiv){

    function UserNameSurnameContainer({name, lastName}){
        return(
            React.createElement(FieldDisplayDiv.TwoFieldDisplay,{
                field1: "Nombre",
                value1: name,
                field2: "Apellido",
                value2: lastName
            })
        );
    }

    function LaundryReprNameSurnameContainer({name, surname}){
        return(
            React.createElement(FieldDisplayDiv.TwoFieldDisplay,{
                field1: "Nombre del Representante Legal:",
                value1: name,
                field2: "Apellido del Representante Legal:",
                value2: surname
            })
        );
    }

    function LaundryInitialsContainer({initials}){
        return React.createElement(FieldDisplayDiv.OneFieldDisplay, {
            field:"Abreviatura de la lavandería:",
            value: initials
        })
    }

    function LaundryNameContainer({name}){
        return React.createElement(FieldDisplayDiv.OneFieldDisplay,{
            field: "Nombre de la lavandería:",
            value: name
        })
    }

    function EmailContainer({email}){
        return(
            React.createElement(FieldDisplayDiv.OneFieldDisplay,{
                field: "Correo Electrónico:",
                value: email
            })
        );
    }  

    function LocationContainer({location}){
        return(
            React.createElement(FieldDisplayDiv.OneFieldDisplay, {
                field: "Ubicación:",
                value: location
            })
        );
    }

    return{
        UserNameSurname:UserNameSurnameContainer,
        LaundryReprNameSurname: LaundryReprNameSurnameContainer,
        Email: EmailContainer,
        Location: LocationContainer,
        LaundryInitials: LaundryInitialsContainer,
        LaundryName: LaundryNameContainer,
        LaundryInitials: LaundryInitialsContainer
    }
});

