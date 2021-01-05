const React = require("react");
const useNotifications = require("../custom-hooks/useNotifications");

function NotificationBar({socket}){
    let notifications = useNotifications(socket);
   
    if(Object.keys(notifications).length){
        return(
            <div className="eightyPercentMaxHeight doubleScrollable scrollY">
                {Object.keys(notifications).map(notificationID =>{
                    let notification = notifications[notificationID];
                    return(
                        <NotificationBtn 
                            key={notification.id}
                            notification={notification}
                        ></NotificationBtn>
                    ) 
                })}
            </div>
        );
    }else{
        return null;
    }


}

function NotificationBtn({notification: {text}}){
    return (
        <button className="buttonElementStyle">
            <div className="container">
                <div className="row bottomBorder elementSelectStyle">

                    <div className="col-lg-4">
                        <NotificationIcon></NotificationIcon>
                    </div>

                    <div className="col-lg-8">
                        <NotificationText text={text}></NotificationText>
                    </div>
                </div>
            </div>
        </button>
    );
}


function NotificationIcon(){
    return <img className="assetStayStatic" src="/imgs/assets/exclamationMark/exclamationMark.svg" ></img>;
}

function NotificationText({text}){
    return <span className="subTxt">{text}</span>;
}

module.exports = NotificationBar;