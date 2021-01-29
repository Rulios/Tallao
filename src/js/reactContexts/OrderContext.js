const cloneDeep = require("lodash.clonedeep");
const React = require("react");
const {useState, useRef, useContext, useEffect} = React;

const getSumOfElementsQuantities = require("../frontendModules/getSumOfElementsQuantities");
const {WriteOrderContext} = require("../reactContexts/WriteOrderContext");

const OrderContext = React.createContext();

function OrderProvider(props){
    const [Order, setOrder] = useState({
        customer: {id: "", name: ""},
        elementsOnOrder: {},
        hookQuantity: 0,
        totalPrice: 0,
        indications: "",
        dateTimeAssigned: ""
    });

    const [WriteOrder] = useContext(WriteOrderContext);
    const {laundryPrices: {extras}} = WriteOrder;
    const prevOrder = useRef(Order);
    
    useEffect(() => {
        if(hasElementsOnOrderChanged(prevOrder.current, Order)){
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
        <OrderContext.Provider value={[Order, setOrder]}>
            {props.children}
        </OrderContext.Provider>
    );

}

function hasElementsOnOrderChanged(prevOrder, nextOrder){
    const {elementsOnOrder: prevElementsOnOrder}  = prevOrder;
    const {elementsOnOrder: nextElementsOnOrder}  = nextOrder;

    return prevElementsOnOrder !== nextElementsOnOrder;
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