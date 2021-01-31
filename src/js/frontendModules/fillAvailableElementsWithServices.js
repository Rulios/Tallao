const {ELEMENTS} = require("../../../meta/ELEMENTS");

module.exports = function fillAvailableElementsWithServices(services){
    let newAvailableElements = {};
    //push the custom element at the top
    services.map(service =>{
        newAvailableElements[service] = Array.of(...ELEMENTS);
    });
    return newAvailableElements;
};