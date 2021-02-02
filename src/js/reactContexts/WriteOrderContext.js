const cloneDeep = require("lodash.clonedeep");
const React = require("react");
const {useState} = React;

const fillAvailableElementsWithServices = require("../frontendModules/fillAvailableElementsWithServices");



const WriteOrderContext = React.createContext();

function WriteOrderProvider(props){
    const [WriteOrder, setWriteOrder] = useState({
        laundryServices: [],
        serviceSelected: "",
        laundryPrices: {},
        availableElements: {},
        customElementIndexes: [],
        isFullHookChecked: false,
        shouldShowSuccessMessage: false
    });

    const _resetWriteOrder = () => {
        setWriteOrder({
            laundryServices: WriteOrder.laundryServices,
            serviceSelected: WriteOrder.serviceSelected,
            laundryPrices: WriteOrder.laundryPrices,
            availableElements: cloneDeep(fillAvailableElementsWithServices(WriteOrder.laundryServices)),
            customElementIndexes: [],
            isFullHookChecked: false,
            shouldShowSuccessMessage: true
        });

        console.log(fillAvailableElementsWithServices(WriteOrder.laundryServices));
    };

    return (
        <WriteOrderContext.Provider value={[WriteOrder, setWriteOrder, _resetWriteOrder]}>
            {props.children}
        </WriteOrderContext.Provider>
    );

}



module.exports = {
    WriteOrderContext: WriteOrderContext,
    WriteOrderProvider: WriteOrderProvider
};