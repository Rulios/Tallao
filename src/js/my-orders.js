"use strict";

require( "core-js/stable");
require("regenerator-runtime/runtime");

const React = require("react");
const {useState} = React;
const ReactDOM = require("react-dom");
const io = require("socket.io-client");

//components
const Navbar =  require("./reactComponents/NavbarHandler");
const SearchOrderBox = require("./reactComponents/SearchOrderBox");
const OrderBox = require("./reactComponents/OrderBoxHandler");
const OrderModal = require("./reactComponents/OrderModalHandler");

//custom hooks
const useOrders = require("./custom-hooks/useOrders");
const useServerDateTime = require("./custom-hooks/useServerDateTime");


const {getUserType} = require("./ajax-requests/user-creds");

const {getStaticText} = require("../../translation/frontend/translator");

let socket;

window.onload = function(){
    

    //get the userType first, so it can render the component depending on that
    getUserType().then(({data : userType}) =>{

        if(userType === "laundry"){
            socket = io.connect("/laundry");
        }else if(userType === "user"){
            socket = io.connect("/user");
        }

        socket.on("connect", () =>{
            console.log("socket connected");
        })

        RenderNavbar(userType);
        ReactDOM.render(
            React.createElement(App, {
                userType:  userType
            }),
            document.getElementById("root")
        );
    }).catch(err =>{
        console.err(err);
    });

}


function RenderNavbar(userType){
    ReactDOM.render(
        React.createElement(Navbar, {
            userType: userType
        }), document.getElementById("NavbarContainer")
    );
}

function App({userType}){

    const {
        orders, 
        paramProps, setParamProps,
        inputs, setInputs
    } = useOrders(socket);

    const [isModalPoppedOut, setIsModalPoppedOut] = useState(false);
    const [orderInModal, setOrderInModal] = useState("");
 
    return (
        <div className="container karla_font">
            <PageTitle userType={userType}/>

            <SearchOrderBox 
                userType={userType}
                paramProps={paramProps} 
                inputs={inputs}
                onChange={({paramProps, inputs}) => {
                    setParamProps(paramProps);
                    setInputs(inputs);
                }}
            />

            <div className="row small-mediumSeparation">
                <OrderBox
                    orders={orders}
                    columnType="col-lg-4"
                    showLaundryName={userType !== "laundry"}
                    onClick={(orderID) => {
                        setOrderInModal(orderID);
                        setIsModalPoppedOut(true);
                    }}
                />
            </div>
                    
            <div>
                {isModalPoppedOut && orderInModal && orders[orderInModal] &&
                    <OrderModal
                        order={orders[orderInModal]}
                        isShowing={isModalPoppedOut}
                        showNextStatusBtn={userType === "laundry"}
                        onClickClose={() => {
                            setOrderInModal("");
                            setIsModalPoppedOut(false);
                        }}
                      
                    />
                }
            </div>

        </div>
    );

}

function PageTitle({userType}){
    const titles = {
        laundry: "ordersAffiliatedToYourLaundry",
        user: "myOrders"
    }

    return (
        <div className="row">
            <div className="col-lg-12 text-center titleTxt">
                {getStaticText(titles[userType])}
            </div>
        </div>
    );
}


