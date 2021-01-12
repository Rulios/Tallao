"use strict";

const client = require("../libs/DB_CONNECT");
const validator = require("validator");
const ORDER_STATUS = require("../../meta/ORDER_STATUS");
const GetPublicID = require("../libs/get/public-id");
const dayjs = require("dayjs");
const {escapeArrayOfObj} = require("../libs/outputs");


const PARAMS_PROPS = [
    "paramSelected", "statusSelected", "elementsToFetch"
];

const SEARCH_PARAMS  =[
    "dateAssign", "dateReceive",
    "dateRange", "orderID", "customerID"
];

const AVAILABLE_INPUTS = [ //determines available inputs
    "date", "hour", "order", "txt"
];


module.exports = function(orders){

    orders.get("/fetch", async function(req,res){

        try{
            const {userType, hashcode} = req.session;
            let {paramsProps, inputs} = req.query;

            //parse the input to obj
            paramsProps = JSON.parse(paramsProps);
            inputs = JSON.parse(inputs);

            let publicID = await GetPublicID(userType, hashcode);
            //validate input
            validateInput(paramsProps, inputs, userType);

            /////QUERY
            let statusArr = getStatusArr(paramsProps.statusSelected);
            let query = buildQuery(paramsProps.paramSelected, statusArr, userType);
            let values = buildValues(publicID,userType, paramsProps, inputs, statusArr);
           
            let result = await client.query(query, values);
            let escapedResult = escapeArrayOfObj(result.rows);

            return res.status(200).json(escapedResult);
        }catch(err){
            console.log(err);
            return res.status(400).json({error: "BAD REQUEST"});
        }


    });
}

function validateInput(paramsProps, inputs, userType){
    //check if every paramsProps matches whitelist
    Object.keys(paramsProps).map(prop =>{
        if(!validator.isIn(prop, PARAMS_PROPS)) throw new Error(`Missing Params prop : ${prop}`);
    });

    /* //prevent the user to search another user
    if(userType === "user" && paramsProps.paramSelected === "customerID") throw new Error("Customer shouldn't search for another customer"); */
    //check if the paramSelected matches available search params
    if(!validator.isIn(paramsProps.paramSelected, SEARCH_PARAMS)) throw new Error(`Search param selecteed not in whitelist`);

    //check if statusSelected is an array.
    //if it's an array, iterate for every status contained
    if(Array.isArray(paramsProps.statusSelected)){
        paramsProps.statusSelected.map(status =>{
            if(!validator.isIn(status, ORDER_STATUS)) throw new Error (`${status} not in order status`);
        });
    }else{
        //check if statusSelected is in ORDER_STATUS and is not "all"
        if(!validator.isIn(paramsProps.statusSelected, ORDER_STATUS) && paramsProps.statusSelected !== "all") throw new Error(`${paramsProps.statusSelected} not in order status`);
    }

    
    //check if every inputs sent, matches whitelist
    Object.keys(inputs).map(inputType =>{
        if(!validator.isIn(inputType, AVAILABLE_INPUTS)) throw new Error(`${inputType} not in input whitelist`);
    });
}

function getStatusArr(statusSelected){
    //check if is an array

    if(Array.isArray(statusSelected)){ //returns the ones selected
        return statusSelected;
    }else if(statusSelected === "all"){ //return all the status
        return ORDER_STATUS;
    }else{
        return [statusSelected]; //return the selected one
    }
}

function buildQuery(paramSelected, statusArr, userType){
    let variableParams = []; //stores $4, $5, $6...
    let query = "";
    let initVariableParamIndex = 0; //states the next param after last static param.

    //set the public id field for the query
    let PUBLIC_ID_FIELD = "";
    if(userType === "laundry"){
        PUBLIC_ID_FIELD = "laundry_initials";
    }else if(userType === "user"){
        PUBLIC_ID_FIELD = "customer_id";
    }

    const preCalculateVariableParams = (initVariableIndex) =>{
        //let the value be available in the scope of the parent  function
        initVariableParamIndex = initVariableIndex;
        for(let i = 0; i < statusArr.length; i++){
            //builds the params indication depending on the statusArr.length
            initVariableParamIndex++;
            variableParams.push(`$${initVariableParamIndex}::text`);
        }
    }

    //describes all the fields needed in the query
    const FIELDS_QUERY = ` 
        SELECT  orders.laundry_initials, orders.customer_id,
                orders.customer_name, orders.id,
                orders.id_char, orders.id_number, orders.status, 
                orders.elements_details, orders.hook_quantity,
                orders.date_receive, orders.date_assign, 
                orders.total_price, orders.indications, 
                laundries.name as laundry_name
        FROM orders, laundries
        WHERE orders.laundry_initials = laundries.initials
    `;

    switch(paramSelected){
        case "dateAssign":
            preCalculateVariableParams(3);
            query = `
                ${FIELDS_QUERY}
                    AND ${PUBLIC_ID_FIELD} = $1
                    AND (date_assign 
                        BETWEEN $2::timestamptz AND $3::timestamptz)
                    AND status IN (${variableParams.join(",")})
                ORDER BY date_assign ASC
                LIMIT $${initVariableParamIndex+1};
            `;
        break;

        case "dateReceive":
            preCalculateVariableParams(3);
            query = `
                ${FIELDS_QUERY}
                    AND ${PUBLIC_ID_FIELD} = $1
                    AND (date_receive 
                        BETWEEN $2::timestamptz AND $3::timestamptz)
                    AND status IN (${variableParams.join(",")})
                ORDER BY date_receive ASC
                LIMIT $${initVariableParamIndex+1}::int;
            `;
        break;

        case "dateRange":
            preCalculateVariableParams(3);
            query = `
                ${FIELDS_QUERY}
                    AND ${PUBLIC_ID_FIELD} = $1
                    AND (date_assign 
                        BETWEEN $2::timestamptz AND $3::timestamptz)
                    AND status IN (${variableParams.join(",")})
                ORDER BY date_assign DESC
                LIMIT $${initVariableParamIndex+1};
            `;         
        break;

        case "orderID":
            query = `
                ${FIELDS_QUERY}
                    AND ${PUBLIC_ID_FIELD} = $1
                    AND id_char = $2::varchar
                    AND id_number = $3::int
                LIMIT 1;
            `;
        break;

        case "customerID":
            if(userType === "laundry"){
                preCalculateVariableParams(2);
                query = `
                    ${FIELDS_QUERY}
                        AND laundry_initials = $1::varchar
                        AND customer_id = $2::varchar
                        AND status IN (${variableParams.join(",")})
                    ORDER BY date_assign ASC
                    LIMIT $${initVariableParamIndex+1};
                `;
            }else if(userType === "user"){
                preCalculateVariableParams(1);
                query = `
                    ${FIELDS_QUERY}
                        AND customer_id = $1::varchar
                        AND status IN (${variableParams.join(",")})
                    ORDER BY date_assign ASC
                    LIMIT $${initVariableParamIndex+1};
                `;
            }
            
        break;
    }
    return query;
}

function buildValues(publicID, userType,paramsProps, inputs, statusArr){
    let {paramSelected, elementsToFetch} = paramsProps;
    let values = [];

    const DATE_CASES = ["dateAssign", "dateReceive", "dateRange"];

    switch(true){
        case (validator.isIn(paramSelected, DATE_CASES)): //DATE CASES
            let {date, hour} = inputs;
            //this is a reference to the start day of the selected one
            //CASES: 

            /*  -paramSelected === dateAssign or dateReceive:
                    set startDateTime relatively to the day and start time the user has introduced

                -paramSelected === dateRange
                    set startDateTime to what the user inputted 
            */

            let startDateTime = (paramSelected === "dateRange") ? `${date.start} ${hour.start}` : `${date.end} 00:00`; 
            let endDateTime = `${date.end} ${hour.end}`; //the one that the user supplies
            //check if valid date time format
            if(!dayjs(endDateTime).isValid()) throw new Error("Not valid date time format");

            values = [
                publicID,
                startDateTime, //start dateTime relative to endDateTime
                endDateTime, //dateTime selected by  the user
                ...statusArr, //variable array
                elementsToFetch //determines the amount of elements to fetch
            ];
        break;
        
        case (paramSelected === "orderID"): //FETCH BY ORDER (SEARCH ORDER)
            let {order: {char, number}} = inputs;
            //check if char inputted is uppercase and alpha
            if(!validator.isUppercase(char) || !validator.isAlpha(char)) throw new Error("Not valid order id char");
            //check if the number is int and positive
            if(!validator.isInt(number.toString()) || number < 0) throw new Error("Not valid number id");

            values = [
                publicID,
                char,
                number
            ];
        break;

        case (paramSelected ==="customerID"): //fetch by customerID

            if(userType === "laundry"){
                let {txt} = inputs;
                //check if the customerID falls in range & uppercase
                if(!validator.isLength(txt, 5,6) || !validator.isUppercase(txt)) throw new Error("Not valid customerID");
                txt = txt.trim();
                values = [
                    publicID,
                    txt,
                    ...statusArr,
                    elementsToFetch
                ];
            }else if(userType === "user"){
                values = [
                    publicID,
                    ...statusArr,
                    elementsToFetch
                ];
            }

            
        break;
    }
    return values;
}
