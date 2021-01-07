"use strict";

require( "core-js/stable");
require("regenerator-runtime/runtime");

const React = require("react");
const ReactDOM = require("react-dom");

const OrderBoxHandler = require("./reactComponents/OrderBoxHandler");
const OrderParamsSelectorHandler = require("./reactComponents/OrderParamsSelectorHandler");
const OrderModalHandler = require("./reactComponents/OrderModalHandler");
const Time =  require("./reactComponents/Time");
const orders =  require("./ajax-requests/orders");
const {getUserType} = require("./ajax-requests/user-creds");
const Navbar =  require("./reactComponents/NavbarHandler");
const convertArrToObj = require("./frontendModules/convertArrToObj");

const io = require("socket.io-client");

let socket;


//this file acts like a bundle, since all the components here
//needs to be connected to a only true source of data


window.onload = function(){
    

    //get the userType first, so it can render the component depending on that
    getUserType().then(({data : userType}) =>{

        if(userType === "laundry"){
            socket = io.connect("/laundry");
        }else if(userType === "user"){
            socket = io.connect("/user");
        }

        socket.on("connect", () =>{
            console.log("socket connected");
        })


        RenderNavbar(userType);
        ReactDOM.render(
            React.createElement(SearchOrderByParams, {
                userType:  userType
            }),
            document.getElementById("OrderParamsSelectorContainer")
        );
    }).catch(err =>{
        console.err(err);
    });

    

}

class SearchOrderByParams extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            searchParams: {
                paramSelected: "",
                statusSelected: "",
                elementsToFetch: 10
            },
            inputsParams: {
                date: {
                    start: "",
                    end: ""
                },
                hour:{
                    start: "",
                    end: ""
                },
                order: {
                    char: "A",
                    number: 0
                },
                txt: ""
            },
            orders: {},
            isFirstOrdersLoaded: false,
            isModalPoppedOut: false,
            orderInModal: "",
            todayDateTime: {}
        }
    }

  
    processOrders(){
        getOrders({
            paramsProps: this.state.searchParams,
            inputs: this.state.inputsParams
        }).then((response) =>{
            if(typeof response !== "undefined"){
                if(response.status === 200){
                    let {data: orders} = response;  
                    let newOrders = JSON.parse(JSON.stringify(this.state.orders));
                    newOrders = Object.assign(newOrders, convertArrToObj(orders));
                    this.setState({
                        isFirstOrdersLoaded: true,
                        orders: newOrders
                    });
                }
            }
            
        }).catch(err => console.error(err));
    }

    onClickOrderBoxHandler(){
        //show modal
        //since setState is async, we need to unmount the 
        //component the first click, not the second one
        //this holds directly the change
        let tempIsShowing = this.state.isModalPoppedOut;
        RenderModal({
            order: this.state.orders[this.state.orderInModal],
            userType: this.props.userType,
            onClickClose: () => {
                tempIsShowing = false;
                this.setState({
                    isModalPoppedOut: false
                });
            },
            onUpdateOrders: () => this.processOrders(),
            isShowing: tempIsShowing
        });
    }

    getDateTime(){
        Time.getDateTimeFromServer().then(obj =>{
            this.setState({
                todayDateTime: obj
            });
        });
    }

    componentDidMount(){
        let that = this;
        window.addEventListener("scroll", function(){
            if(document.documentElement.clientHeight + window.pageYOffset >= getDocHeight() ){
                let newSearchParams = JSON.parse(JSON.stringify(that.state.searchParams));
                newSearchParams["elementsToFetch"] += 10;
                that.setState({
                    searchParams: newSearchParams
                });
            }
        });
        this.getDateTime();
        setInterval(() =>{
            this.getDateTime();
        }, 60000);

   
        socket.on("update-orders", () =>{
            this.processOrders();
        })

    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.searchParams !== prevState.searchParams || 
            this.state.inputsParams !== prevState.inputsParams){
            this.processOrders();
        }
        RenderOrderBoxes({
            orders:this.state.orders, 
            todayDateTime: this.state.todayDateTime,
            showLaundryName: false,
            userType: this.props.userType,
            onClick: (orderID) =>{
                this.setState({
                    isModalPoppedOut: true,
                    orderInModal: orderID
                });
            }
        });
        this.onClickOrderBoxHandler();
    }

    render(){
        return  React.createElement(OrderParamsSelectorHandler,{
            userType: this.props.userType,
            getSearchParams: (params) =>{
                let newOrders = {};
                Object.assign(params.searchParams, {elementsToFetch: this.state.searchParams.elementsToFetch});

                if(params.searchParams === this.state.searchParams){
                    newOrders = this.state.orders;
                }
                
                this.setState({
                    searchParams: params.searchParams,
                    inputsParams: params.inputsParams,
                    orders: newOrders
                });
            },
        });
    }
}

function RenderNavbar(userType){
    ReactDOM.render(
        React.createElement(Navbar, {
            userType: userType
        }), document.getElementById("NavbarContainer")
    );
}

async function getOrders({paramsProps, inputs}){
    try {
        let query = await orders.fetchOrders({
            paramsProps: paramsProps,
            inputs: inputs
        });
        return query;
    }catch(err){
        console.error(err);
    }
}

function RenderOrderBoxes({orders, todayDateTime, onClick, userType}){
    //console.log(todayDateTime);
    ReactDOM.render(
        React.createElement(OrderBoxHandler, {
            orders: orders,
            todayDateTime: todayDateTime,
            columnType: "col-lg-4",
            showLaundryName: (userType === "laundry") ? false : true,
            onClick: (orderID) => onClick(orderID)
        }),
        document.getElementById("AppendOrdersContainer")
    );
}

function RenderModal({order, onClickClose,onUpdateOrders, isShowing, userType}){
    ReactDOM.render(
        React.createElement(OrderModalHandler,{
            order: order,
            isShowing: isShowing,
            showNextStatusBtn: (userType === "laundry") ? true: false,
            onClickClose: () => onClickClose(),
            onUpdateOrders: () => onUpdateOrders(),
        }),
        document.getElementById("OrderModalContainer")
    )
}

function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}

