const cloneDeep = require("lodash.clonedeep");
const React = require("react");
const {useState, useRef, useContext, useEffect} = React;
const dayjs = require("dayjs");
const {DATE_TIME_FORMAT_UNTIL_MINUTES} = require("../../../meta/DATE_TIME_FORMATS");

const getSumOfElementsQuantities = require("../frontendModules/getSumOfElementsQuantities");
const {WriteOrderContext} = require("../reactContexts/WriteOrderContext");

const OrderContext = React.createContext();

const ORDER_STRUCTURE = {
    customer: {id: "", name: ""},
    elementsOnOrder: {},
    hookQuantity: 0,
    totalPrice: 0,
    indications: "",
    dateTimeAssigned: dayjs().format(DATE_TIME_FORMAT_UNTIL_MINUTES)
};

function OrderProvider(props){
    const [Order, setOrder] = useState(ORDER_STRUCTURE);

    const [WriteOrder] = useContext(WriteOrderContext);
    const {laundryPrices: {extras}} = WriteOrder;
    const prevOrder = useRef(Order);

    const _resetOrder = () => {
        setOrder(ORDER_STRUCTURE);
    };

    useEffect(() => {

        if(hasElementsOnOrderChanged(prevOrder.current.elementsOnOrder, Order.elementsOnOrder)){
            const {elementsOnOrder, hookQuantity} = Order;
            const newOrder = cloneDeep(Order);
    
            let totalPriceOfNewOrder = getTotalPrice(elementsOnOrder, hookQuantity, extras);
            totalPriceOfNewOrder = totalPriceOfNewOrder.toFixed(2);
    
            newOrder.totalPrice = totalPriceOfNewOrder;
    
            //CRITICAL, SHOULD UPDATE THE REACT-REFERENCE OF PREVIOUS ORDER FIRST, 
            //THEN UPDATE THE STATE, TO PREVENT THE INFINITE RENDERING
            prevOrder.current = newOrder;
    
            setOrder(newOrder);
        }
    }, [Order]);

    


    return (
        <OrderContext.Provider value={[Order, setOrder, _resetOrder]}>
            {props.children}
        </OrderContext.Provider>
    );

}

function hasElementsOnOrderChanged(prevElementsOnOrder, nextElementsOnOrder){

    return JSON.stringify(prevElementsOnOrder) !== JSON.stringify(nextElementsOnOrder);
}

function getTotalPrice(elementsOnOrder, hookQuantity, extras){
    try{
        const {hook: hookPrice} = extras;
        const sumOfElementsQuantities = getSumOfElementsQuantities(elementsOnOrder);
        let totalPrice = 0;


        Object.values(elementsOnOrder).map(elementServices =>{
            Object.values(elementServices).map(({quantity, price}) => {
                totalPrice += quantity * price;
            });
        })


        totalPrice += getPriceOfMissingHooks(sumOfElementsQuantities, hookQuantity, hookPrice);

        return totalPrice;
    }catch(err){
        return 0;
    }
    
}

function getPriceOfMissingHooks(sumOfElementsQuantities, hookQuantity, hookPrice){
    let missingHooks = 0;
    let priceOfMissingHooks = 0;

    if(hookQuantity >= 0 && hookQuantity < sumOfElementsQuantities){
        missingHooks = sumOfElementsQuantities - hookQuantity;
    }

    priceOfMissingHooks = missingHooks * hookPrice;

    return priceOfMissingHooks;
}


module.exports = {
    OrderContext: OrderContext,
    OrderProvider: OrderProvider
};