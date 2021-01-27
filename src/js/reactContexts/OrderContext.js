const React = require("react");
const {useState} = React;

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

    return (
        <OrderContext.Provider value={[Order, setOrder]}>
            {props.children}
        </OrderContext.Provider>
    );

}


module.exports = {
    OrderContext: OrderContext,
    OrderProvider: OrderProvider
};