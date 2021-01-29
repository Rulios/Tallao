const cloneDeep = require("lodash.clonedeep");
const isElementACustomElement = require("../frontendModules/isElementACustomElement");
const {ELEMENTS} = require("../../../meta/ELEMENTS");

module.exports = class AvailableElements{


    static fillServicesWithElements(services, availableElements, setAvailableElements){
        let updatedAvailableElements = cloneDeep(availableElements);

        services.map(service =>{
            addNewService(service, updatedAvailableElements);
        });
        
        setAvailableElements(updatedAvailableElements);
    }

    static deleteElement({elementID, serviceSelected}, 
        availableElements, setAvailableElements){

        let updatedAvailableElements = cloneDeep(availableElements);

        if(!isElementACustomElement(elementID)){
            let elements = updatedAvailableElements[serviceSelected];
            let positionOfElement = elements.indexOf(elementID);

            //delete
            elements.splice(positionOfElement, 1);
        }

        setAvailableElements(updatedAvailableElements);
    }

}

function addNewService(service, availableElements){
    availableElements[service] = Array.from(ELEMENTS);
}


