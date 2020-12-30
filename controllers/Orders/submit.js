const dayjs = require("dayjs");
const AdvancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(AdvancedFormat) // use plugin

const validator = require("validator");
const client = require("../libs/DBConnect");
const ELEMENTS =  require("../libs/ELEMENTS");

const GetPublicID = require("../libs/GetPublicID");
const GetLastOrderID = require("../libs/GetLastOrderID");
const GetCustomerNameByID = require("../libs/GetCustomerNameByID");
const AdvanceToNextOrderID = require("../libs/AdvanceToNextOrderID");
const UpdateLastOrderID = require("./UpdateLastOrderID");

const {emitUpdateOrders} = require("../libs/socketio/events");

const FIRST_STATUS = "wait";

module.exports = function(orders, io){
    orders.post("/submit", async function(req,res){
        try{
            const {hashcode, userType} = req.session;
            if(userType !== "laundry") return res.status(401);

            let laundryInitials = await GetPublicID(userType, hashcode);
            let {id_char : lastIDChar, id_number: lastIDNumber} = await GetLastOrderID(laundryInitials);
            
            let  TODAY_DATE_TIME = dayjs().format("YYYY-MM-DD HH:mm"); //get server date time
            
            let order = req.body;
            let query = "";
            let values = [];
    
            //check if elementsOnOrder obj meets the conditions
            if(!isValidElementsOnOrder(order.elementsOnOrder)) throw new Error("Not valid elements on order");
            //check if totalPrice is not mepty and if positive and not zero
            if(order.totalPrice <= 0) throw new Error("total price not positive or is zero");
            //check if hookQuantity is positive 
            if(order.hookQuantity < 0) throw new Error("hook quantity is not positive");
            //check if dateTimeAssigned complies with the format 
            if(!dayjs(order.dateTimeAssigned, "YYYY-MM-DD HH:MM").isValid()) throw new Error("not valid date time format");
            //check if customerID is not empty
            if(order.customerID){
                if(!validator.isEmpty(order.customerID) && !validator.isLength(order.customerID,5,6)){
                    throw new Error("customerID not in range");
                }
            }

            //remove whitespace
            order.indications = order.indications.trim();
            //escape indications 
            order.indications = validator.escape(order.indications);
            
            //check if the dateTimeAssigned for the order is present or future from today's date time
            if(dayjs(order.dateTimeAssigned).diff(TODAY_DATE_TIME) < 0) throw new Error("Date assigned is past");

            //advance to the next order ID
            let orderID = AdvanceToNextOrderID(lastIDChar, lastIDNumber);
            //////QUERY///////////
            let {
                elementsOnOrder,
                hookQuantity,
                totalPrice,
                dateTimeAssigned,
                customerID,
                indications
            } = order;
            let customerName = await GetCustomerNameByID(customerID);
            if(!customerName) customerID = ""; //clear the customerID

            query = `
                INSERT INTO orders (laundry_initials, customer_id, 
                    customer_name, id, id_char, id_number, status, elements_details,
                    hook_quantity, date_receive, date_assign, total_price, indications)
                VALUES($1, $2, $3, $4, $5, $6::int, $7, $8::json, $9::int, 
                    $10::timestamptz, $11::timestamptz, $12::numeric, $13)
                LIMIT 1;
            `;
          
            values = [
                laundryInitials,
                customerID,
                customerName,
                `${laundryInitials}-${orderID.idChar}${orderID.idNumber}`,
                orderID.idChar,
                orderID.idNumber,
                FIRST_STATUS,
                JSON.stringify(elementsOnOrder),
                Number(hookQuantity),
                TODAY_DATE_TIME,
                dateTimeAssigned,
                totalPrice,
                indications
            ];

            //BEGIN TRANSACTION
            await client.query("BEGIN");
            //insert order
            await client.query(query, values);
            //update last order id
            await UpdateLastOrderID(laundryInitials, orderID);
            //END TRANSACTION
            await client.query("COMMIT;");

            emitUpdateOrders(io, "laundry", laundryInitials);
            if(!validator.isEmpty(customerID)){
                emitUpdateOrders(io, "user", customerID);
            }

            return res.status(200).json(orderID);

        }catch(err){
            console.log(err);
            //returns BAD REQUEST
            return res.status(400).end();
        }
        

    

    });
};

function isValidElementsOnOrder(elementsOnOrder){
    try{
        //check if the elementsOnOrder is not empty
        if(!Object.keys(elementsOnOrder).length) throw new Error();

        Object.keys(elementsOnOrder).map(element =>{
            //check if any of the elements falls in the range of available elements
            //EXCEPTION: those that contains "custom" prefix
            if(!validator.isIn(element, ELEMENTS) && !element.includes("custom")) throw new Error(`${element} is not in the corresponded elmeents`);
            //check for numerical values (quantity & price)//
            Object.keys(elementsOnOrder[element]).map(service =>{
                let {quantity, price} = elementsOnOrder[element][service];
                //check if the quantity is an integer type
                if(!validator.isInt(quantity.toString())) throw new Error(`${element} quantity is not a integer type`);
                //check if the quantity & the price are positive
                if(quantity <= 0 || price <= 0) throw new Error(`${element} quantity or price are negative`);
            });
        })
    }catch(err){
        console.log(err);
        return false;
    }
    
    return true;
}
