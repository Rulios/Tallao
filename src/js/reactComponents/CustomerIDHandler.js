// main.js

const React = require("react");
const ajaxReqSearch = require("../ajax-requests/search");


//This handler acts when it needs to be rendered a input field
//or text related to the clientID. Also, the main caller will be 
//able to request information about this.

const textEs = {
    customerID: "ID del Cliente",
    notExists: "No existe",
    customer: "Cliente"
};

function customerSelector({customerID, customerName, onChangeID}){
    return(
        React.createElement("div", {className: "row"},
            React.createElement("div", {
                className: "col-lg-6"
            },
                React.createElement("label", {
                    className: "bold small-rightMargin", htmlFor:"inputCustomerID"}
                , `${textEs.customerID}:`),

                React.createElement("input", {
                    value: customerID,
                    type: "text",
                    maxLength: "6",
                    id:"inputCustomerID",
                    onChange: (e)=>onChangeID(e.target.value),
                })
            ),

            React.createElement("div", {
                className: "col-lg-6"
            },
                React.createElement("span", {
                    className:"bold"
                }
                , `${textEs.customer}:`),
                React.createElement("span", {
                    className: `${(!customerName) ? "redTxt": ""}`
                }, `${(!customerName) ? textEs.notExists : customerName}`)
            )
        )
    );  
}

class InputCustomerID extends React.Component{
    //props: mode (onOrder),
    //idInputClientID (id of container to render)
    constructor(props){
        super(props);

        this.state = {
            id: "",
            name: ""
        };
    }

    searchCustomerByID(id){ //handler for attaching a client to a order
        let customerData = JSON.parse(JSON.stringify(this.state));
        
        let that = this; //bind the this to this scope, so it can use setState
        customerData.id = id.toUpperCase();
        ajaxReqSearch.customerByID({inputCustomerID: customerData.id}).then(({data}) =>{
            if(data){
                customerData.name = `${data.name} ${data.surname}`;
            }else{
                customerData.name = null;
            }
            that.setState(customerData);
        }).catch(err => {
            customerData.name = null;
            that.setState(customerData);
        });
    }

    returnData(customer){ //return data when needed by the main component
        this.props.getCustomerData(customer);
    }

    shouldComponentUpdate(newProps, newState){
        if(newProps !== this.props) return false;
        this.returnData(newState);
        return true;
    }

    componentDidUpdate(prevProps, prevState){
        //check if reset
        if(!prevProps.reset && this.props.reset){
            this.setState({id:"", name:""});
        }
    }

    render(){
        if(this.props.mode === "search"){
            return(
                React.createElement(customerSelector,{
                    customerID: this.state.id,
                    customerName: this.state.name,
                    onChangeID: (id) => this.searchCustomerByID(id)
                })
            );
        }
    }
        
}

module.exports = InputCustomerID;

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