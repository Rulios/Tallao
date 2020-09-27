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
        sessionHandler: "frontendModules/sessionHandler",
        OrderBoxHandler: "./reactComponents/OrderBoxHandler",
        OrderParamsSelectorHandler: "./reactComponents/OrderParamsSelectorHandler",
        OrderModalHandler: "./reactComponents/OrderModalHandler",
        Time: "./reactComponents/Time",
        ajaxReqOrders: "./requestsModules/ajaxReqOrders",
    },
    shim: {
        bootstrap: {
            deps: ["jquery"]
        },
    }
});
require(["jquery", "react", "react-dom","OrderBoxHandler","OrderParamsSelectorHandler",
"OrderModalHandler","Time","ajaxReqOrders","design", "bootstrap"], 
function($,React, ReactDOM, OrderBoxHandler, 
    OrderParamsSelectorHandler,OrderModalHandle,Time, ajaxReq){ 

    //this file acts like a bundle, since all the components here
    //needs to be connected to a only true source of data

    require(["sessionHandler"], function(session){
        session.check();

        ReactDOM.render(
            React.createElement(SearchOrderByParams, {}),
            document.getElementById("OrderParamsSelectorContainer")
        );
    });

    async function getOrders(data){
        try {
            let query = await ajaxReq.fetchOrders({
                paramSelected: data.paramSelected,
                params: JSON.stringify(data.params),
                elementsToFetch: data.elementsToFetch,
                //startIndex: data.startIndex,
                status: data.status
            });
            return query;
        }catch(err){console.error(err);}
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
            React.createElement(OrderModalHandle,{
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
                    dateInput: {},
                    hourInput:"",
                    orderInput: "",
                    txtInput: ""
                },
                orders: {},
                isFirstOrdersLoaded: false,
                isModalPoppedOut: false,
                orderInModal: "",
                todayDateTime: {}
            }
        }

        processOrders(){
           /*  console.log(this.state.searchParams);
            console.log(this.state.inputsParams); */
            getOrders({
                paramSelected: this.state.searchParams.paramSelected,
                status: this.state.searchParams.statusSelected,
                elementsToFetch: this.state.searchParams.elementsToFetch,
                params: {
                    dateInput: this.state.inputsParams.dateInput,
                    hourInput: this.state.inputsParams.hourInput,
                    orderInput: this.state.inputsParams.orderInput,
                    txtInput: this.state.inputsParams.txtInput
                }
            }).then(data =>{
                let orderObj = JSON.parse(data);
                let newOrdersInState = JSON.parse(JSON.stringify(this.state.orders));
                orderObj.map(order =>{
                    let orderID = `${order.idChar}${order.idNumber}`;
                    newOrdersInState[orderID] = {
                        idChar: order.idChar,
                        idNumber: order.idNumber,
                        customerID: order.customerID,
                        customerName: order.customerName,
                        dateAssign: order.dateAssign,
                        dateReceive: order.dateReceive,
                        indications: order.indications,
                        elementsDetails: JSON.parse(order.elementsDetails),
                        status: order.status,
                        hookQuantity: order.hookQuantity,
                        totalPrice: order.totalPrice
                    };
                });
                this.setState({
                    isFirstOrdersLoaded: true,
                    orders: newOrdersInState
                });
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
            }, 4000);
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
                    /* console.log(params.searchParams);
                    console.log(params.searchParams === this.state.searchParams); */
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

});
