"use strict";
// main.js
require.config({
    // module name mapped to CDN url
    paths: {
        jquery: [
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
            "./lib/jquery"],
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development',
        WriteOrderContainers: "./reactComponents/WriteOrderContainers",
        ajaxReqSuperUserConfigs: "../js/requestsModules/ajaxReqSuperUserConfigs"
    }
});

// load the modules defined above
//inputs shouldn't have a children
//styles should be a object
define(["jquery", 'react', 'react-dom', "WriteOrderContainers", "ajaxReqSuperUserConfigs"], 
function($, React, ReactDOM, WriteOrderContainers, ajaxReq){

    const elements = [
        "custom", "shirt", "pants", "skirt", "coat",
        "sweater", "pleatedSkirt", "overall", "jumper",
        "blouse", "largeSuit", "quilt"
    ];

    function renderHookHandler(props){
        //props: idContainer, onCheckFullHook, checkStatus, onChangeHookQuantity
        //render: fullHookCheckBox & WriteOrderContainers.inputHookQuantity
        ReactDOM.render(
            [React.createElement(WriteOrderContainers.fullHookCheckBox, {
                key: "checkFullHook",
                checkStatus: props.checkStatus,
                onCheck: (dataBool) => {props.onCheckFullHook(dataBool);},
            }),

            React.createElement(WriteOrderContainers.inputHookQuantity, {
                key: "WriteOrderContainers.inputHookQuantity",
                hookQuantity: props.hookQuantity,
                onChange: (dataN) => {props.onChangeHookQuantity(dataN);}
            })
            ]
            ,document.getElementById(props.idContainer)
        )
    }

    function renderElementsOnOrder({activeElementsOnOrder, onClickDelete, 
        onUpdateQuantity, onUpdateUnitPrice, onUpdateElementNameIfCustom}){
        return(
            //traverse the elements on order
            Object.keys(activeElementsOnOrder).map((elementName) =>{
                //traverse the services of the element on order
                return Object.keys(activeElementsOnOrder[elementName]).map(service =>{
                    return React.createElement(WriteOrderContainers.elementOnOrder, {
                        key: `${elementName}-${service}`,
                        id: elementName,
                        price: activeElementsOnOrder[elementName][service]["price"],
                        quantity: activeElementsOnOrder[elementName][service]["quantity"],
                        service: service, 
                        onClickDelete: (elementID,service) =>onClickDelete(elementID,service),
                        onUpdateQuantity: (elementID,service, value) => onUpdateQuantity(elementID,service, value),
                        onUpdateUnitPrice: (elementID,service, value) =>onUpdateUnitPrice(elementID,service,value),
                        onUpdateElementNameIfCustom: (elementID,service, value) =>onUpdateElementNameIfCustom(elementID,service, value)
                    });
                });
            })
        );
    }

    function renderSelectableElementsOnOrder({
        elementsOnSelectList, serviceOffer, elementsPrice, onClick
    }){
        return React.createElement("div", null, 
            elementsOnSelectList[serviceOffer].map(elementName =>{
                return React.createElement(WriteOrderContainers.selectableElementToOrder, {
                    key: `${elementName}-${serviceOffer}`,
                    id: elementName,
                    elementPrice: (elementsPrice[serviceOffer] !== null) ? elementsPrice[serviceOffer][elementName] : undefined,
                    elementString: WriteOrderContainers.elementsString[elementName],
                    service: serviceOffer,
                    onClick: (elementID, service) => onClick(elementID, service),
                })
            })
        );
    }

    function returnNewElementsPrice(priceObj, elements){ 
        //traverse thru the services of the priceObj
        Object.keys(priceObj).map(service =>{
            if(!isNaN(parseInt(service))){
                //delete the number indexes
                delete priceObj[service];
            }else{
                priceObj[service] = JSON.parse(priceObj[service]);
                //match the elements of the laundry with the priceObj
                elements.map(element =>{
                    //if the element of the laundry do not exists in the price
                    //create a prop with the element price with value 0
                    if(!priceObj[service].hasOwnProperty(element) && service !== "hook"){
                        priceObj[service] = Object.assign(priceObj[service], {[element] : 0});
                    }
                });
            }
        });
        return priceObj;
    }

    async function fetchElementsPrice(elements){
        //fetchs the elements price (all)
        //returns a obj with 2 props (elementsPrice(includes elements and hook(price)))
        try{
            let data = await ajaxReq.fetchElementsPrice();
            let priceObj = JSON.parse(data);
            let newElementsPrice = returnNewElementsPrice(priceObj, elements);
            return newElementsPrice;
        }catch(err){
            console.log(err);
        }
    }

    function onElementSelectFromList({id, service}, WriteOrderDetails){
        let NewWriteOrderDetails = $.extend({}, WriteOrderDetails);
        
        //destructure from deep copy obj 
        //NOT ALL PROPS NEEDED BY THIS FUNCTION ARE DESTRUCTURED
        //since they're not object nor arrays, they lose their reference to the main obj
        const elementsPrice = NewWriteOrderDetails.configs.elementsPrice;
        let {elementsOnSelectList, customOrdersIndexes} = NewWriteOrderDetails.configs;
        let {activeElementsOnOrder} = NewWriteOrderDetails.order;
        //the format for tagging custom elements are custom1, custom2, custom3... and so on
        //So customOrdersIndexes will store all the indexes, and it will be re-sorted
        //every time it inputs a new index (inputs a new custom element), this is just
        //to naming purposes of object properties at activeElementsOnOrder
        if(id.indexOf("custom") !== -1){
            if(customOrdersIndexes.length === 0){
                id = `${id}1`; //as first custom element of the order
                customOrdersIndexes.push(1);
            }else{
                //sort the array in ascending order
                customOrdersIndexes.sort(function(a, b){return a-b}); 
                //get the last element in array and increment it by 1
                id = `${id}${customOrdersIndexes[customOrdersIndexes.length - 1] + 1}`; 
                //add new index
                customOrdersIndexes.push(customOrdersIndexes.length + 1);
            }
        }

        //add new element to order if it do not exists
        if(!activeElementsOnOrder.hasOwnProperty(id)) activeElementsOnOrder[id] = {};

        //element initialization with values (quantity and price)
        activeElementsOnOrder[id][service] = {};
        activeElementsOnOrder[id][service]["quantity"] = 1;
        //special case: when clicked the custom element, it should start as 1.
        activeElementsOnOrder[id][service]["price"] = (id.indexOf("custom") !== -1) ? 1 : elementsPrice[service][id];

        //delete the element from the select list 
        if(id.indexOf("custom") === -1) elementsOnSelectList[service].splice(elementsOnSelectList[service].indexOf(id), 1);
        //get the total elements quantities
        NewWriteOrderDetails.order.sumElementsQuantities = sumAllElementsQuantities(activeElementsOnOrder);
        //adjsut hook
        NewWriteOrderDetails.order.hookQuantity = adjustHookQByFullHookChecked(NewWriteOrderDetails);
        //get the total price
        NewWriteOrderDetails.order.totalPrice = calcTotalPrice(activeElementsOnOrder, NewWriteOrderDetails.order.hookQuantity);

        return NewWriteOrderDetails;
    }

    function deleteElementFromOnOrder({id, service}, WriteOrderDetails){
        let NewWriteOrderDetails = $.extend({}, WriteOrderDetails);
        
        //destructure from deep copy obj 
        //NOT ALL PROPS NEEDED BY THIS FUNCTION ARE DESTRUCTURED
        //since they're not object nor arrays, they lose their reference to the main obj
        let {elementsOnSelectList, customOrdersIndexes} = NewWriteOrderDetails.configs;
        let {activeElementsOnOrder} = NewWriteOrderDetails.order;
        //find the initial position of the element to be added on the array on List
        //except when custom
        if(id.indexOf("custom") === -1){
            let positionOnOriginal = elements.indexOf(id);
            elementsOnSelectList[service].splice(positionOnOriginal, 0, id);
        }

        //delete prop from activeElementsOnOrder
        //if it has no service, it will be totally deleted
        //else, it will only delete the service property
        if(Object.keys(activeElementsOnOrder[id]).length > 1){
            delete activeElementsOnOrder[id][service];
        }else{
            delete activeElementsOnOrder[id];
        }

        NewWriteOrderDetails.order.sumElementsQuantities = sumAllElementsQuantities(activeElementsOnOrder);

        //CORRECT HOOKQ | it shouldn't surpass the sumElementsQuantity, but it shouldn't decrement also
        if(NewWriteOrderDetails.order.hookQuantity > NewWriteOrderDetails.order.sumElementsQuantities){
            NewWriteOrderDetails.order.hookQuantity = NewWriteOrderDetails.order.sumElementsQuantities;
        }
       
        NewWriteOrderDetails.configs.isFullHookChecked = adjustFullHookCheckedByHookQ(NewWriteOrderDetails);

        NewWriteOrderDetails.order.totalPrice = calcTotalPrice(activeElementsOnOrder,NewWriteOrderDetails.order.hookQuantity); 
        return NewWriteOrderDetails;
    }

    function updateElementQuantity({id, service, value}, WriteOrderDetails){
        let NewWriteOrderDetails = $.extend({}, WriteOrderDetails);
        
        //destructure from deep copy obj 
        //NOT ALL PROPS NEEDED BY THIS FUNCTION ARE DESTRUCTURED
        //since they're not object nor arrays, they lose their reference to the main obj
        let {activeElementsOnOrder} = NewWriteOrderDetails.order;

        activeElementsOnOrder[id][service]["quantity"] = parseFloat(value);
        //sum elements quantities
        NewWriteOrderDetails.order.sumElementsQuantities = sumAllElementsQuantities(activeElementsOnOrder);
        //adjust hook quantity
        NewWriteOrderDetails.order.hookQuantity = adjustHookQByFullHookChecked(NewWriteOrderDetails);
        //adjust full hook checked status
        NewWriteOrderDetails.configs.isFullHookChecked = adjustFullHookCheckedByHookQ(NewWriteOrderDetails);

        NewWriteOrderDetails.order.totalPrice = calcTotalPrice(activeElementsOnOrder,NewWriteOrderDetails.order.hookQuantity); 

        return NewWriteOrderDetails;
    }

    function updateElementUnitPrice({id, service, value}, WriteOrderDetails){
        let NewWriteOrderDetails = $.extend({}, WriteOrderDetails);
        
        //destructure from deep copy obj 
        //NOT ALL PROPS NEEDED BY THIS FUNCTION ARE DESTRUCTURED
        //since they're not object nor arrays, they lose their reference to the main obj
        let {activeElementsOnOrder} = NewWriteOrderDetails.order;

        activeElementsOnOrder[id][service]["price"] = parseFloat(value);

        //sum elements quantities
        NewWriteOrderDetails.order.sumElementsQuantities = sumAllElementsQuantities(activeElementsOnOrder);

        NewWriteOrderDetails.order.totalPrice = calcTotalPrice(activeElementsOnOrder,NewWriteOrderDetails.order.hookQuantity); 
        return NewWriteOrderDetails;
    }

    function updateCustomElementName({id, service, value}, WriteOrderDetails){
        let NewWriteOrderDetails = $.extend({}, WriteOrderDetails);
        let {activeElementsOnOrder} = NewWriteOrderDetails.order;
        activeElementsOnOrder[id][service]["name"] = value;
        return NewWriteOrderDetails;
    }

    function sumAllElementsQuantities(activeElementsOnOrder){ //sum all the quantities of elements inside the order
        let sumElementsQuantity = 0;
        //traverse for each element on order
        Object.keys(activeElementsOnOrder).map(elementName =>{
            //traverse for each service the element on order
            Object.keys(activeElementsOnOrder[elementName]).map(service =>{
                sumElementsQuantity += activeElementsOnOrder[elementName][service]["quantity"];
            });
        });
        return sumElementsQuantity;
    }

    function adjustHookQByFullHookChecked(WriteOrderDetails){
        //if the user has checked full hook, then the hook quantity provided will be the same as sumElementsQuantity
        //if not, it will just increment by one the previous hook quantity provided
        let {isFullHookChecked} = WriteOrderDetails.configs;
        let {sumElementsQuantities, hookQuantity} = WriteOrderDetails.order;
        return (isFullHookChecked) ? sumElementsQuantities : ++ hookQuantity;
    }

    function adjustFullHookCheckedByHookQ(WriteOrderDetails){
        let {sumElementsQuantities, hookQuantity} = WriteOrderDetails.order;
        return (hookQuantity === sumElementsQuantities) ? true : false;
    }

    function calcTotalPrice(activeElementsOnOrder, hookQuantity){
        //params: elementsOnOrder (object), hookQuantity (int), sumElementsQuantity (int)
        let total = 0;
        let sumElementsQuantity = sumAllElementsQuantities(activeElementsOnOrder);
        //traverse for each element on order
        Object.keys(activeElementsOnOrder).map(elementName =>{
            //traverse for each service the element on order
            Object.keys(activeElementsOnOrder[elementName]).map(service =>{
                total += activeElementsOnOrder[elementName][service]["price"] * activeElementsOnOrder[elementName][service]["quantity"];
                total = Number(total.toFixed(2));
            });
        });
        
        hookQuantity = parseInt(hookQuantity);
        //if missing hooks, multiply by sumElemenetsQuantity - hookQuantity
        if(hookQuantity !== undefined && hookQuantity < sumElementsQuantity){
            let priceHook = this.state.hookPrice * (sumElementsQuantity - hookQuantity);
            priceHook = Number(priceHook.toFixed(2));
            
            if(priceHook >= 0){//prevent a discount on priceHooks
                total += priceHook; //add missing hookPrice to the original price
            }
        }
        return parseFloat(total.toFixed(2));
    }

    
    class WriteOrderPanel extends React.Component{
        //props: hookPrice, serviceOffer,
        //idActiveOnOrderElement(id of HTML element to append when clicking element)
        //idToTotalPrice (id of HTML element to update the total price)

        //states definitions:
        //elementsOnSelectList = all the elements rendered by WriteOrderContainers.selectableElementToOrder
        //activeElemetnsOnOrder = all the elements renderd by WriteOrderContainers.elementOnOrder
        constructor(props){
            super(props);

            //set initial service and it's elements available
            let initialElementsOnList = {};
            initialElementsOnList[this.props.serviceOffer] = elements;
            this.state = {
                elementsPrice: null,
                hookPrice : 0,
                elementsOnSelectList: initialElementsOnList,
                hookQuantity: this.props.order.hookQuantity,
                sumElementsQuantity: 0,
                fullHookCheckStatus: false,
                activeElementsOnOrder: JSON.parse(JSON.stringify(this.props.order.elementsOnOrder)),
                totalPrice: this.props.order.totalPrice,
                indexCustom: [],
                ajaxLoaded: false
            }
        }   

        returnNewElementsPrice(priceObj, service, prevObj){ // will return a new obj with the elementsPrice
            //prevObj is optional, if passed, it will be used as a reference obj to store new price
            let elementsPrice = {
                [service] : {}
            };
            if(priceObj === null){
                let defaultPrice = {};
                elements.map(element =>{
                    defaultPrice[element] = 0;
                });
                priceObj = defaultPrice;
            }
            elementsPrice = Object.assign({
                [service] : priceObj
            }, prevObj);

            Object.assign(elementsPrice[service],{custom: 0});
            return elementsPrice;
        }

        async updateElementsPrice(service){
            //this will do the fetching and updating the state
            //the processing of the elementsPrice is made by 
            //returnNewElementsPrice
            try{
                let data = await ajaxReq.fetchElementsPrice({serviceSelected: service});
                let priceObj = JSON.parse(data);
                let newElementsPrice = this.returnNewElementsPrice(JSON.parse(priceObj[service]), service, this.state.elementsPrice)
                return {
                    newElementsPrice: newElementsPrice,
                    hookPrice : Number(parseFloat(priceObj.hook).toFixed(2)) //toFixed returns a string, so using Number returns a int
                };
            }catch(err){
                console.log(err);
            }
        }

        getSumOfElementsQuantity(elementsOnOrder){ //sum all the quantities of elements inside the order
            let sumElementsQuantity = 0;
            //traverse for each element on order
            Object.keys(elementsOnOrder).map(elementName =>{
                //traverse for each service the element on order
                Object.keys(elementsOnOrder[elementName]).map(service =>{
                    sumElementsQuantity += elementsOnOrder[elementName][service]["quantity"];
                });
            });
            return sumElementsQuantity;
        }

        calcTotalPrice({elementsOnOrder, hookQuantity}){
            //params: elementsOnOrder (object), hookQuantity (int), sumElementsQuantity (int)
            let total = 0;
            let sumElementsQuantity = this.getSumOfElementsQuantity(elementsOnOrder);
            //traverse for each element on order
            Object.keys(elementsOnOrder).map(elementName =>{
                //traverse for each service the element on order
                Object.keys(elementsOnOrder[elementName]).map(service =>{
                    total += elementsOnOrder[elementName][service]["price"] * elementsOnOrder[elementName][service]["quantity"];
                    total = Number(total.toFixed(2));
                });
            });
            
            hookQuantity = parseInt(hookQuantity);
            //if missing hooks, multiply by sumElemenetsQuantity - hookQuantity
            if(hookQuantity !== undefined && hookQuantity < sumElementsQuantity){
                let priceHook = this.state.hookPrice * (sumElementsQuantity - hookQuantity);
                priceHook = Number(priceHook.toFixed(2));
                
                if(priceHook >= 0){//prevent a discount on priceHooks
                    total += priceHook; //add missing hookPrice to the original price
                }
            }
            return parseFloat(total.toFixed(2));
        }

        onElementClick(id, service){
            //create new elementsOnSelectList , and activeElementsOnOrder
            let newelementsOnSelectList = JSON.parse(JSON.stringify(this.state.elementsOnSelectList));
            let newActiveElementsOnOrder = JSON.parse(JSON.stringify(this.state.activeElementsOnOrder));
            let newIndexCustom = this.state.indexCustom.slice();
            let newhookQuantity = 0;
            let sumElementsQuantity = 0;
            let totalPrice =0 ;
            //the format is about custom1, custom2, custom3... and so on
            //So this.state.indexCustom will store all the indices, and it will be re-sorted
            //every time it inputs a new index (inputs a new custom element), this is just
            //to naming purposes of object properties at activeElementsOnOrder
            
            if(id.indexOf("custom") !== -1){
                if(newIndexCustom.length === 0){
                    id = `${id}1`; //as first custom element of the order
                    newIndexCustom.push(1);
                }else{
                    //sort the array in ascending order
                    newIndexCustom.sort(function(a, b){return a-b}); 
                    //get the last element in array and increment it by 1
                    id = `${id}${newIndexCustom[newIndexCustom.length - 1] + 1}`; 
                    //add new index
                    newIndexCustom.push(newIndexCustom.length + 1);
                }
            }

            //add new element to order 
            if(Object.keys(newActiveElementsOnOrder).indexOf(id) === -1){ //new
                newActiveElementsOnOrder[id] = {};
            }

            newActiveElementsOnOrder[id][service] = {};
            newActiveElementsOnOrder[id][service]["quantity"] = 1;
            //special case: when clicked the custom element, it should start as 1.
            newActiveElementsOnOrder[id][service]["price"] = (id.indexOf("custom") !== -1) ? 1 : this.state.elementsPrice[service][id];

            //delete the property onList
            if(id.indexOf("custom") === -1){
                newelementsOnSelectList[service].splice(newelementsOnSelectList[service].indexOf(id), 1);
            }

            sumElementsQuantity = this.getSumOfElementsQuantity(newActiveElementsOnOrder);
            //if the user has checked full hook, then the hook quantity provided will be the same as sumElementsQuantity
            //if not, it will just increment by one the previous hook quantity provided
            newhookQuantity = 
            (this.state.fullHookCheckStatus) ? sumElementsQuantity : ++this.state.hookQuantity;

            totalPrice = this.calcTotalPrice({
                elementsOnOrder: newActiveElementsOnOrder,
                hookQuantity: newhookQuantity,
            }); 

            //this.returnData(totalPrice, newActiveElementsOnOrder, newhookQuantity);
            this.setState({
                sumElementsQuantity: sumElementsQuantity,
                elementsOnSelectList: newelementsOnSelectList,
                activeElementsOnOrder: newActiveElementsOnOrder,
                hookQuantity: newhookQuantity,
                fullHookCheckStatus: (newhookQuantity === sumElementsQuantity) ? true: false,
                indexCustom: newIndexCustom,
                totalPrice: totalPrice
            });
        }

        deleteElementFromOnOrder(id, service){
            let newelementsOnSelectList = JSON.parse(JSON.stringify(this.state.elementsOnSelectList));
            let newActiveElementsOnOrder = JSON.parse(JSON.stringify(this.state.activeElementsOnOrder));
            let sumElementsQuantity = 0;
            let newhookQuantity = 0;
            let totalPrice = 0;
            //find the initial position of the element to be added on the array on List
            //except when custom
            if(id.indexOf("custom") === -1){
                let positionOnOriginal = elements.indexOf(id);
                newelementsOnSelectList[service].splice(positionOnOriginal, 0, id);
            }

            //delete prop from activeElementsOnOrder
            //if it has no service, it will be totally deleted
            //else, it will only delete the service property
            if(Object.keys(newActiveElementsOnOrder[id]).length > 1){
                delete newActiveElementsOnOrder[id][service];
            }else{
                delete newActiveElementsOnOrder[id];
            }

            sumElementsQuantity = this.getSumOfElementsQuantity(newActiveElementsOnOrder);
            //it shouldn't surpass the sumElementsQuantity, but it shouldn't decrement also
            newhookQuantity = (this.state.hookQuantity > sumElementsQuantity) ? sumElementsQuantity : this.state.hookQuantity;

            totalPrice = this.calcTotalPrice({
                elementsOnOrder: newActiveElementsOnOrder,
                hookQuantity: newhookQuantity,
            }); 

            //this.returnData(totalPrice, newActiveElementsOnOrder, newhookQuantity);
            this.setState({
                sumElementsQuantity: sumElementsQuantity,
                elementsOnSelectList: newelementsOnSelectList,
                activeElementsOnOrder: newActiveElementsOnOrder,
                hookQuantity: newhookQuantity,
                fullHookCheckStatus: (newhookQuantity === sumElementsQuantity) ? true: false,
                totalPrice: totalPrice
            });
        }

        updateQuantity(id,service, e){
            let newActiveElementsOnOrder = JSON.parse(JSON.stringify(this.state.activeElementsOnOrder));
            const quantity = e.target.value; //this input just accepts positive integers
            let newhookQuantity = 0;
            let totalPrice = 0;
            let sumElementsQuantity = 0;
            newActiveElementsOnOrder[id][service]["quantity"] = parseFloat(quantity);

            sumElementsQuantity = this.getSumOfElementsQuantity(newActiveElementsOnOrder);
            //if user has checked the full hook, it will update to fullhook provided
            //if not it will stay the same
            newhookQuantity = (this.state.fullHookCheckStatus) ? sumElementsQuantity: this.state.hookQuantity;

            totalPrice = this.calcTotalPrice({
                elementsOnOrder: newActiveElementsOnOrder,
                hookQuantity: newhookQuantity,
            }); 

            //this.returnData(totalPrice, newActiveElementsOnOrder, newhookQuantity);
            this.setState({
                sumElementsQuantity: sumElementsQuantity,
                activeElementsOnOrder: newActiveElementsOnOrder,
                hookQuantity: newhookQuantity,
                fullHookCheckStatus: (newhookQuantity === sumElementsQuantity) ? true: false,
                totalPrice: totalPrice
            });
        }

        updateUnitPrice(id,service, e){
            let newActiveElementsOnOrder = JSON.parse(JSON.stringify(this.state.activeElementsOnOrder));
            const unitPrice = e.target.value;
            let totalPrice =0 ;
            let sumElementsQuantity = 0;
            newActiveElementsOnOrder[id][service]["price"] = parseFloat(unitPrice);

            sumElementsQuantity = this.getSumOfElementsQuantity(newActiveElementsOnOrder);
            totalPrice = this.calcTotalPrice({
                elementsOnOrder: newActiveElementsOnOrder,
            });

            //this.returnData(totalPrice, newActiveElementsOnOrder, this.hookQuantity);
            this.setState({
                activeElementsOnOrder: newActiveElementsOnOrder,
                totalPrice: totalPrice
            });
        }

        updateHookQuantity(data){ //param as boolean or int
            let newhookQuantity = 0;
            let totalPrice = 0;
            if(typeof data === "boolean" && data){//triggered by checkbox, since it should pass a bool 
                newhookQuantity = this.state.sumElementsQuantity;
            }else if(typeof data === "boolean" && !data){
                newhookQuantity = (this.state.sumElementsQuantity === 0) ? 0 :this.state.sumElementsQuantity -1;
            }else{ //triggered by a input type number
                data = parseInt(data);
                //input hook quantity shouldn't surpass active elements quantities
                if(data > this.state.sumElementsQuantity){
                    newhookQuantity = this.state.sumElementsQuantity;
                }else if(data < 0){ //can't be a negative number
                    newhookQuantity = 0;
                }else{
                    newhookQuantity = data;
                }
            }
       
            totalPrice = this.calcTotalPrice({
                elementsOnOrder: this.state.activeElementsOnOrder,
                hookQuantity: newhookQuantity,
            }); 
            //this.returnData(totalPrice, this.state.activeElementsOnOrder, newhookQuantity);
            this.setState({
                fullHookCheckStatus : (newhookQuantity === this.state.sumElementsQuantity) ? true: false,
                hookQuantity: newhookQuantity,
                totalPrice : totalPrice
            });
        }

        updateCustomElementName(id,service, e){
            let newActiveElementsOnOrder = JSON.parse(JSON.stringify(this.state.activeElementsOnOrder));
            const elementName = e.target.value;

            newActiveElementsOnOrder[id][service]["name"] = elementName;

            //this.returnData(this.state.totalPrice, newActiveElementsOnOrder);
            this.setState({
                activeElementsOnOrder: newActiveElementsOnOrder,
            });
        }
      
        returnData({totalPrice, activeElementsOnOrder, hookQuantity}){
            //return data for the main component
            //this shouldn't depend on this.state, since will be called
            //before setState
            console.log("return");
            this.props.getOrderDetails({
                totalPrice: totalPrice,
                elementsOnOrder :activeElementsOnOrder,
                hookQuantity: hookQuantity
            });
        }

        componentDidMount(){
            if(!this.state.ajaxLoaded){
                try{
                    let newElementsPrice = this.updateElementsPrice(this.props.serviceOffer);
                    newElementsPrice.then(returnOBJ => {
                        this.setState({
                            elementsPrice: returnOBJ.newElementsPrice,
                            ajaxLoaded: true,
                            hookPrice: returnOBJ.hookPrice
                        });
                    });
                }catch(err){
                    console.error(err);
                }
            }
        }

        shouldComponentUpdate(newProps, newState){
            if(this.state !== newState){
                this.returnData(newState);
                return true;
            }else{
                return false;
            }
        }

        componentDidUpdate(prevProps, prevState){ //render the list that the user has chosen
            renderHookHandler({
                idContainer: "containerHookHandler",
                checkStatus: this.state.fullHookCheckStatus,
                hookQuantity: this.state.hookQuantity,
                onCheckFullHook: (e) =>{this.updateHookQuantity(e);},
                onChangeHookQuantity: (e) =>{this.updateHookQuantity(e);}
            });

            console.log(this.props.order);
            if(prevProps !== this.props){
                this.setState({
                    activeElementsOnOrder: JSON.parse(JSON.stringify(this.props.order.elementsOnOrder)),
                    totalPrice: this.props.order.totalPrice,
                    hookQuantity: this.props.order.hookQuantity,
                });
            }
            

            //since the selectable list is independent from other components
            //and only dependable on async operations, it will we be updated 
            //from here
            if(typeof this.state.elementsOnSelectList[this.props.serviceOffer] !== "undefined"){
                ReactDOM.render(
                    this.state.elementsOnSelectList[this.props.serviceOffer].map(elementName =>{
                        return React.createElement(WriteOrderContainers.selectableElementToOrder, {
                            key: `${elementName}-${this.props.serviceOffer}`,
                            id: elementName,
                            elementPrice: (this.state.elementsPrice[this.props.serviceOffer] !== null) ? this.state.elementsPrice[this.props.serviceOffer][elementName] : undefined,
                            elementString: WriteOrderContainers.elementsString[elementName],
                            service: this.props.serviceOffer,
                            onClick: (id, service) => {this.onElementClick(id, service);},
                        })
                    }),
                    document.getElementById(this.props.idSelectableElements)
                );
            }else{

                let newElementsPrice = this.updateElementsPrice(this.props.serviceOffer);
                let updatedElementsOnList = {};
                updatedElementsOnList = Object.assign({}, prevState.elementsOnSelectList);
                console.log(newElementsPrice);
                newElementsPrice.then(newObj => {
                    updatedElementsOnList[this.props.serviceOffer] = elements;
                    this.setState({
                        elementsOnSelectList: updatedElementsOnList,
                        elementsPrice: newObj.newElementsPrice,
                    });
                    this.baseState = JSON.parse(JSON.stringify(this.state));
                });
            }

        }
  
        render(){
            document.getElementById(this.props.idToTotalPrice).textContent = this.state.totalPrice;
            return(
                React.createElement(renderElementOnOrder,{
                    activeElementsOnOrder: this.state.activeElementsOnOrder,
                    service: this.props.serviceOffer,
                    onClickDelete: (id, service) =>{this.deleteElementFromOnOrder(id,service);},
                    onUpdateQuantity: (id, service, e) => {this.updateQuantity(id,service,e);},
                    onUpdateUnitPrice: (id, service,e) =>{this.updateUnitPrice(id,service,e);},
                    onUpdateElementNameIfCustom: (id,service, e) =>{this.updateCustomElementName(id,service,e);}
                })
            );
        }
    }
    //return WriteOrderPanel;
    return {
        elements: elements,
        renderSelectableElementsOnOrder:renderSelectableElementsOnOrder,
        fetchElementsPrice:fetchElementsPrice,
        onElementSelectFromList:onElementSelectFromList,
        deleteElementFromOnOrder:deleteElementFromOnOrder,
        updateElementQuantity:updateElementQuantity,
        updateElementUnitPrice:updateElementUnitPrice,
        updateCustomElementName:updateCustomElementName,
        renderElementsOnOrder: renderElementsOnOrder
    };

});



