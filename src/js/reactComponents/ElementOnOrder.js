const React = require("react");
const {useContext} = React; 
const cloneDeep = require("lodash.clonedeep");

const inputPrevent = require("../frontendModules/inputPrevent");
const isElementACustomElement = require("../frontendModules/isElementACustomElement");
const {ELEMENTS} = require("../../../meta/ELEMENTS");
const {getStaticText} = require("../../../translation/frontend/translator");

const {WriteOrderContext} = require("../reactContexts/WriteOrderContext");
const {OrderContext} = require("../reactContexts/OrderContext");

module.exports = function ElementOnOrder({element, service}){

    const [WriteOrder, setWriteOrder] = useContext(WriteOrderContext);
    const [Order, setOrder] = useContext(OrderContext);
    const {quantity, price} = Order.elementsOnOrder[element][service];


    const updateCustomElementName = (element, service, name) =>{
        const newOrder = cloneDeep(Order);
    
        newOrder.elementsOnOrder[element][service]["name"] = name;
    
        setOrder(newOrder);
    };
    
    const updateElementQuantity = (element, service, quantity) => {
        const newOrder = cloneDeep(Order);
    
        newOrder.elementsOnOrder[element][service]["quantity"] = parseInt(quantity);
    
        setOrder(newOrder);
    };
    
    const updateElementUnitPrice = (element, service, unitPrice) => {
        const newOrder = cloneDeep(Order);
    
        newOrder.elementsOnOrder[element][service]["price"] = parseFloat(unitPrice);
    
        setOrder(newOrder);
    };

    const deleteElementFromOrder = (element, service) => {
        const newOrder = cloneDeep(Order);
        const newWriteOrder = cloneDeep(WriteOrder);
    
        //add element into the list of available elements if it isn't custom element
        if(!isElementACustomElement(element)){
            let defaultElementPositionOnList = ELEMENTS.indexOf(element);
            //append on correspondent position
            newWriteOrder.availableElements[service].splice(defaultElementPositionOnList, 0, element);
        }
    
        if(elementHasMoreThaOneServiceOnOrder(element, newOrder.elementsOnOrder)){
            //delete the service from the element
            delete newOrder.elementsOnOrder[element][service];
        }else{
            //delete the whole element from the order
            delete newOrder.elementsOnOrder[element];
        }

        setOrder(newOrder);
        setWriteOrder(newWriteOrder);
    };

    
    let idAsset = ""; //to get the svg illustrations
    let inputElementChangeOnCustom;

    if(element.includes("custom")){
        //custom makes a exception on the rendering of the component
        idAsset = "custom";
        inputElementChangeOnCustom = React.createElement("input",{
            type: "text",
            placeholder: getStaticText("elementName"),
            onBlur: (e) => updateCustomElementName(element, service, e.target.value)
        });

    }else{
        idAsset = element;
        inputElementChangeOnCustom = React.createElement("span", {
            className: "bold subTxt"
        }, `${getStaticText(element)} (${getStaticText(service)})`);
    }

    return(
        React.createElement("div", {
            className: "container small-mediumSeparation"
        },
            React.createElement("div", {
                className: "row bottomBorder customElementReceiptStyle"
            },
                React.createElement("div",{
                    className: "col-lg-1 hideOnXs"
                },
                    React.createElement("img",{
                        className: "assetStayStatic",
                        src: `/imgs/assets/${idAsset}/${idAsset}.svg`
                    })
                ),

                React.createElement("div", {
                    className: "col-lg-11"
                },
                    inputElementChangeOnCustom,
                    React.createElement("button", {
                        className: "closeButtonStyle",
                        onClick: () => deleteElementFromOrder(element,service)
                    }, "x"),
                    React.createElement("div", {
                        className: "container small-mediumSeparation"
                    },
                        React.createElement("div", {className: "row"},
                            React.createElement("div", {className: "col-lg-4"},
                                React.createElement("span", null, `${getStaticText("quantity")}:`),
                                React.createElement("br", null, null),
                                React.createElement("input", {
                                    type: "number",
                                    className :"inputNumberReceiptStyle",
                                    name: "inputQuantity",
                                    value: quantity,
                                    onChange: (e) => {
                                        inputPrevent.notNegative(e);
                                        updateElementQuantity(element, service, e.target.value);
                                    },
                                    onKeyPress: (e) =>{
                                        inputPrevent.onlyIntegers(e);
                                    }
                                })
                            ),

                            React.createElement("div", {className: "col-lg-4"},
                                React.createElement("span", null, `${getStaticText("pricePerUnit")}`),
                                React.createElement("span", null, "$"),
                                React.createElement("input", {
                                    type: "number",
                                    className: "inputNumberReceiptStyle",
                                    value: price,
                                     onChange: (e) => {
                                        inputPrevent.notNegative(e);
                                        updateElementUnitPrice(element, service, e.target.value);
                                    },
                                    onKeyPress: (e) =>{
                                        inputPrevent.asteriskAndHyphen(e);
                                        inputPrevent.notExponential(e);
                                        inputPrevent.notNegative(e);
                                    }
                                })
                            ),

                            React.createElement("div", {className: "col-lg-4 bold"},
                                React.createElement("span", null, `${getStaticText("total")}:`),
                                React.createElement("span", null, (price * quantity).toFixed(2))
                            )
                        )
                    )
                )
            )    
        )
    );
}

function elementHasMoreThaOneServiceOnOrder(element, elementsOnOrder){
    return Object.keys(elementsOnOrder[element]).length > 1;
}