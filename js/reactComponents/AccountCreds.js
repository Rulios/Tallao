"use strict";

require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        AccountFields: "./reactComponents/AccountFields",
        ajaxReqUserCreds : "./requestsModules/ajaxReqUserCreds",
    }
});

define(["react","AccountFields", "ajaxReqUserCreds"], 
function(React, AccountFields, ajaxReq){
    function UserDisplay({name, surname, email}){
        return [
            React.createElement(AccountFields.UserNameSurname, {
                key:"UserCredsDisplay",
                name: name,
                surname: surname
            }),
            React.createElement(AccountFields.Email, {key:"EmailDisplay",email: email})
        ];
    }

    function LaundryDisplay({laundryInitials,laundryName, reprName, reprSurname, email, location}){
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
            let query = await ajaxReq.fetchAccountCreds();
            let obj = JSON.parse(query);
            return obj;
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
            if(this.state != undefined){
                console.log(this.state);
                switch(this.state.userType){
                    case "user":
                        return React.createElement(UserDisplay,{
                            name: this.state.name,
                            surname: this.state.surname,
                            email: this.state.email
                        });
                    break;

                    case "laundry":
                        return React.createElement(LaundryDisplay,{
                            laundryInitials: this.state.initials,
                            laundryName: this.state.name,
                            reprName: this.state.legalReprName,
                            reprSurname: this.state.legalReprSurname,
                            email: this.state.email,
                            location: this.state.location
                        });
                    break;
                }
            }else{
                return null;
            }
        }
    }
    return AccountCreds;
  
});
