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

    function clientSelector(props){
        return(
            React.createElement("div", {className: "row"},
                React.createElement("div", {
                    className: "col-lg-6"
                },
                    React.createElement("label", {
                        className: "bold", htmlFor:"inputClientID"}
                    , "ID del Cliente"),

                    React.createElement("input", {
                        value: props.clientID,
                        type: "text",
                        maxLength: "5",
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
                    , "Cliente:"),
                    React.createElement("span", {
                        className: `${(props.clientName === "none") ? "redTxt": ""}`
                    }, `${(props.clientName === "none") ? "No Existe" : props.clientName}`)
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
                        clientData.name = "none";
                    }else{
                        clientData.name = `${data.name} ${data.lastname}`;
                    }

                    that.setState({
                        client: clientData
                    });
                }).catch(err => console.error(err));
            });
        }

        returnData(){ //return data when needed by the main handler
            return this.state.client;
        }

        render(){
            if(this.props.mode === "onOrder"){
                return(
                    React.createElement(clientSelector,{
                        clientID: this.state.client.id,
                        clientName: this.state.client.name
                    })
                );
            }
        }
            
    }

    return{
        InputClientID: InputClientID
    }
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