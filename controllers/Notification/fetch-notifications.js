const getNotifications = require("../libs/notifications/get-notifications");
const getPublicID = require("../libs/get/public-id");
const setNotificationsAsViewed = require("../libs/notifications/set-notifications-as-viewed");
module.exports = function(notification){
    notification.get("/fetch", async function(req,res){

        try{
            const {userType, hashcode} = req.session;

            const {shouldFetchViewed} = req.query;
            if(typeof shouldFetchViewed !== "boolean" && typeof shouldFetchViewed !== "undefined") return res.status(400).end();

            const PUBLIC_ID = await getPublicID(userType, hashcode);

            let notifications = await getNotifications(PUBLIC_ID, userType, shouldFetchViewed);

            setNotificationsAsViewed(PUBLIC_ID, userType);

            return res.status(200).json(notifications);

        }catch(err){
            console.log(err);
            return res.status(500).end();
        }
    });
}