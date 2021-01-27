const cloneDeep = require("lodash.clonedeep");
const isElementACustomElement = require("../frontendModules/isElementACustomElement");
const setTotalPriceOfOrder = require("./helpers/setTotalPriceOfOrder");

module.exports = class WriteOrder{


    #configurationData = {
        customElementsIndexes: [],
        isFullHookChecked: true,
    };

    static addNewElementToOrder({elementID, serviceSelected, elementPrice}, order, setOrder){

        let orderUpdated = cloneDeep(order);
        let elementsOnOrder = orderUpdated.elementsOnOrder;


        if(isElementACustomElement(elementID)){
            elementID = this.getAndSetCustomElementPropertyName();
        }

        addElementIfDoesntExistsInOrder(elementsOnOrder, elementID);
        initializeElement(elementsOnOrder, {
            elementID: elementID,
            serviceSelected: serviceSelected,
            elementPrice: elementPrice
        });


        /* setTotalPriceOfOrder(orderUpdated); */

        setOrder(orderUpdated);
    }

    getAndSetCustomElementPropertyName(){
        if(this.#configurationData.customElementsIndexes.length){
            return this.getAndSetConsecuentCustomElementPropertyName();
        }else{
            return this.getAndSetFirstCustomElementPropertyName();
        }
    }

    getAndSetConsecuentCustomElementPropertyName(){
        this.sortCustomElementIndexes();
        this.setNextCustomElementIndex();

        let lastConsecuentCustomElementIndex = this.getLastCustomElementIndex();
        retunr `custom${lastConsecuentCustomElementIndex}`;
    }

    getAndSetFirstCustomElementPropertyName(){
        this.#configurationData.customElementsIndexes.push(1);
        return `custom1`;
    }

    sortCustomElementIndexes(){
        this.#configurationData.customElementsIndexes.sort(function(a,b){return a-b});
    }

    setNextCustomElementIndex(){
        let nextCustomElementIndex = this.getNextCustomElementIndex();
        this.#configurationData.customElementsIndexes.push(nextCustomElementIndex);
    }

    getNextCustomElementIndex(){
        let lastCustomElementIndex = this.getLastCustomElementIndex();
        return lastCustomElementIndex + 1;
    }
    
    getLastCustomElementIndex(){
        let arrLength = this.#configurationData.customElementsIndexes.length;
        return this.#configurationData.customElementsIndexes[arrLength - 1];
    }

};


function addElementIfDoesntExistsInOrder(elementsOnOrder ,elementID){
    console.log(Object.keys(elementsOnOrder));
    if(!(elementID in elementsOnOrder)){
        elementsOnOrder[elementID] = {};
    }
}

function initializeElement(elementsOnOrder, {elementID, serviceSelected, elementPrice}){

    initializeElementWithServiceSelected(elementsOnOrder, elementID, serviceSelected);
    initializeElementQuantity(elementsOnOrder, elementID, serviceSelected);
    initializeElementPrice(elementsOnOrder, {
        elementID: elementID,
        elementPrice: elementPrice,
        serviceSelected: serviceSelected
    });
}

function initializeElementWithServiceSelected(elementsOnOrder, elementID, serviceSelected){
    elementsOnOrder[elementID][serviceSelected] = {};
}

function initializeElementQuantity(elementsOnOrder, elementID, serviceSelected){
    elementsOnOrder[elementID][serviceSelected]["quantity"] = 1;
}

function initializeElementPrice(elementsOnOrder, {elementID, elementPrice, serviceSelected}){
    if(isElementACustomElement(elementID) || !isElementPriceValid(elementPrice)){
        elementsOnOrder[elementID][serviceSelected]["price"] = 1;
    }else{
        elementsOnOrder[elementID][serviceSelected]["price"] = elementPrice;
    }
}

function isElementPriceValid(elementPrice){

    return  elementPrice !== undefined && elementPrice ;
}






