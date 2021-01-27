const {useEffect, useState} = require("react");
const {fetchAccountCreds} = require("../ajax-requests/user-creds");


module.exports = function useLaundryName(){

    let [laundryName, setLaundryName] = useState("");

    useEffect(() =>{
        fetchAccountCreds().then(({data:{name}}) =>{
            setLaundryName(name);
        });
    }, []);

    return laundryName;
}