const {useState, useEffect} = require("react");

const {fetchNotifications} = require("../ajax-requests/notifications");
const convertArrtoObj = require("../frontendModules/convertArrToObj");

const NOTIFICATION_CODES = require("../../../meta/NOTIFICATION_CODES");

function useNotifications(socket){
    let [notifications, setNotifications] = useState({}); 

    useEffect(() =>{
        
        processNotifications(notifications, setNotifications);
        socket.on("notification", async () =>{
            processNotifications(notifications, setNotifications);
        });
    }, []);

    return notifications;
}

async function processNotifications(currentNotifications, setNotifications ){
    try{
        let {data: notifications, response} = await fetchNotifications();
        let notificationsObj = convertArrtoObj(notifications);
        let notificationsWithText = translateNotificationCodeToText(notificationsObj);
        let newNotifications = Object.assign(currentNotifications, notificationsWithText);

        //SHOULD create a copy of it's reference. Since if we do setNotifications(newNotifications)
        //React wouldn't notice the change. So ALWAYS when updating states w/ objects
        //always use the spread operator inside the curly braces
        setNotifications({...newNotifications});

    }catch(err){
        console.log(err);
    }
}



function translateNotificationCodeToText(notifications){
    Object.values(notifications).map(notification =>{
        notification["text"] = getNotificationText(notification.code, notification.extras);
    });
    return notifications;
}

function getNotificationText(code, extras){

    console.log(extras);


    let {
        laundryName,
        status,
        orderID
    } = extras;


    laundryName = setEmptyStringIfUndefined(laundryName);
    status = setEmptyStringIfUndefined(status);
  

    const TRANSLATION_ES = {
        [NOTIFICATION_CODES.NEW_ORDER_NOTIF_CODE]: `¡Tienes una nueva orden de la Lavandería ${laundryName}!`,
        [NOTIFICATION_CODES.NEW_ORDER_STATUS_NOTIF_CODE]: {
            processing : `¡La ${laundryName} está procesando tu orden ${orderID.id_char}${orderID.id_number}!`,
            ready: `¡Ya puedes retirar tu orden ${orderID.orderID.id_char}${orderID.id_number} de la ${laundryName}!`,
            retired: `Has retirado la orden ${orderID.id_char}${orderID.id_number} de la ${laundryName}` 
        }
    };

    if(code === NOTIFICATION_CODES.NEW_ORDER_STATUS_NOTIF_CODE){
        return TRANSLATION_ES[code][extras.status];
    }

    return (TRANSLATION_ES[code]) ? TRANSLATION_ES[code] : "ERROR AL TRADUCIR NOTIFICACIÓN";
}

function setEmptyStringIfUndefined(value){
    if(typeof value === undefined) value = "";
    return value;
}

module.exports = useNotifications;
