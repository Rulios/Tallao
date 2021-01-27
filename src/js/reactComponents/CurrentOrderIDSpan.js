const React = require("react");
const useCurrentOrderID = require("../custom-hooks/useCurrentOrderID");
const {getStaticText} = require("../../../translation/frontend/translator");

module.exports = function CurrentOrderSpan({socket}){
    let {idChar, idNumber} = useCurrentOrderID(socket);

    let stringForID = "";

    if(idChar || idNumber){
        stringForID = `${idChar} ${idNumber}`;
    }else{
        stringForID = "Error";
    }

    return (
        <span>{`${getStaticText("orderID")} : ${stringForID}`}</span>
    );
}