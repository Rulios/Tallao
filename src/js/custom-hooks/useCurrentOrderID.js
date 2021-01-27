const {useEffect, useState} = require("react");
const {fetchCurrentOrderID} = require("../ajax-requests/laundry-configs");

module.exports = function useServerDateTime(socket){

    let [currentOrderID, setCurrentOrderID] = useState({});

    useEffect(() =>{
        getCurrentOrderID(setCurrentOrderID);

        socket.on("new-current-order-id", function(){
            getCurrentOrderID(setCurrentOrderID);
        });

    }, []);

    return currentOrderID;
}

async function getCurrentOrderID(setCurrentOrderID){
    try{

        let {data: currentOrderID} = await fetchCurrentOrderID();

        setCurrentOrderID(currentOrderID);

    }catch(err){
        console.log(err);

        setCurrentOrderID({idChar: null, idNumber: null});
    }
}