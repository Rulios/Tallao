const client = require("../libs/DBConnect");
const validator = require("validator");
const ORDER_STATUS = require("../../meta/ORDER_STATUS");
const GetLaundryInitials = require("../libs/GetLaundryInitials");
const dayjs = require("dayjs");
const elementsPrice = require("../Laundry/Configs/elementsPrice");




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

            let laundryInitials = await GetLaundryInitials(hashcode);
            //validate input
            validateInput(paramsProps, inputs);

            /////QUERY
            let statusArr = getStatusArr(paramsProps.statusSelected);
            let query = buildQuery(paramsProps.paramSelected, statusArr);
            let values = buildValues(laundryInitials, paramsProps, inputs, statusArr);
            /* console.log(query);
            console.log(values); */
            let result = await client.query(query, values);
            //console.log(result);
            //console.log(result);
            return res.status(200).json(result.rows);
        }catch(err){
            console.log(err);
            return res.status(400).json({error: "BAD REQUEST"});
        }


    });
}

function validateInput(paramsProps, inputs){
    //check if every paramsProps matches whitelist
    Object.keys(paramsProps).map(prop =>{
        if(!validator.isIn(prop, PARAMS_PROPS)) throw new Error(`Missing Params prop : ${prop}`);
    });
    //check if the paramSelected matches available search params
    if(!validator.isIn(paramsProps.paramSelected, SEARCH_PARAMS)) throw new Error(`Search param selecteed not in whitelist`);
    //check if statusSelected is in ORDER_STATUS and is not "all"
    if(!validator.isIn(paramsProps.statusSelected, ORDER_STATUS) && paramsProps.statusSelected !== "all") throw new Error(`${paramsProps.statusSelected} not in order status`);
    //check if every inputs sent, matches whitelist
    Object.keys(inputs).map(inputType =>{
        if(!validator.isIn(inputType, AVAILABLE_INPUTS)) throw new Error(`${inputType} not in input whitelist`);
    });
}

function getStatusArr(statusSelected){
    if(statusSelected === "all"){ //return all the status
        return ORDER_STATUS;
    }else{
        return [statusSelected]; //return the selected one
    }
}

function buildQuery(paramSelected, statusArr){
    let variableParams = []; //stores $4, $5, $6...
    let query = "";
    let iValues = 3; //states the next param after last static param. $3

    //console.log(statusArr);

    for(let i = 0; i < statusArr.length; i++){
        //builds the params indication depending on the statusArr.length
        iValues++;
        variableParams.push(`$${iValues}::text`);
    }

    switch(paramSelected){
        case "dateAssign":
            query = `
                SELECT * FROM orders
                WHERE laundry_initials = $1
                    AND (date_assign 
                        BETWEEN $2::timestamptz AND $3::timestamptz)
                    AND status IN (${variableParams.join(",")})
                ORDER BY date_assign ASC
                LIMIT $${iValues+1};
            `;
        break;

        case "dateReceive":
            query = `
                SELECT * FROM orders
                WHERE laundry_initials = $1
                    AND (date_receive 
                        BETWEEN $2::timestamptz AND $3::timestamptz)
                    AND status IN (${variableParams.join(",")})
                ORDER BY date_receive ASC
                LIMIT $${iValues+1}::int;
            `;
        break;

        case "dateRange":
            query = `
                SELECT * FROM orders
                WHERE laundry_initials = $1
                    AND (date_assign 
                        BETWEEN $2::timestamptz AND $3::timestamptz)
                    AND status IN (${variableParams.join(",")})
                ORDER BY date_assign DESC
                LIMIT $${iValues+1};
            `;         
        break;

        case "orderID":
            query = `
                SELECT * FROM orders
                WHERE laundry_initials = $1
                AND id_char = $2::varchar
                AND id_number = $3::int
                LIMIT 1;
            `;
        break;

        case "customerID":
            query = `
                SELECT * FROM orders
                WHERE customer_id = $1::varchar
                ORDER BY date_assign ASC;
            `;
        break;
    }
    return query;
}

function buildValues(laundryInitials, paramsProps, inputs, statusArr){
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
                laundryInitials,
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
                laundryInitials,
                char,
                number
            ];
        break;

        case (paramSelected ==="customerID"): //fetch by customerID
            let {txt} = inputs;
            //check if the customerID falls in range & uppercase
            if(!validator.isLength(txt, 5,6) || !validator.isUppercase(txt)) throw new Error("Not valid customerID");

            txt = txt.trim();

            values = [
                txt
            ];
        break;
    }
    return values;
}
