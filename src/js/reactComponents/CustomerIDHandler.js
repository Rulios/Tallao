// main.js

const React = require("react");
const {customerByID: searchCustomerByID} = require("../ajax-requests/search");
const {getStaticText} = require("../../../translation/frontend/translator");

//This handler acts when it needs to be rendered a input field
//or text related to the clientID. Also, the main caller will be 
//able to request information about this.


function customerSelector({customerID, customerName, onChangeID, onBlur}){
    return(
        React.createElement("div", {className: "row"},
            React.createElement("div", {
                className: "col-lg-6"
            },
                React.createElement("label", {
                    className: "bold small-rightMargin", htmlFor:"inputCustomerID"}
                , `${getStaticText("customerID")}:`),

                React.createElement("input", {
                    value: customerID,
                    type: "text",
                    maxLength: "6",
                    id:"inputCustomerID",
                    onChange: (e) => onChangeID(e.target.value),
                    onBlur: (e)=> onBlur(),
                })
            ),

            React.createElement("div", {
                className: "col-lg-6"
            },
                React.createElement("span", {
                    className:"bold"
                }
                , `${getStaticText("customer")}:`),
                React.createElement("span", {
                    className: `${(!customerName) ? "redTxt": ""}`
                }, `${(!customerName) ? getStaticText("doesntExists") : customerName}`)
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

    onChangeIDHandler(id){
        id = id.toUpperCase();
        this.setState({id: id});
    }

    searchCustomerByID(){ //handler for attaching a client to a order
        let customer = JSON.parse(JSON.stringify(this.state));

        let that = this; //bind the this to this scope, so it can use setState
        searchCustomerByID({inputCustomerID: customer.id}).then(({data}) =>{
            if(data){
                let {name, surname} = data;
                customer.name = `${name} ${surname}`;
            }else{
                customer.name = null;
            }

            that.setState(customer);
        }).catch(err => {
            customer.name = null;
            that.setState(customer);
        });
    }

    returnData(customer){ //return data when needed by the main component
        this.props.getCustomerData(customer);
    }

    shouldComponentUpdate(newProps, newState){

        let hasNameChanged = this.state.name !== newState.name;
        
        if(hasNameChanged){
            this.returnData(newState);
        }

        if(newProps !== this.props) return false;

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
                    onChangeID: (id) => this.onChangeIDHandler(id),
                    onBlur: () => this.searchCustomerByID()
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