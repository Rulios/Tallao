'use strict';

require( "core-js/stable");
require("regenerator-runtime/runtime");


const React = require("react");
const ReactDOM = require("react-dom");
const dayjs = require("dayjs");
const cloneDeep = require("lodash.clonedeep");

const {getStaticText} = require("../../translation/frontend/translator");

//components
const Navbar = require("./reactComponents/NavbarHandler");
const ClockSpan = require("./reactComponents/ClockSpan");
const CurrentOrderSpan = require("./reactComponents/CurrentOrderIDSpan");
const LaundryNameSpan = require("./reactComponents/LaundryNameSpan");
const CustomerIDHandler = require("./reactComponents/CustomerIDHandler");
const ElementOnOrder = require("./reactComponents/ElementOnOrder");
const UseCustomMessages = require("./reactComponents/UseCustomMessagesHandler");
const LaundryServiceSelector = require("./reactComponents/LaundryServiceSelector");
const DropdownElement = require("./reactComponents/DropdownElement");
const HookQuantityInputs = require("./reactComponents/HookQuantityInputs");

//contexts
const {WriteOrderContext, WriteOrderProvider} = require("./reactContexts/WriteOrderContext");
const {OrderContext, OrderProvider} = require("./reactContexts/OrderContext");

//custom hooks
const useLaundryServices = require("./custom-hooks/useLaundryServices");
const useLaundryPrices = require("./custom-hooks/useLaundryPrices");
const useServerDateTime = require("./custom-hooks/useServerDateTime");

const {ELEMENTS} = require("../../meta/ELEMENTS");
const {HTML_DATE_FORMAT, HTML_TIME_FORMAT_UNTIL_MINUTES, DATE_TIME_FORMAT_UNTIL_MINUTES} = require("../../meta/DATE_TIME_FORMATS");

//ajax requests
const {getUserType} = require("./ajax-requests/user-creds");
const {submitOrder} = require("./ajax-requests/orders");

const io = require("socket.io-client");
const Order = require("./classes/Order");
const WriteOrderContainers = require("./reactComponents/WriteOrderContainers");
const laundryConfigs = require("./ajax-requests/laundry-configs");
const socket = io.connect("/laundry");



window.onload = function(){

    getUserType().then(({data : userType}) =>{


        RenderNavbar(userType);

        ReactDOM.render(
            React.createElement(MainApp, {}),
            document.getElementById("root")
        );
    }).catch(err =>{
        console.log(err);
        alert(getStaticText("ERR_LOADING_DATA"));
    });
};

function RenderNavbar(userType){
    ReactDOM.render(
        React.createElement(Navbar, {
            userType: userType
        }), document.getElementById("NavbarContainer")
    );
}

function MainApp(){

    return (
        <div className="container">
            <Header/>

            <WriteOrderProvider>
                <OrderProvider>
                    <WriteOrderPanel/>
                </OrderProvider>
            </WriteOrderProvider>

        </div>
    );

}

function Header(){
    return (
        <div className="container">
            <div className="karla_font showIDTxt bottomBorder">
                <LaundryName/>
                <Clock/>
                <CurrentOrderID/>
            </div>
        </div>

    );
}


function LaundryName(){
    return (
        <div className="row">
            <div className="text-center col-lg-12 bold">
                <LaundryNameSpan/>
            </div>
        </div>
    );
}

function Clock(){
    return (
        <div className="row">
            <div className="text-center col-lg-12">
                <ClockSpan/>
            </div>
        </div>
    );
}

function CurrentOrderID(){
    return (
        <div className="row">
            <div className="text-center col-lg-12">
                <CurrentOrderSpan socket={socket}/>
            </div>
        </div>
    );
}


function WriteOrderPanel(){

    const [Order, setOrder] = React.useContext(OrderContext);
    const [WriteOrder, setWriteOrder] = React.useContext(WriteOrderContext);
    const laundryServices = useLaundryServices();
    const laundryPrices = useLaundryPrices();

    React.useEffect(() =>{
        const newWriteOrder = cloneDeep(WriteOrder);
        //set default service
        newWriteOrder.serviceSelected = laundryServices[0];
        newWriteOrder.laundryServices = laundryServices;

        if(!Object.entries(newWriteOrder.availableElements).length){
            newWriteOrder.availableElements = fillAvailableElementsWithServices(laundryServices);
        }

        setWriteOrder(newWriteOrder);
    }, [laundryServices]);

    React.useEffect(() =>{
        const newWriteOrder = cloneDeep(WriteOrder);
        newWriteOrder.laundryPrices = laundryPrices;
        setWriteOrder(newWriteOrder);
    }, [laundryPrices]);


    return (
        <div className="row" style={{maxHeight: "100%"}}>
            <div className="col-lg-8">

                <OrderDetailsTitle/>

                <div className="container text-center">
                    <CustomerIDHandler getCustomerData={(customer) => {
                        let newOrder = cloneDeep(Order);
                        newOrder.customer = customer;
                        setOrder(newOrder);
                    }}/>
                </div>

                <br className="small-mediumSeparation"/>
                
                <div className="eightyPercentMaxHeight bottomBorder rightBorder scrollY text-center">
                    <ListOfElementsOnOrder/>
                </div>

                <div className="smallSeparation">
                    <HookQuantityInputs/>
                    <TotalPriceSpan/>
                </div>
                
                <div className="supTxt-TitleTxt-Separation">
                    <IndicationsSection/>
                </div>
            </div>

            <div className="col-lg-4 text-center">
                <div className="titleTxt">{getStaticText("elements")}</div>

                <div className="row">
                    <div className="col-lg-12 text-center karla_font">
                        {getStaticText("selectTheService")}
                    </div>
                </div>


                <div className="row smallSeparation">
                    <div className="col-lg-12 text-center">

                        {laundryServices.length && 
                            <LaundryServiceSelector services={laundryServices}
                                getServiceSelected={(serviceSelected) =>{
                                    const newWriteOrder = cloneDeep(WriteOrder);
                                    newWriteOrder.serviceSelected = serviceSelected;
                                    setWriteOrder(newWriteOrder);
                                }}
                            />
                        }

                    </div>
                </div>

                <div className="eightyPercentMaxHeight doubleScrollable scrollY">
                    {   
                        (Object.keys(WriteOrder.laundryPrices).length && WriteOrder.availableElements[WriteOrder.serviceSelected]) &&
                        <DropdownOfAvailableElements/>}
                </div>

            </div>

            <div className="row small-mediumSeparation">
                <div className="col-lg-l2">
                    <div className="container text-center">

                        <div className="row small-mediumSeparation">
                            <div className="col-lg-12 formRowSeparation">
                                <span className="subTxt bold">{getStaticText("orderScheduledFor")}</span>
                            </div>
                        </div>

                        <div className="row smallSeparation">
                            <div className="col-lg-12 formRowSeparation">
                                <DateTimeInput/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row supTxt-TitleTxt-Separation">
                <div className="col-lg-12 formRowSeparation">
                    <SubmitOrderButton/>
                </div>
            </div>

        </div>
        
    );
}

function OrderDetailsTitle(){
    return (
        <div className="titleTxt text-center">{
            getStaticText("orderDetails")}
        </div>
    );
}

function ListOfElementsOnOrder(){
    let [Order] = React.useContext(OrderContext);
    let {elementsOnOrder} = Order;

    return Object.keys(elementsOnOrder).map(element =>{
        return Object.keys(elementsOnOrder[element]).map(service =>{
            return <ElementOnOrder key={`${element}|${service}`} element={element} service={service}/>;
        });
    });
}

function TotalPriceSpan(){
    const [Order] = React.useContext(OrderContext);
    const {totalPrice} = Order;

    return (
        <span className="totalPriceSpan">
            <span>{`${getStaticText("totalPrice")}: $${totalPrice}`}</span>
        </span>
    );
}

function IndicationsSection(){
    const [Order, setOrder] = React.useContext(OrderContext);
    const {indications} = Order;

    return (
        <span>
            <label htmlFor="inputIndications" className="bold">{getStaticText("indications")}</label>
            <br/>
            <textarea name="inputIndications" style={{width:"100%"}}
                value={indications}
                onChange={(e) =>{
                    const newOrder = cloneDeep(Order);
                    newOrder.indications = e.target.value;
                    setOrder(newOrder);
                }}></textarea>

            <div>
                <UseCustomMessages targetID="inputIndications" 
                    getClickedText={(text) =>{
                        const newOrder = cloneDeep(Order);
                        //append to indications
                        newOrder.indications = `${newOrder.indications} ${text}`;
                        setOrder(newOrder);
                    }
                }/>
            </div>
        </span>
    );
}


function DropdownOfAvailableElements(){

    const [WriteOrder] = React.useContext(WriteOrderContext);
    const {serviceSelected, laundryPrices} = WriteOrder;
    const elementsPriceByService = laundryPrices[serviceSelected];
    
    return WriteOrder.availableElements[serviceSelected].map(element =>{
        const elementPrice = elementsPriceByService[element];
        return (
            <DropdownElement 
                key={`AvailableElement${element}-${serviceSelected}`}
                element={element} 
                service={serviceSelected} 
                elementPrice={elementPrice ?? null}/>
        );
    });
}

function DateTimeInput(){
    const [Order, setOrder] = React.useContext(OrderContext);
    const {dateTimeAssigned} = Order;
    let dateAssigned = "", timeAssigned = "";
    let todayDateTime = useServerDateTime();
    let todayDateTimeString = dayjs(todayDateTime).format(HTML_DATE_FORMAT) ?? "";

    if(dayjs(dateTimeAssigned).isValid() ){
        dateAssigned = dayjs(dateTimeAssigned).format(HTML_DATE_FORMAT) ?? "";
        timeAssigned = dayjs(dateTimeAssigned).format(HTML_TIME_FORMAT_UNTIL_MINUTES) ?? "";
    }


    const onDateChangeHandler = (date) => {

        let newOrder = cloneDeep(Order);
        let year = dayjs(date).year();
        let month = dayjs(date).month();
        let day = dayjs(date).day();

        let newDateTimeAssigned = dayjs(dateTimeAssigned);
        newDateTimeAssigned = newDateTimeAssigned.set("year", year);
        newDateTimeAssigned = newDateTimeAssigned.set("month", month);
        newDateTimeAssigned = newDateTimeAssigned.set("day", day);

        newOrder.dateTimeAssigned = newDateTimeAssigned.format(DATE_TIME_FORMAT_UNTIL_MINUTES);
        setOrder(newOrder);
    };

    const onTimeChangeHandler = (time) => {
        let newOrder = cloneDeep(Order);
        let [hours24, minutes] = time.split(":");

        let newDateTimeAssigned = dayjs(dateTimeAssigned);
        newDateTimeAssigned = newDateTimeAssigned.set("hour", hours24);
        newDateTimeAssigned = newDateTimeAssigned.set("minute", minutes);

        newOrder.dateTimeAssigned = newDateTimeAssigned.format(DATE_TIME_FORMAT_UNTIL_MINUTES);

        setOrder(newOrder);
    };

    if(todayDateTime){
        return (
            <span>
                <label htmlFor="dateAssignedForOrder" className="bold small-rightMargin">   
                    {`${getStaticText("date")}:`}
                </label>
                <input type="date" id="dateAssignedForOrder"
                     min={todayDateTimeString} value={dateAssigned} 
                     onChange={(e) => onDateChangeHandler(e.target.value)}
                />

                <label htmlFor="timeAssignedForOrder" className="bold small-rightMargin">
                    {`${getStaticText("hour")}:`}
                </label>
                <input type="time" id="timeAssignedForOrder" 
                    value={timeAssigned} onChange={(e) => onTimeChangeHandler(e.target.value)}
                />
            </span>
            
        );        
    }else{
        return null;
    }
}   

function SubmitOrderButton(){
    const [Order] = React.useContext(OrderContext);

    const onClickHandler = async () => {
        try{

            let {status, data:{idChar, idNumber}} = await submitOrder(Order);

            if(status === 200){
                alert(`${getStaticText("orderID")}: ${idChar} ${idNumber}`);
            }

        }catch(err){
            console.log(err);
            console.log("can't submit order");
        }
    };

    return (
        <button type="submit" className="submitButtonOrder"
            onClick={() => onClickHandler()}
        >
            {getStaticText("submitOrder_action")}
        </button>
    );
}

function fillAvailableElementsWithServices(services){
    let newAvailableElements = {};
    //push the custom element at the top
    services.map(service =>{
        newAvailableElements[service] = Array.of(...ELEMENTS);
    });
    return newAvailableElements;
}