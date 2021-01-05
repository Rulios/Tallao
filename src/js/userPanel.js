'use strict';

require( "core-js/stable");
require("regenerator-runtime/runtime");

const React = require("react");
const ReactDOM = require("react-dom");
const dayjs = require("dayjs");

const OrderBoxHandler = require("./reactComponents/OrderBoxHandler");
const OrderModalHandler = require("./reactComponents/OrderModalHandler");
const NotificationBar = require("./reactComponents/NotificationBar");

const {fetchOrders} = require("./requestsModules/ajaxReqOrders");
const {getDateTimeFromServer} = require("./reactComponents/Time");
const {fetchAccountCreds, getUserType} = require("./requestsModules/ajaxReqUserCreds");
const Navbar = require("./reactComponents/NavbarHandler");
const convertArrToObj = require("./frontendModules/convertArrToObj");

const textEs = {
    yourPublicIDIs: "Tu ID público es"
}

const io = require("socket.io-client");

const userSocket = io.connect("/user");

userSocket.on("connect", () =>{
    console.log("socket connected");
}) 


window.onload = function(){
    try{
        getUserType().then(({data : userType}) =>{
            RenderNavbar(userType);
            RenderPublicID();
            RenderOrders();
            RenderNotificationBar(userSocket);
        });
    }catch{
        alert("Error al cargar datos");
    }
}

function RenderNavbar(userType){
    ReactDOM.render(
        React.createElement(Navbar, {
            userType: userType
        }), document.getElementById("NavbarContainer")
    );
}

function RenderOrders(){
    ReactDOM.render(
        <Orders></Orders>,
        document.getElementById("container4Orders")
    );
}

function RenderNotificationBar(socket){
    ReactDOM.render(
        <NotificationBar socket={socket}></NotificationBar>,
        document.getElementById("notificationsContainer")
    );
}

function RenderPublicID(){
    fetchAccountCreds()
    .then(({data: {public_id}}) =>{
        document.getElementById("showID").textContent = `${textEs.yourPublicIDIs}: ${public_id}`;
    })
    .catch(err =>{
        document.getElementById("showID").textContent = `${textEs.yourPublicIDIs}: ERROR`;
    })    
}

function Orders(){
    //CONSTANT QUERY, THIS QUERY ISN'T CUSTOMIZABLE BY THE USER
    const paramSelected = "customerID";
    const statusSelected = ["wait", "processing", "ready"];

    let [todayDateTime, setTodayDateTime] = React.useState({});
    let [orders, setOrders] = React.useState({});
    let [paramProps, setParamProps] = React.useState({
        paramSelected: paramSelected,
        statusSelected: statusSelected,
        elementsToFetch: 10
    });
    let [isScrollBottomAttached, setScrollBottomAttached] = React.useState(false);
    let [ModalStates, setModalStates] = React.useState({
        isModalPoppedOut : false,
        orderInModal: ""
    });

    const onClickOrderHandler = () =>{ //Render order modal
        RenderOrderModal({
            order: orders[ModalStates.orderInModal],
            onClickClose: () => setModalStates({isModalPoppedOut: false, orderInModal: ""}),
            isShowing: ModalStates.isModalPoppedOut
        });
    }

    const processOrders = () =>{ //fetch orders and insert at the React state
        fetchOrders({
            paramsProps: paramProps,
            inputs: {}
        }).then(({data: fetchedOrders}) =>{
            let newOrders = JSON.parse(JSON.stringify(orders));
            newOrders = Object.assign(newOrders, convertArrToObj(fetchedOrders));
            setOrders(newOrders);
        }).catch(err =>{
            console.error(err);
        });
    }

    React.useEffect(() =>{
        processOrders();
        userSocket.on("update-orders", () =>{
            processOrders();
        });
    }, []);

    React.useEffect(() =>{
        if(!isScrollBottomAttached){
            window.addEventListener("scroll", function(){
                if(document.documentElement.clientHeight + window.pageYOffset >= getDocHeight() ){
                    let newParamProps = JSON.parse(JSON.stringify(paramProps));
                    newParamProps["elementsToFetch"] += 10;
                    setParamProps(newParamProps);
                }
            });
            setScrollBottomAttached(true);
        }

        getDateTimeFromServer().then(dateTime =>{
            //fetch from server time
            setTodayDateTime(dateTime);
        }).catch(err =>{
            //fetch from local system
            console.log("Error in fetching date time from server");
            setTodayDateTime(dayjs());
        });

        onClickOrderHandler();
    }, [paramProps, ModalStates]);

    if(dayjs(todayDateTime).isValid()){
        return (
            <OrderBoxHandler 
                orders={orders} 
                todayDateTime={todayDateTime}
                columnType="col-lg-12" 
                showLaundryName = {true}
                onClick={(orderID =>{
                    setModalStates({
                        isModalPoppedOut: true,
                        orderInModal: orderID
                    });
                })}
            ></OrderBoxHandler>
        );
    }else{
        return null;
    }

    
}

function RenderOrderModal({order, onClickClose,onUpdateOrders, isShowing}){
    ReactDOM.render(
        <OrderModalHandler 
            order={order}
            isShowing={isShowing}
            onClickClose = {() => onClickClose()}
            onUpdateOrders = {()=> onUpdateOrders()}
            showNextStatusBtn = {false}
            ></OrderModalHandler>,
        document.getElementById("OrderModalContainer")
    )
}

function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}