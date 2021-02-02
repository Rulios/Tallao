const {useState, useEffect} = require("react");
const cloneDeep = require("lodash.clonedeep");

const {customerByID: searchCustomerByID} = require("../ajax-requests/search");

module.exports = function useCustomer(){
    
    const [customer, setCustomer] = useState({
        id:"", name: ""
    });


    useEffect(async () => {

        let newCustomer = cloneDeep(customer);

        try{
            let {data} = await searchCustomerByID({inputCustomerID: customer.id.toUpperCase()});

            if(data){
                let {name, surname} = data;
                newCustomer.name = `${name.trim()} ${surname.trim()}`;
            }else{
                newCustomer.name = null;
            }

        }catch(err){
            newCustomer.name = null;
        }
        
        setCustomer(newCustomer);

    }, [customer.id]); 

    return [customer, setCustomer];

}