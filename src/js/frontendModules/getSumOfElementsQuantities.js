module.exports = function getSumOfElementsQuantities(elementsOnOrder){
    let sumOfQuantities = 0;

    Object.values(elementsOnOrder).map(elementServices =>{
        Object.values(elementServices).map(({quantity}) => {
            sumOfQuantities += quantity;
        });
    });
    
    return sumOfQuantities;
}