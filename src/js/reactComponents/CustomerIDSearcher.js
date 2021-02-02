const React = require("react");
const {useState, useEffect} = React;
const cloneDeep = require("lodash.clonedeep");

const useCustomer = require("../custom-hooks/useCustomer");

const {getStaticText} = require("../../../translation/frontend/translator");


module.exports = function CustomerIDSearcher({shouldReset, getCustomer}){

    const [customer, setCustomer] = useCustomer();

    const [customerID, setCustomerID] = useState("");

    useEffect(() => {

        let isCustomerIDEmpty = customer.id === "";

        if(shouldReset && !isCustomerIDEmpty){
            setCustomerID("");
            setCustomer({
                id: "",
                name: ""
            });
        }

    }, [shouldReset]);

    useEffect(() => {
        getCustomer(customer);
    }, [customer]);

    return (
        <div className="row">
            <div className="col-lg-6">

                <label className="bold small-rightMargin" htmlFor="customerIDSearcher">
                    {`${getStaticText("customerID")}:`}
                </label>

                <input type="text" value={customerID} 
                    maxLength="6" 
                    id="customerIDSearcher"
                    onChange={(e) => {
                        setCustomerID(e.target.value.toUpperCase());
                    }}
                    onBlur={(e) => {
                        const newCustomer = cloneDeep(customer);
                        newCustomer.id = customerID;
                        setCustomer(newCustomer);
                    }}
                />
            </div>

            <div className="col-lg-6">
                    <span className="bold">{`${getStaticText("customer")}:`}</span>
                    <span className={`${!customer.name ? "redTxt" : ""}`}>
                        {`${customer.name ?? getStaticText("doesntExists")}`}
                    </span>
            </div>

        </div>
    );

}   