const {useEffect, useState} = require("react");
const {fetchServiceOffer} = require("../ajax-requests/laundry-configs");


module.exports = function useLaundryServices(){

    let [services, setServices] = useState([]);

    useEffect(() =>{
        fetchServiceOffer().then(({data:{serviceoffer}}) =>{
            setServices(serviceoffer);
        });
    }, []);

    return services;
}