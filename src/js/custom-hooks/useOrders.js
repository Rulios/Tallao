const {useState, useEffect} = require("react");
const cloneDeep = require("lodash.clonedeep");

const {fetchOrders} = require("../ajax-requests/orders");
const convertArrToObj = require("../frontendModules/convertArrToObj");

module.exports = function useOrders(socket){

    const [orders, setOrders] = useState({});

    //search parameters
    const [paramProps, setParamProps] = useState({
        paramSelected: "",
        statusSelected: "",
        elementsToFetch: 10
    });
    const [inputs , setInputs] = useState({
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
    });

    const setNewOrders = async () => {
        let combinedOrders = cloneDeep(orders);
        let newOrders = await processNewOrders(paramProps, inputs);

        combinedOrders = Object.assign(combinedOrders, newOrders);

        setOrders(combinedOrders);
    };

    useEffect(() => {
        socket.on("update-orders", () =>{
            setNewOrders();
        });
    }, []);


    useEffect(async () => {
        setNewOrders();        
    }, [paramProps, inputs]);

    return {
        orders: orders,
        setOrders: setOrders,

        paramProps: paramProps,
        setParamProps: setParamProps,

        inputs: inputs,
        setInputs: setInputs
    };

}

async function processNewOrders(paramProps, inputs){
    try{
        let {data: orders, status} = await fetchOrders({
            paramProps: paramProps,
            inputs: inputs
        });

        if(status === 200){
            let newOrders = {};
            newOrders = convertArrToObj(orders);

            return newOrders;
        }

    }catch(err){
        console.err(err);
    }
}