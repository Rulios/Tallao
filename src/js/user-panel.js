'use strict';

require( "core-js/stable");
require("regenerator-runtime/runtime");

const React = require("react");
const {useState, useEffect} = React;
const ReactDOM = require("react-dom");
const dayjs = require("dayjs");
const cloneDeep = require("lodash.clonedeep");

const useServerDateTime = require("./custom-hooks/useServerDateTime");
const useOrders = require("./custom-hooks/useOrders");

const OrderBoxHandler = require("./reactComponents/OrderBoxHandler");
const OrderModalHandler = require("./reactComponents/OrderModalHandler");
const NotificationBar = require("./reactComponents/NotificationBar");
const Navbar = require("./reactComponents/NavbarHandler");

const {fetchAccountCreds, getUserType} = require("./ajax-requests/user-creds");

const {getStaticText} = require("../../translation/frontend/translator");

const io = require("socket.io-client");
const userSocket = io.connect("/user");

userSocket.on("connect", () =>{
    console.log("socket connected");
}); 

window.onload = function(){
    try{
        getUserType().then(({data : userType}) =>{
            RenderNavbar(userType);
            RenderPublicID();
            RenderOrders();
            RenderNotificationBar(userSocket);
        });
    }catch{
        alert(getStaticText("ERR_LOADING_DATA"));
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
        document.getElementById("showID").textContent = `${getStaticText("yourPublicIDIs")}: ${public_id}`;
    })
    .catch(err =>{
        document.getElementById("showID").textContent = `${getStaticText("yourPublicIDIs")}: ERROR`;
    })    
}

function Orders(){
    //CONSTANT QUERY, THIS QUERY ISN'T CUSTOMIZABLE BY THE USER
    const PARAM_SELECTED = "customerID";
    const STATUS_SELECTED = ["wait", "processing", "ready"];

    const todayDateTime = useServerDateTime();
    const {
        orders, 
        paramProps,setParamProps,
    } = useOrders(userSocket);

    const [isModalPoppedOut, setIsModalPoppedOut] = useState(false);
    const [orderInModal, setOrderInModal] = useState("");

    const setConstantParamSelected = () => {
        const newParamProps = cloneDeep(paramProps);
        newParamProps.paramSelected = PARAM_SELECTED;
        newParamProps.statusSelected = STATUS_SELECTED;
        setParamProps(newParamProps);
    };

    useEffect(() => {
        setConstantParamSelected();
    }, []);

    useEffect(() => {
        /*Wrong implementation. SHOULD REFACTOR LATER
            This is explicitly incorrect. Since it's not react rendered
            by the root div. So the only way to unmount OrderModal HERE
            is just set isShowing as the same state that handles here.

            //FOR LATER
            - Should conditional render this component
            - Should render all components appending to the root div element
        */

        RenderOrderModal({
            order: orders[orderInModal],
            onClickClose: () =>{
                setOrderInModal("");
                setIsModalPoppedOut(false);
            },
            isShowing: isModalPoppedOut
        });
    }, [orderInModal, isModalPoppedOut]);

    if(dayjs(todayDateTime).isValid()){
        return (
            <OrderBoxHandler 
                orders={orders} 
                todayDateTime={todayDateTime}
                columnType="col-lg-12" 
                showLaundryName = {true}
                onClick={(orderID =>{
                    setOrderInModal(orderID);
                    setIsModalPoppedOut(true);
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

