const React = require("react");
const {useContext} = React;
const cloneDeep = require("lodash.clonedeep");

const {WriteOrderContext} = require("../reactContexts/WriteOrderContext");
const {OrderContext} = require("../reactContexts/OrderContext");

const isElementACustomElement = require("../frontendModules/isElementACustomElement");

const {getStaticText} = require("../../../translation/frontend/translator");

module.exports = function DropdownElement({element, service, elementPrice}){

    const [WriteOrder, setWriteOrder] = useContext(WriteOrderContext);
    const [Order, setOrder] = useContext(OrderContext);

    const onClickHandler = () => {
        const newWriteOrder = cloneDeep(WriteOrder);
        const newOrder = cloneDeep(Order);

        addElementToOrder(newWriteOrder, newOrder);
        deleteAvailableElement(newWriteOrder);

        setWriteOrder(newWriteOrder);
        setOrder(newOrder);
    };

    const addElementToOrder = (newWriteOrder, newOrder) => {
        
        if(isElementACustomElement(element)){
            let customElementIndexes = newWriteOrder.customElementIndexes;
            let nextCustomElementIndex = getNextCustomElementIndex(customElementIndexes);

            element = `${element}${nextCustomElementIndex}`;
            customElementIndexes.push(nextCustomElementIndex);
        }

        if(!isElementOnOrder(element, newOrder.elementsOnOrder)) newOrder.elementsOnOrder[element] = {};
        newOrder.elementsOnOrder[element][service] = {};

        let elementOnOrder = newOrder.elementsOnOrder[element][service];

        //initialize values
        elementOnOrder["quantity"] = 1;
        elementOnOrder["price"] = getElementUnitPrice(element, service, newWriteOrder.laundryPrices);
    };

    const deleteAvailableElement = (newWriteOrder) =>{
        if(!isElementACustomElement(element)){
            let availableElementsOnActualService = newWriteOrder.availableElements[service];
            let positionOfElement = availableElementsOnActualService.indexOf(element);
            availableElementsOnActualService.splice(positionOfElement, 1);
        }
    }

    return(
        React.createElement("button", {
            value: element,
            name: "elementButton",
            className: "buttonElementStyle",
            onClick: () => onClickHandler()
        },
            React.createElement("div", {className:"container"},
                React.createElement("div", {
                    className:"row bottomBorder elementSelectStyle"
                },
                    React.createElement("div", {className:"col-lg-4"},
                        React.createElement("img", {
                            className:"assetStayStatic",
                            src: `/imgs/assets/${element}/${element}.svg`
                        })
                    ),
                    React.createElement("div", {className:"col-lg-8"},
                        React.createElement("span", {className:"subTxt"},
                            getStaticText(element)
                        ),
                        React.createElement("br", null),
                        React.createElement("span", {},(elementPrice !== null) ? `$${elementPrice}`: "")
                    )
                )
            )
        )
    );
}

function getNextCustomElementIndex(customElementsIndexes){
    let lastValue = 0, nextValue = 0;
    if(customElementsIndexes.length){
        //get the last value and increment it by one
        lastValue = customElementsIndexes[customElementsIndexes.length - 1]; 
        nextValue = lastValue + 1;
    }
    return nextValue;
}

function isElementOnOrder(element, elementsOnOrder){
    return element in elementsOnOrder;
}

function getElementUnitPrice(element, service, laundryPrices){
    if(isElementACustomElement(element)){
        return 1;
    }else{
        return laundryPrices[service][element] ?? 1;
    }
}

