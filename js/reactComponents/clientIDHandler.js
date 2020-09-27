// main.js
require.config({
    // module name mapped to CDN url
    paths: {
        // Require.js appends `.js` extension for you
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development',
        inputPrevent: "./frontendModules/inputPrevent"
    }
});
define(['react', 'react-dom', "inputPrevent"], function(React, ReactDOM, inputPrevent){

    //This handler acts when it needs to be rendered a input field
    //or text related to the clientID. Also, the main caller will be 
    //able to request information about this.

    const textEs = {
        clientID: "ID del Cliente",
        notExists: "No existe",
        client: "Cliente"
    };

    function clientSelector(props){
        return(
            React.createElement("div", {className: "row"},
                React.createElement("div", {
                    className: "col-lg-6"
                },
                    React.createElement("label", {
                        className: "bold small-rightMargin", htmlFor:"inputClientID"}
                    , `${textEs.clientID}:`),

                    React.createElement("input", {
                        value: props.clientID,
                        type: "text",
                        maxLength: "6",
                        id:"inputClientID",
                        onChange: (e)=>{props.onChangeID(e)},
                    })
                ),

                React.createElement("div", {
                    className: "col-lg-6"
                },
                    React.createElement("span", {
                        className:"bold"
                    }
                    , `${textEs.client}:`),
                    React.createElement("span", {
                        className: `${(!props.clientName) ? "redTxt": ""}`
                    }, `${(!props.clientName) ? textEs.notExists : props.clientName}`)
                )
            )
        );  
    }

    class InputClientID extends React.Component{
        //props: mode (onOrder),
        //idInputClientID (id of container to render)
        constructor(props){
            super(props);

            this.state = {
                client: {
                    id: "",
                    name: ""
                }
            };
        }

        searchClientByID(e){ //handler for attaching a client to a order
            let clientData = JSON.parse(JSON.stringify(this.state.client));
            let that = this; //bind the this to this scope, so it can use setState
            clientData.id = e.target.value.toUpperCase();

            require(["../js/requestsModules/ajaxReqSearch"], function(ajaxReq){
                ajaxReq.clientID({inputClientID: clientData.id}).then(data =>{
                    data = JSON.parse(data);
                    if(data === null){
                        clientData.name = null;
                    }else{
                        clientData.name = `${data.name} ${data.surname}`;
                    }
                    that.returnData(clientData);
                    that.setState({
                        client: clientData
                    });
                }).catch(err => {
                    clientData.name = null;
                    that.setState({
                        client: clientData
                    })
                });
            });
        }

        returnData(clientData){ //return data when needed by the main component
            this.props.getClientData(clientData);
        }

        render(){
            if(this.props.mode === "search"){
                return(
                    React.createElement(clientSelector,{
                        clientID: this.state.client.id,
                        clientName: this.state.client.name,
                        onChangeID: (e) =>{this.searchClientByID(e);}
                    })
                );
            }
        }
            
    }

    return InputClientID;
});

//example of inputClientID
/* <div class="row">
    <div class="col-lg-6">
        <span id="spnTagIDClient"><b>ID del Cliente</b></span>
        <span name="inputClientID">
            <input type="text" maxlength="5" id="inputClientID">
        </span>
        
        
    </div>

    <div class="col-lg-6">
        <span name="spnReceiptClientNameTag" ><b>Cliente:</b></span>
        <span name="spnReceiptClientNameData"></span>
    </div>
</div> */