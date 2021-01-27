const {useState, useEffect} = require("react");
const {fetchElementsPrice} = require("../ajax-requests/laundry-configs");

module.exports =  function useElementsPrice(){
    let [elementsPrice, setElementsPrice] = useState({});

    useEffect(() => {
        processElementsPrice(setElementsPrice);
    }, []);

    return elementsPrice;
}

async function processElementsPrice(setElementsPrices){ 
    try{
        let {data: elementsPrice} = await fetchElementsPrice();
        let parsedElementsPrice = parseElementsPriceToDecimal(elementsPrice);
        setElementsPrices(parsedElementsPrice);
    }catch(err){
        console.log(err);
    }
}

function parseElementsPriceToDecimal(elementsPrice){
    //traverse the data structure, getting to the element price and parse it
    Object.keys(elementsPrice).map(service =>{
        Object.keys(elementsPrice[service]).map(element =>{
            elementsPrice[service][element] = parseTextToDecimal(elementsPrice[service][element]);
        });
    });
    return elementsPrice;
}

function parseTextToDecimal(text){
    return Number(parseFloat(text).toFixed(2));
}
