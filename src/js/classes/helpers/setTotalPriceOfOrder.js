module.exports = function(order){

    order.totalPrice = calculateTotalPriceOfOrder(order);

}

function calculateTotalPriceOfOrder({elementsOnOrder, hookQuantity}){
    let totalPrice = 0;

    totalPrice += calculatePriceOfElementsOnOrder(elementsOnOrder);
    totalPrice += calculatePriceOfMissingHooks(elementsOnOrder, hookQuantity, hookPrice);

    return totalPrice;
}

function calculatePriceOfElementsOnOrder(elementsOnOrder){
    let price = 0;

    Object.keys(elementsOnOrder).map(element =>{
        Object.keys(elementsOnOrder[element]).map(service =>{
            let elementUnitaryPrice = elementsOnOrder[element][service]["price"];
            let elementQuantity = elementsOnOrder[element][service]["quantity"];

            price += elementUnitaryPrice * elementQuantity;
        });
    });

    return price;
}

function calculatePriceOfMissingHooks(elementsOnOrder, hookQuantity, hookPrice){
    let price = 0;
    let sumOfElementsQuantities = getSumOfElementsQuantities(elementsOnOrder);

    if(shouldCalculatePriceOfMissingHooks(hookQuantity, sumOfElementsQuantities)){
        let quantityOfHooksMissing = sumOfElementsQuantities - hookQuantity;
        
        price = hookPrice * quantityOfHooksMissing;
    }

    return price;
}

function getSumOfElementsQuantities(elementsOnOrder){
    let sumOfElementsQuantities = 0;

    Object.keys(elementsOnOrder).map(element =>{
        Object.keys(elementsOnOrder[element]).map(service =>{
            let elementQuantity = elementsOnOrder[element][service]["quantity"];

            sumOfElementsQuantities += elementQuantity;
        });
    });

    return sumOfElementsQuantities;
}

function shouldCalculatePriceOfMissingHooks(hookQuantity, sumOfElementsQuantities){
    return !isHookQuantityUndefined(hookQuantity) && isHookQuantityLowerThanSumOfElementsQuantity(hookQuantity, sumOfElementsQuantities);
}

function isHookQuantityUndefined(hookQuantity){
    return hookQuantity === undefined;
}

function isHookQuantityLowerThanSumOfElementsQuantity(hookQuantity, sumOfElementsQuantities){
    return hookQuantity < sumOfElementsQuantities;
}

