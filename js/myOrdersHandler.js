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
        ajaxReqOrders: "./requestsModules/ajaxReqOrders",
    },
    shim: {
        bootstrap: {
            deps: ["jquery"]
        },
    }
});
require(["jquery", "react", "react-dom","OrderBoxHandler","OrderParamsSelectorHandler",
"OrderModalHandler","ajaxReqOrders","design", "bootstrap"], 
function($,React, ReactDOM, OrderBoxHandler, OrderParamsSelectorHandler,OrderModalHandle, ajaxReq){ 

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
                startIndex: data.startIndex,
                status: data.status
            });
            return query;
        }catch(err){console.error(err);}
    }

    function RenderOrderBoxes({orders, onClick}){
        
        ReactDOM.render(
            React.createElement(OrderBoxHandler, {
                orders: orders,
                onClick: (orderID) => onClick(orderID)
            }),
            document.getElementById("AppendOrdersContainer")
        );
    }

    function RenderModal(order){
        console.log(order);
        ReactDOM.render(
            React.createElement(OrderModalHandle,{
                order: order
            }),
            document.getElementById("OrderModalContainer")
        )
    }

    class SearchOrderByParams extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                searchParams: {
                    paramSelected: "",
                    statusSelected: "",
                    startIndex: 0
                },
                inputsParams: {
                    dateInput: {},
                    hourInput:"",
                    orderInput: "",
                    txtInput: ""
                },
                orders: {},
                isFirstOrdersLoaded: false,
                isModalPoppedOut: false
            }
        }

        processOrders(isAppendOrders){
           /*  console.log(this.state.searchParams);
            console.log(this.state.inputsParams); */
            getOrders({
                paramSelected: this.state.searchParams.paramSelected,
                status: this.state.searchParams.statusSelected,
                startIndex: this.state.searchParams.startIndex,
                params: {
                    dateInput: this.state.inputsParams.dateInput,
                    hourInput: this.state.inputsParams.hourInput,
                    orderInput: this.state.inputsParams.orderInput,
                    txtInput: this.state.inputsParams.txtInput
                }
            }).then(data =>{
                let orderObj = JSON.parse(data);
                let newOrdersInState = {};
                if(isAppendOrders){
                    newOrdersInState = JSON.parse(JSON.stringify(this.state.orders));
                }
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

        onClickOrderBoxHandler(orderID){
            //show modal
            if(!this.state.isModalPoppedOut){
                RenderModal(this.state.orders[orderID]);
            }
        }

      /*   shouldComponentUpdate(newProps, newState){
            return (this.state.params !== newState.params);
        } */

        componentDidUpdate(prevProps, prevState){
            if(this.state.searchParams !== prevState.searchParams || 
                this.state.inputsParams !== prevState.inputsParams){
                this.processOrders(false);
            }
            RenderOrderBoxes({
                orders:this.state.orders, 
                onClick: (orderID) =>this.onClickOrderBoxHandler(orderID)
            });
        }

        render(){
            //console.log(this.state.orders);
            return  React.createElement(OrderParamsSelectorHandler,{
                getSearchParams: (params) =>{
                    this.setState({
                        searchParams: Object.assign(params.searchParams, {
                            startIndex:this.state.searchParams.startIndex
                        }),
                        inputsParams: params.inputsParams
                    });
                },
            });
        }
    }

});
