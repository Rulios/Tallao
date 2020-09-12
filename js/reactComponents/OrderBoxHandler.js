"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development',
        OrderBoxContainers: "./reactComponents/OrderBoxContainers",
        ajaxReqOrders: "./requestsModules/ajaxReqOrders",
    }
});
define(["react", "react-dom","OrderBoxContainers", "ajaxReqOrders"], 
function(React, ReactDOM,OrderBoxContainers, ajaxReq){

    /* This is the high order component, this is where AJAX requests performs
    Controls all the outputs */

 
    async function getOrders(data){
        console.log(data);
        try {
            let query = await ajaxReq.fetchOrders({
                filterMode: data.filterMode,
                params: JSON.stringify(data.params),
                startIndex: data.startIndex,
                status: data.status
            });
            return query;
        }catch(err){console.error(err);}
    }
    
    class OrderBoxes extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                orders: {},
                startIndex: 0,    
            }
        }

        componentDidMount(){
            getOrders({
                filterMode: this.props.paramSelected,
                status: this.props.statusSelected,
                startIndex: this.state.startIndex,
                params: {
                    dateInput: this.props.dateInput,
                    hourInput: this.props.hourInput,
                    orderInput: this.props.orderInput,
                    txtInput: this.props.txtInput
                }
            }).then(data =>{
                console.log(data);
            }).catch(err => console.error(err));
        }


        render(){
            return null;
        }
    }
    


    return OrderBoxes;
});

