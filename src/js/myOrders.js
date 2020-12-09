"use strict";

require( "core-js/stable");
require("regenerator-runtime/runtime");

const React = require("react");
const ReactDOM = require("react-dom");

const OrderBoxHandler = require("./reactComponents/OrderBoxHandler");
const OrderParamsSelectorHandler = require("./reactComponents/OrderParamsSelectorHandler");
const OrderModalHandler = require("./reactComponents/OrderModalHandler");
const Time =  require("./reactComponents/Time");
const ajaxReqOrders =  require("./requestsModules/ajaxReqOrders");
const Navbar =  require("./reactComponents/NavbarHandler");

//this file acts like a bundle, since all the components here
//needs to be connected to a only true source of data

window.onload = function(){
    RenderNavbar();

    ReactDOM.render(
        React.createElement(SearchOrderByParams, {}),
        document.getElementById("OrderParamsSelectorContainer")
    );
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

        /* console.log(this.state.searchParams);
        console.log(this.state.inputsParams);  */
        getOrders({
            searchParams: this.state.searchParams,
            inputs: this.state.inputsParams
        }).then((response) =>{
            if(typeof response !== "undefined"){
                if(response.status === 200){
                    let {data: orders} = response;  
                    let newOrdersInState = JSON.parse(JSON.stringify(this.state.orders));
                    orders.map(order =>{
                        let orderID = `${order.id_char}${order.id_number}`;
                        newOrdersInState[orderID] = {
                            id_char: order.id_char,
                            id_number: order.id_number,
                            customer_id: order.customer_iD,
                            customer_name: order.customer_name,
                            date_assign: order.date_assign,
                            date_receive: order.date_receive,
                            indications: order.indications,
                            elements_details: order.elements_details,
                            status: order.status,
                            hook_quantity: order.hook_quantity,
                            total_price: order.total_price
                        };
                    });
                    this.setState({
                        isFirstOrdersLoaded: true,
                        orders: newOrdersInState
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

        setInterval(() =>{
            this.processOrders();
        }, 5000);
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.searchParams !== prevState.searchParams || 
            this.state.inputsParams !== prevState.inputsParams){
            this.processOrders();
        }
        RenderOrderBoxes({
            orders:this.state.orders, 
            todayDateTime: this.state.todayDateTime,
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
        //console.log(this.state.orders);
        return  React.createElement(OrderParamsSelectorHandler,{
            getSearchParams: (params) =>{
                let newElementsToFetch = 10;
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

function RenderNavbar(){
    ReactDOM.render(
        React.createElement(Navbar, {
            componentList: [
                "Logo", 
                "WriteOrders",
                "AffiliatedOrders",
                "MyAccount" ,
                "Logout",
                "LanguageSelect"
            ]
        }), document.getElementById("NavbarContainer")
    );
}

async function getOrders({searchParams, inputs}){
    try {
        let query = await ajaxReqOrders.fetchOrders({
            paramsProps: searchParams,
            inputs: inputs
        });
        return query;
    }catch(err){
        console.error(err);
    }
}

function RenderOrderBoxes({orders, todayDateTime, onClick}){
    //console.log(todayDateTime);
    ReactDOM.render(
        React.createElement(OrderBoxHandler, {
            orders: orders,
            todayDateTime: todayDateTime,
            onClick: (orderID) => onClick(orderID)
        }),
        document.getElementById("AppendOrdersContainer")
    );
}

function RenderModal({order, onClickClose,onUpdateOrders, isShowing}){
    ReactDOM.render(
        React.createElement(OrderModalHandler,{
            order: order,
            onClickClose: () => onClickClose(),
            isShowing: isShowing,
            onUpdateOrders: () => onUpdateOrders()
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

