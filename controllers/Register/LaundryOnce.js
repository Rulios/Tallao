const client = require("../libs/DBConnect");
const uniqid = require("uniqid");
const ExistsCustomMessageID = require("../libs/ExistsCustomMessageID");
//these are all the things that are once made
//when a laundry registers for the first time

module.exports = async function(laundryInitials){


    //set initial price chart
    let priceChartQuery = `
        INSERT INTO price_chart(laundry_initials)
        VALUES ($1) 
        LIMIT 1;
    `;
    await client.query(priceChartQuery, [laundryInitials]);

    //set the last order id 
    let lastOrderQuery = `
        INSERT INTO last_order_id(laundry_initials, id_char, id_number)
        VALUES($1, 'A', 0)
        LIMIT 1;
    `;
    await client.query(lastOrderQuery, [laundryInitials]);

    //set the first custom message
    const firstCustomMessage = {
        id: "",
        color_tag: "#E6D1DC",
        tag: "Sin pliegue | 不折",
        message: "Sin pliegue | 不折"
    };
    //generate and check if the custom message id exists
    let rowCountCustomMessageID = 1;
    do{
        firstCustomMessage.id = uniqid(`${laundryInitials}-`);
        rowCountCustomMessageID = await ExistsCustomMessageID([firstCustomMessage.id]);
    }while(rowCountCustomMessageID);

    let firstCustomMessageQuery = `
        INSERT INTO custom_messages(laundry_initials, id, color_tag, tag, message)
        VALUES ($1, $2, $3, $4, $5)
        LIMIT 1;
    `;
    await client.query(firstCustomMessageQuery, [laundryInitials, ...Object.values(firstCustomMessage)]);


}