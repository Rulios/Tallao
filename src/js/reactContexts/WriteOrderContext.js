const React = require("react");
const {useState} = React;



const WriteOrderContext = React.createContext();

function WriteOrderProvider(props){
    const [WriteOrder, setWriteOrder] = useState({
        laundryServices: [],
        serviceSelected: "",
        laundryPrices: {},
        availableElements: {},
        customElementIndexes: [],
        isFullHookChecked: false
    });

    return (
        <WriteOrderContext.Provider value={[WriteOrder, setWriteOrder]}>
            {props.children}
        </WriteOrderContext.Provider>
    );

}


module.exports = {
    WriteOrderContext: WriteOrderContext,
    WriteOrderProvider: WriteOrderProvider
};