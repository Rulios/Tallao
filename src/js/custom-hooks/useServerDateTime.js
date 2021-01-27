const {useEffect, useState} = require("react");
const {fetchDateTimeServer} = require("../ajax-requests/server-time");
const dayjs = require("dayjs");

module.exports = function useServerDateTime(){

    let [serverDateTime, setServerDateTime] = useState({});

    useEffect(() =>{
        const ONE_MINUTE_IN_MS = 60000;

        getServerDateTime(setServerDateTime);

        setInterval(() =>{
            getServerDateTime(setServerDateTime);
        }, ONE_MINUTE_IN_MS);

    }, []);

    return serverDateTime;
}

async function getServerDateTime(setServerDateTime){
    try{

        let {data: {dateTime}} = await fetchDateTimeServer();
        setServerDateTime(dateTime);

    }catch(err){
        //get local date time
        let localDateTime = dayjs();

        setServerDateTime(localDateTime);
    }
}