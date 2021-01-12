const {useState, useEffect} = require("react");

const {fetchNotifications} = require("../ajax-requests/notifications");
const convertArrtoObj = require("../frontendModules/convertArrToObj");

const {getVariableText} = require("../translation/translator");

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

        //to show the newest notifications first
        let reversedNotications = reverseObj(newNotifications);
       
        //SHOULD create a copy of it's reference. Since if we do setNotifications(newNotifications)
        //React wouldn't notice the change. So ALWAYS when updating states w/ objects
        //always use the spread operator inside the curly braces
        setNotifications({...reversedNotications});

    }catch(err){
        console.log(err);
    }
}

function translateNotificationCodeToText(notifications){
    Object.values(notifications).map(notification =>{
        let {code, extras} = notification;

        notification["text"] = getVariableText("notification", code, extras);

    });
    return notifications;
}

function reverseObj(obj){
    let orderedKeys = Object.keys(obj);
    let reversedKeys = orderedKeys.reverse();
    let reversedObj = {};

    //map every reversed key and assign to new obj
    reversedKeys.map(key =>{
        reversedObj[key] = obj[key];
    })
    return reversedObj;
}

module.exports = useNotifications;
