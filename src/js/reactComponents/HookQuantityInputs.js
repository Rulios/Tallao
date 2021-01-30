const cloneDeep = require("lodash.clonedeep");
const React = require("react");
const {useContext} = React;

const {WriteOrderContext} = require("../reactContexts/WriteOrderContext");
const {OrderContext} = require("../reactContexts/OrderContext");

const getSumOfElementsQuantities = require("../frontendModules/getSumOfElementsQuantities");

const {getStaticText} = require("../../../translation/frontend/translator");

module.exports = function HookQuantityInputs(){
    const [WriteOrder, setWriteOrder] = useContext(WriteOrderContext);
    const [Order, setOrder] = useContext(OrderContext);

    const fullHookCheckboxHandler = (isChecked) =>{
        //const newOrder = cloneDeep(Order);
        const newWriteOrder = cloneDeep(WriteOrder);
        const newOrder = cloneDeep(Order);

        newWriteOrder.isFullHookChecked = isChecked;
        //adjust the hook quantity by the isFullHookChecked state
        newOrder.hookQuantity = getHookQuantityWhenFullHookIsChecked(newWriteOrder, newOrder);

        setWriteOrder(newWriteOrder);
        setOrder(newOrder);
    };

    const inputHookHandler = (hookQuantity) =>{
        const newOrder = cloneDeep(Order);
        const newWriteOrder = cloneDeep(WriteOrder);

        newOrder.hookQuantity = hookQuantity;
        //adjust the isFullHookChecked state by the hook quantity
        newWriteOrder.isFullHookChecked = getFullHookCheckStateByHookQuantity(newOrder);

        setOrder(newOrder);
        setWriteOrder(newWriteOrder);
    };

    return (
        <span>
            <Checkbox 
                checked={WriteOrder.isFullHookChecked} 
                onChange={(isChecked) => fullHookCheckboxHandler(isChecked)}
            />
            <HookQuantityInput 
                onChange={(hookQuantity) => inputHookHandler(hookQuantity)} 
                hookQuantity={Order.hookQuantity}
            />
        </span>
    );
}

function Checkbox({checked, onChange}){
    return (
        <div>
            <input type="checkbox" id="fullHookCheckbox" 
                checked={checked}
                className="small-rightMargin" 
                onChange={(e) => onChange(e.target.value)} 
            />
            <label htmlFor="fullHookCheckbox" className="middleVerticalAlign">{getStaticText("completeHooks")}</label>
        </div>
    );
}

function HookQuantityInput({hookQuantity, onChange}){
    return (
        <div>
            <input type="number" id="hookQuantityInput"
                value={hookQuantity} 
                className="inputHookQuantity small-rightMargin"
                onChange={(e) => onChange(e.target.value)}
            />
            <label htmlFor="hookQuantityInput">{getStaticText("presentHooks")}</label>
        </div>
    )
}

function getHookQuantityWhenFullHookIsChecked(WriteOrder, Order){
    //if the user has checked full hook, then the hook quantity provided will be the same as sumOfElementsQuantity
    //if not, it will just won't change the hook quantity
    const {isFullHookChecked} = WriteOrder;
    const {hookQuantity, elementsOnOrder} = Order;
    const sumOfElementsQuantities = getSumOfElementsQuantities(elementsOnOrder);

    return (isFullHookChecked) ? sumOfElementsQuantities : hookQuantity ;
}

function getFullHookCheckStateByHookQuantity(Order){
    const {hookQuantity, elementsOnOrder} = Order;
    const sumOfElementsQuantities = getSumOfElementsQuantities(elementsOnOrder);

    return hookQuantity === sumOfElementsQuantities;
}
