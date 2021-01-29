const cloneDeep = require("lodash.clonedeep");
const React = require("react");
const {useContext, useRef, useEffect} = React;

const {WriteOrderContext} = require("../reactContexts/WriteOrderContext");
const {OrderContext} = require("../reactContexts/OrderContext");

const getSumOfElementsQuantities = require("../frontendModules/getSumOfElementsQuantities");

const {getStaticText} = require("../../../translation/frontend/translator");

module.exports = function HookQuantityInputs(){
    const [WriteOrder, setWriteOrder] = useContext(WriteOrderContext);
    const [Order, setOrder] = useContext(OrderContext);
    


    useEffect(() =>{
        if(!Object.entries(Order).length && Order.hookQuantity){
            const newOrder = cloneDeep(Order);
            const newWriteOrder = cloneDeep(WriteOrder);
            const {hookQuantity} = newOrder;
            const sumOfElementsQuantities = getSumOfElementsQuantities(newOrder.elementsOnOrder);

            if(hookQuantity > sumOfElementsQuantities || newWriteOrder.isFullHookChecked){
                newOrder.hookQuantity = sumOfElementsQuantities;
            }

            newWriteOrder.isFullHookChecked = hookQuantity === sumOfElementsQuantities;

            setOrder(newOrder);
            setWriteOrder(newWriteOrder);
        }

        

    }, [Order]);

    const fullHookCheckboxHandler = (isChecked) =>{
        const newWriteOrder = cloneDeep(WriteOrder);
        newWriteOrder.isFullHookChecked = isChecked;
        setWriteOrder(newWriteOrder);
    };

    const inputHookHandler = (hookQuantity) =>{
        const newOrder = cloneDeep(Order);
        newOrder.hookQuantity = hookQuantity;
        setOrder(newOrder);
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
