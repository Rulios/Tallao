"use strict";

const React = require("react");
const AccountFields = require("./AccountFields");
const {fetchAccountCreds} = require("../ajax-requests/user-creds");

function UserDisplay({name, surname, email}){
    console.log(surname);
    return [
        React.createElement(AccountFields.UserNameSurname, {
            key:"UserCredsDisplay",
            name: name,
            surname: surname
        }),
        React.createElement(AccountFields.Email, {key:"EmailDisplay",email: email})
    ];
}

function LaundryDisplay({laundryInitials,laundryName, reprName, 
    reprSurname, email, location}){
    return [
        React.createElement(AccountFields.LaundryInitials, {key:"LaundryInitialsDisplay", initials: laundryInitials}),
        React.createElement(AccountFields.LaundryName, {key:"LaundryNameDisplay", name: laundryName}),
        React.createElement(AccountFields.Location, {key:"LocationDisplay",location: location}),
        React.createElement(AccountFields.LaundryReprNameSurname,{
            key: "LaundryCredsDisplay",
            name: reprName,
            surname: reprSurname
        }),
        React.createElement(AccountFields.Email, {key:"EmailDisplay",email: email}),
    ];
}

async function fetchData(){
    try{
        let {data} = await fetchAccountCreds();
        return data;
    }catch(err){console.error(err);}
}

class AccountCreds extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        fetchData().then(obj =>{
            this.setState(obj);
        });
    }

    render(){
        let Component;
        if(this.state != undefined){
            switch(this.state.userType){
                case "user":
                    Component =  React.createElement(UserDisplay,{
                        name: this.state.name,
                        surname: this.state.surname,
                        email: this.state.email
                    });
                break;

                case "laundry":
                    Component =  React.createElement(LaundryDisplay,{
                        laundryInitials: this.state.initials,
                        laundryName: this.state.name,
                        reprName: this.state.legalreprname,
                        reprSurname: this.state.legalreprsurname,
                        email: this.state.email,
                        location: this.state.location
                    });
                break;
            }
        }else{
            return null;
        }
        return Component;
    }
}

module.exports = AccountCreds;
