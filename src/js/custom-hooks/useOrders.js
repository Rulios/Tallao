const {useState, useEffect, useRef} = require("react");
const cloneDeep = require("lodash.clonedeep");
const dayjs = require("dayjs");

const useServerDateTime = require("./useServerDateTime");
const usePrevious = require("./usePrevious");

const {HTML_DATE_FORMAT, HTML_TIME_FORMAT_UNTIL_MINUTES} = require("../../../meta/DATE_TIME_FORMATS");

const {fetchOrders} = require("../ajax-requests/orders");
const convertArrToObj = require("../frontendModules/convertArrToObj");
const getWindowHeight = require("../frontendModules/getWindowHeight");

module.exports = function useOrders(socket){
    //to fetch all the orders of that day
    const FIRST_HOUR_OF_THE_DAY = "00:00";
    const LAST_HOUR_OF_THE_DAY = "23:59"; 

    const todayDateTime = useServerDateTime();

    const [orders, setOrders] = useState({});

    //search parameters
    const [paramProps, setParamProps] = useState({
        paramSelected: "dateAssign",
        statusSelected: "all",
        elementsToFetch: 10
    });

    const [inputs , setInputs] = useState({
        date: {
            start: dayjs(todayDateTime).format(HTML_DATE_FORMAT),
            end: dayjs(todayDateTime).format(HTML_DATE_FORMAT)
        },
        time:{
            start: FIRST_HOUR_OF_THE_DAY,
            end: LAST_HOUR_OF_THE_DAY
        },
        order: {
            char: "A",
            number: 0
        },
        txt: ""
    });

    /*
        This "latest" variables are created because
        when adding a socket.io event listener at the componentDidMount
        useEffect hook, it references the initial value of paramProps and inputs.
        Creating a bug that setNewOrders refers to those initial values and 
        not the latest ones.
    */
    const latestParamProps = useRef(paramProps);
    const latestInputs = useRef(inputs);

    const prevElementsToFetch = usePrevious(paramProps.elementsToFetch);

    const setNewOrders = async () => {
        let shouldNewOrdersBeAppended = prevElementsToFetch !== paramProps.elementsToFetch;
        let combinedOrders = shouldNewOrdersBeAppended ? cloneDeep(orders) : {};

        //using the latest values. Not the ones that are stored inside the closure where this function is called
        let newOrders = await processNewOrders(latestParamProps.current, latestInputs.current); 

        combinedOrders = Object.assign(combinedOrders, newOrders);

        setOrders(combinedOrders);
    };

    const addTenMoreOrdersToFetch = () => {
        //using the latest values. Not the ones that are stored inside the closure where this function is called
        const newParamProps = cloneDeep(latestParamProps.current);
        newParamProps.elementsToFetch += 10;
        setParamProps(newParamProps)
    };

    useEffect(() => {
        socket.on("update-orders", () =>{
            setNewOrders();
        });

        window.addEventListener("scroll", function(){
            let userHasReachedBottom = document.documentElement.clientHeight + window.pageYOffset >= getWindowHeight();
            if(userHasReachedBottom) addTenMoreOrdersToFetch();
        });
    }, []);

    useEffect(() => {
        latestParamProps.current = paramProps;
        latestInputs.current = inputs;
        setNewOrders();
    }, [paramProps, inputs]);

    return {
        orders: orders,
        
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
        console.error(err);
    }
}