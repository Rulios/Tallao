// main.js
require.config({
    // module name mapped to CDN url
    paths: {
        // Require.js appends `.js` extension for you
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development',
        inputPrevent: "./frontendModules/inputPrevent",
        ajaxReqSuperUserConfigs: "../js/requestsModules/ajaxReqSuperUserConfigs"
    }
});

// load the modules defined above
//inputs shouldn't have a children
//styles should be a object
define(['react', 'react-dom', "inputPrevent" , "ajaxReqSuperUserConfigs"], 
function(React, ReactDOM, inputPrevent, ajaxReq){

    const elements = {
        custom : "Elemento personalizable",
        shirt: "Camisa",
        pants: "Pantalón",
        skirt: "Falda",
        coat: "Saco",
        sweater: "Suéter",
        pleatedSkirt: "Falda Plizada",
        overall: "Overol",
        jumper: "Jumper",
        blouse: "Blusa",
        largeSuit: "Vestido",
        quilt: "Colcha"
    };

    const serviceOfferString = {
        iron: "Planchado",
        washIron: "Lavado y planchado",
        wash: "Lavado",
        dryClean: "Lavado en seco"
    };

    //button that contains info of the order
    function selectableElementToOrder(props){
        //props: id (id of element), elementPrice(price of element), 
        //elementString (string of element)
        return(
            React.createElement("button", {
                value: props.id,
                name: "elementButton",
                className: "buttonElementStyle",
                onClick: () => {props.onClick(props.id, props.service)}
            },
                React.createElement("div", {className:"container"},
                    React.createElement("div", {
                        className:"row bottomBorder elementSelectStyle"
                    },
                        React.createElement("div", {className:"col-lg-4"},
                            React.createElement("img", {
                                className:"assetStayStatic",
                                src: `./imgs/assets/${props.id}/${props.id}.svg`
                            })
                        ),
                        React.createElement("div", {className:"col-lg-8"},
                            React.createElement("span", {className:"subTxt"},
                                props.elementString
                            ),
                            React.createElement("br", null),
                            React.createElement("span", {},(props.elementPrice !== undefined) ? `$${props.elementPrice}`: "")
                        )
                    )
                )
            )
        );
    }

    function elementOnOrder(props){
        //props: id, price, quantity, service
        //console.log(props);
        let idAsset = "";
        let inputElementChangeOnCustom;
        if(props.id.includes("custom")){
            //custom makes a exception on the rendering of the component
            idAsset = "custom";
            inputElementChangeOnCustom = React.createElement("input",{
                type: "text",
                placeholder: "Nombre del elemento",
                onChange: (e) =>{props.onUpdateElementNameIfCustom(props.id,props.service, e);}
            });
        }else{
            idAsset = props.id;
            inputElementChangeOnCustom = React.createElement("span", {
                className: "bold subTxt"
            }, `${elements[props.id]} (${serviceOfferString[props.service]})`);
        }
        return(
            React.createElement("div", {
                className: "container small-mediumSeparation"
            },
                React.createElement("div", {
                    className: "row bottomBorder customElementReceiptStyle"
                },
                    React.createElement("div",{
                        className: "col-lg-1 hideOnXs"
                    },
                        React.createElement("img",{
                            className: "assetStayStatic",
                            src: `./imgs/assets/${idAsset}/${idAsset}.svg`
                        })
                    ),

                    React.createElement("div", {
                        className: "col-lg-11"
                    },
                        inputElementChangeOnCustom,
                        React.createElement("button", {
                            className: "closeButtonStyle",
                            onClick: () => {props.onClickDelete(props.id, props.service)}
                        }, "x"),
                        React.createElement("div", {
                            className: "container small-mediumSeparation"
                        },
                            React.createElement("div", {className: "row"},
                                React.createElement("div", {className: "col-lg-4"},
                                    React.createElement("span", null, "Cantidad:"),
                                    React.createElement("br", null, null),
                                    React.createElement("input", {
                                        type: "number",
                                        className :"inputNumberReceiptStyle",
                                        name: "inputQuantity",
                                        value: props.quantity,
                                        onChange: (e) => {
                                            inputPrevent.notNegative(e);
                                            props.onUpdateQuantity(props.id,props.service, e);
                                        },
                                        onKeyPress: (e) =>{
                                            inputPrevent.onlyIntegers(e);
                                        }
                                    })
                                ),

                                React.createElement("div", {className: "col-lg-4"},
                                    React.createElement("span", null, "Precio por unidad:"),
                                    React.createElement("span", null, "$"),
                                    React.createElement("input", {
                                        type: "number",
                                        className: "inputNumberReceiptStyle",
                                        value: props.price,
                                        onChange: (e) => {
                                            inputPrevent.notNegative(e);
                                            props.onUpdateUnitPrice(props.id,props.service, e);
                                        },
                                        onKeyPress: (e) =>{
                                            inputPrevent.asteriskAndHyphen(e);
                                            inputPrevent.notExponential(e);
                                            inputPrevent.notNegative(e);
                                        }
                                    })
                                ),

                                React.createElement("div", {className: "col-lg-4 bold"},
                                    React.createElement("span", null, "Total:"),
                                    React.createElement("span", null, (props.price * props.quantity).toFixed(2))
                                )
                            )
                        )
                    )
                )    
            )
        );
    }

    function fullHookCheckBox(props){
        //props: onCheck, checkStatus (component could be able to set check)
     
        return(
            React.createElement("div", {},
                React.createElement("input",{
                    type: "checkbox",
                    id:"fullHookCheckBox",
                    className: "small-rightMargin",
                    checked: (props.checkStatus === undefined || !props.checkStatus) ? false: true,
                    onChange: (e) =>{props.onCheck(e.target.checked);}
                }),
                React.createElement("label", {
                    htmlFor: "fullHookCheckBox",
                    className : "middleVerticalAlign"
                }, "Ganchos Completos"),
            )
        );
    }

    function inputHookQuantity(props){
        //props: onChange, hookQuantity
        return(
            React.createElement("div", null,
                React.createElement("input",{
                    id:"inputHookQuantity",
                    type: "number",
                    value : props.hookQuantity,
                    className: "inputHookQuantity small-rightMargin",
                    onChange: (e) =>{
                        inputPrevent.minLimitZero(e);
                        props.onChange(parseInt(e.target.value));},
                    onKeyPress : (e) =>{
                        inputPrevent.notExponential(e);
                        inputPrevent.minLimitZero(e);
                    },
                    onFocus: (e) =>{
                        e.target.select(); //select all text
                    }
                }),
                React.createElement("label", {
                    htmlFor: "inputHookQuantity"
                }, ":Ganchos presentes")
            )
        );
    }
    function renderHookHandler(props){
        //props: idContainer, onCheckFullHook, checkStatus, onChangeHookQuantity
        //render: fullHookCheckBox & inputHookQuantity
        ReactDOM.render(
            [React.createElement(fullHookCheckBox, {
                key: "checkFullHook",
                checkStatus: props.checkStatus,
                onCheck: (dataBool) => {props.onCheckFullHook(dataBool);},
            }),

            React.createElement(inputHookQuantity, {
                key: "inputHookQuantity",
                hookQuantity: props.hookQuantity,
                onChange: (dataN) => {props.onChangeHookQuantity(dataN);}
            })
            ]
            ,document.getElementById(props.idContainer)
        )
    }

    function renderElementOnOrder(props){
        //props: activeElementsOnOrder (object)
        return(
            //traverse the elements on order
            Object.keys(props.activeElementsOnOrder).map((elementName) =>{
                //traverse the services of the element on order
                return Object.keys(props.activeElementsOnOrder[elementName]).map(service =>{
                    return React.createElement(elementOnOrder, {
                        key: `${elementName}-${service}`,
                        id: elementName,
                        price: props.activeElementsOnOrder[elementName][service]["price"],
                        quantity: props.activeElementsOnOrder[elementName][service]["quantity"],
                        service: service, 
                        onClickDelete: (id,service) =>{props.onClickDelete(id,service);},
                        onUpdateQuantity: (id,service, e) => {props.onUpdateQuantity(id,service, e);},
                        onUpdateUnitPrice: (id,service, e) =>{props.onUpdateUnitPrice(id,service,e);},
                        onUpdateElementNameIfCustom: (id,service, e) =>{props.onUpdateElementNameIfCustom(id,service, e);}
                    });
                });
            })
        );
    }
    
    class WriteOrderPanel extends React.Component{
        //props: hookPrice, serviceOffer,
        //idActiveOnOrderElement(id of HTML element to append when clicking element)
        //idToTotalPrice (id of HTML element to update the total price)

        //states definitions:
        //activeElementsOnList = all the elements rendered by selectableElementToOrder
        //activeElemetnsOnOrder = all the elements renderd by elementOnOrder
        constructor(props){
            super(props);

            //set initial service and it's elements available
            let initialElementsOnList = {};
            initialElementsOnList[this.props.serviceOffer] = Object.keys(elements);
            this.state = {
                elementsPrice: undefined,
                hookPrice : 0,
                elements: elements,
                activeElementsOnList: initialElementsOnList,
                hookQuantityProvided: 0,
                sumElementsQuantity: 0,
                fullHookCheckStatus: false,
                activeElementsOnOrder: {},
                totalPrice: 0,
                indexCustom: [],
                ajaxLoaded: false
            }
            this.resetState.bind(this);
        }   

        returnNewElementsPrice(priceObj, service, prevObj){ // will return a new obj with the elementsPrice
            //prevObj is optional, if passed, it will be used as a reference obj to store new price
            let elementsPrice = {
                [service] : {}
            };
            if(priceObj === null){
                let defaultPrice = {};
                Object.keys(elements).map(element =>{
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
                let data = await ajaxReq.fetchElementsPrice({serviceOffer: service});
                let priceObj = JSON.parse(data);
                let newElementsPrice = this.returnNewElementsPrice(JSON.parse(priceObj[service]), service, this.state.elementsPrice)
                return {
                    newElementsPrice: newElementsPrice,
                    hookPrice : Number(parseFloat(priceObj.hook).toFixed(2)) //toFixed returns a string, so using Number returns a int
                };
            }catch(err){
                console.error(err);
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

        calcTotalPrice({elementsOnOrder, hookQuantityProvided}){
            //params: elementsOnOrder (object), hookQuantityProvided (int), sumElementsQuantity (int)
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
            
            hookQuantityProvided = parseInt(hookQuantityProvided);
            //if missing hooks, multiply by sumElemenetsQuantity - hookQuantityProvided
            if(hookQuantityProvided !== undefined && hookQuantityProvided < sumElementsQuantity){
                let priceHook = this.state.hookPrice * (sumElementsQuantity - hookQuantityProvided);
                priceHook = Number(priceHook.toFixed(2));
                
                if(priceHook >= 0){//prevent a discount on priceHooks
                    total += priceHook; //add missing hookPrice to the original price
                }
            }
            return parseFloat(total.toFixed(2));
        }

        onElementClick(id, service){
            //create new activeElementsOnList , and activeElementsOnOrder
            let newActiveElementsOnList = JSON.parse(JSON.stringify(this.state.activeElementsOnList));
            let newActiveElementsOnOrder = JSON.parse(JSON.stringify(this.state.activeElementsOnOrder));
            let newIndexCustom = this.state.indexCustom.slice();
            let newHookQuantityProvided = 0;
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
                newActiveElementsOnList[service].splice(newActiveElementsOnList[service].indexOf(id), 1);
            }

            sumElementsQuantity = this.getSumOfElementsQuantity(newActiveElementsOnOrder);
            //if the user has checked full hook, then the hook quantity provided will be the same as sumElementsQuantity
            //if not, it will just increment by one the previous hook quantity provided
            newHookQuantityProvided = 
            (this.state.fullHookCheckStatus) ? sumElementsQuantity : ++this.state.hookQuantityProvided;

            totalPrice = this.calcTotalPrice({
                elementsOnOrder: newActiveElementsOnOrder,
                hookQuantityProvided: newHookQuantityProvided,
            }); 

            this.returnData(totalPrice, newActiveElementsOnOrder, newHookQuantityProvided);
            this.setState({
                sumElementsQuantity: sumElementsQuantity,
                activeElementsOnList: newActiveElementsOnList,
                activeElementsOnOrder: newActiveElementsOnOrder,
                hookQuantityProvided: newHookQuantityProvided,
                fullHookCheckStatus: (newHookQuantityProvided === sumElementsQuantity) ? true: false,
                indexCustom: newIndexCustom,
                totalPrice: totalPrice
            });
        }

        deleteElementFromOnOrder(id, service){
            let newActiveElementsOnList = JSON.parse(JSON.stringify(this.state.activeElementsOnList));
            let newActiveElementsOnOrder = JSON.parse(JSON.stringify(this.state.activeElementsOnOrder));
            let sumElementsQuantity = 0;
            let newHookQuantityProvided = 0;
            let totalPrice = 0;
            //find the initial position of the element to be added on the array on List
            //except when custom
            if(id.indexOf("custom") === -1){
                let positionOnOriginal = Object.keys(this.state.elements).indexOf(id);
                newActiveElementsOnList[service].splice(positionOnOriginal, 0, id);
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
            newHookQuantityProvided = (this.state.hookQuantityProvided > sumElementsQuantity) ? sumElementsQuantity : this.state.hookQuantityProvided;

            totalPrice = this.calcTotalPrice({
                elementsOnOrder: newActiveElementsOnOrder,
                hookQuantityProvided: newHookQuantityProvided,
            }); 

            this.returnData(totalPrice, newActiveElementsOnOrder, newHookQuantityProvided);
            this.setState({
                sumElementsQuantity: sumElementsQuantity,
                activeElementsOnList: newActiveElementsOnList,
                activeElementsOnOrder: newActiveElementsOnOrder,
                hookQuantityProvided: newHookQuantityProvided,
                fullHookCheckStatus: (newHookQuantityProvided === sumElementsQuantity) ? true: false,
                totalPrice: totalPrice
            });
        }

        updateQuantity(id,service, e){
            let newActiveElementsOnOrder = JSON.parse(JSON.stringify(this.state.activeElementsOnOrder));
            const quantity = e.target.value; //this input just accepts positive integers
            let newHookQuantityProvided = 0;
            let totalPrice = 0;
            let sumElementsQuantity = 0;
            newActiveElementsOnOrder[id][service]["quantity"] = parseFloat(quantity);

            sumElementsQuantity = this.getSumOfElementsQuantity(newActiveElementsOnOrder);
            //if user has checked the full hook, it will update to fullhook provided
            //if not it will stay the same
            newHookQuantityProvided = (this.state.fullHookCheckStatus) ? sumElementsQuantity: this.state.hookQuantityProvided;

            totalPrice = this.calcTotalPrice({
                elementsOnOrder: newActiveElementsOnOrder,
                hookQuantityProvided: newHookQuantityProvided,
            }); 

            this.returnData(totalPrice, newActiveElementsOnOrder, newHookQuantityProvided);
            this.setState({
                sumElementsQuantity: sumElementsQuantity,
                activeElementsOnOrder: newActiveElementsOnOrder,
                hookQuantityProvided: newHookQuantityProvided,
                fullHookCheckStatus: (newHookQuantityProvided === sumElementsQuantity) ? true: false,
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

            this.returnData(totalPrice, newActiveElementsOnOrder, this.hookQuantityProvided);
            this.setState({
                activeElementsOnOrder: newActiveElementsOnOrder,
                totalPrice: totalPrice
            });
        }

        updateHookQuantity(data){ //param as boolean or int
            let newHookQuantityProvided = 0;
            let totalPrice = 0;
            if(typeof data === "boolean" && data){//triggered by checkbox, since it should pass a bool 
                newHookQuantityProvided = this.state.sumElementsQuantity;
            }else if(typeof data === "boolean" && !data){
                newHookQuantityProvided = (this.state.sumElementsQuantity === 0) ? 0 :this.state.sumElementsQuantity -1;
            }else{ //triggered by a input type number
                data = parseInt(data);
                //input hook quantity shouldn't surpass active elements quantities
                if(data > this.state.sumElementsQuantity){
                    newHookQuantityProvided = this.state.sumElementsQuantity;
                }else if(data < 0){ //can't be a negative number
                    newHookQuantityProvided = 0;
                }else{
                    newHookQuantityProvided = data;
                }
            }
       
            totalPrice = this.calcTotalPrice({
                elementsOnOrder: this.state.activeElementsOnOrder,
                hookQuantityProvided: newHookQuantityProvided,
            }); 
            this.returnData(totalPrice, this.state.activeElementsOnOrder, newHookQuantityProvided);
            this.setState({
                fullHookCheckStatus : (newHookQuantityProvided === this.state.sumElementsQuantity) ? true: false,
                hookQuantityProvided: newHookQuantityProvided,
                totalPrice : totalPrice
            });
        }

        updateCustomElementName(id,service, e){
            let newActiveElementsOnOrder = JSON.parse(JSON.stringify(this.state.activeElementsOnOrder));
            const elementName = e.target.value;

            newActiveElementsOnOrder[id][service]["name"] = elementName;

            this.returnData(this.state.totalPrice, newActiveElementsOnOrder);
            this.setState({
                activeElementsOnOrder: newActiveElementsOnOrder,
            });
        }
      
        returnData(totalPrice, activeElementsOnOrder, hookQuantity){
            //return data for the main component
            //this shouldn't depend on this.state, since will be called
            //before setState
            this.props.getOrderDetails({
                totalPrice: totalPrice,
                elementsOnOrder :activeElementsOnOrder,
                hookQuantity: hookQuantity
            });
        }

        resetState(){
            console.log(this);
            //this.setState(this.baseState);
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
                        //set baseState, so when it resets
                        //it returns to this states
                    
                    });
                }catch(err){
                    console.error(err);
                }
            }
        }

        componentDidUpdate(prevProps, prevState){ //render the list that the user has chosen
            renderHookHandler({
                idContainer: "containerHookHandler",
                checkStatus: this.state.fullHookCheckStatus,
                hookQuantity: this.state.hookQuantityProvided,
                onCheckFullHook: (e) =>{this.updateHookQuantity(e);},
                onChangeHookQuantity: (e) =>{this.updateHookQuantity(e);}
            });
            //since the selectable list is independent from other components
            //and only dependable on async operations, it will we be updated 
            //from here
            if(typeof this.state.activeElementsOnList[this.props.serviceOffer] !== "undefined"){
                ReactDOM.render(
                    this.state.activeElementsOnList[this.props.serviceOffer].map(elementName =>{
                        return React.createElement(selectableElementToOrder, {
                            key: `${elementName}-${this.props.serviceOffer}`,
                            id: elementName,
                            elementPrice: (typeof this.state.elementsPrice[this.props.serviceOffer] !== "undefined") ? this.state.elementsPrice[this.props.serviceOffer][elementName] : undefined,
                            elementString: this.state.elements[elementName],
                            service: this.props.serviceOffer,
                            onClick: (id, service) => {this.onElementClick(id, service);},
                        })
                    }),
                    document.getElementById(this.props.idSelectableElements)
                );
            }else{

                let newElementsPrice = this.updateElementsPrice(this.props.serviceOffer);
                let updatedElementsOnList = {};
                updatedElementsOnList = Object.assign({}, prevState.activeElementsOnList);
                newElementsPrice.then(newObj => {
                    updatedElementsOnList[this.props.serviceOffer] = Object.keys(elements);
                    this.setState({
                        activeElementsOnList: updatedElementsOnList,
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
    return WriteOrderPanel;
});

//example of selectableElementToOrder in HTML

/* <button value="custom" name="elementButton" class="buttonElementStyle">
    <div class="container ">
        <div class="row bottomBorder elementSelectStyle">
            <div class="col-lg-4">
                <img src="./imgs/assets/custom/custom.svg" class="assetStayStatic" alt="">
            </div>

            <div class="col-lg-8">
                <span id="nameTag4custom" class="subTxt"><b>Elemento personalizable</b></span>
                <br>

                <span id="priceTag4custom">Precio personalizable</span>
            </div>
        </div>
    </div>
</button> */


//example of elementOnOrder in HTML
/* <div class="container small-mediumSeparation"> 

    <div class="row bottomBorder customElementReceiptStyle">

        <div class="col-lg-1 hideOnXs">
            <img class="assetStayStatic" sc="./imgs/assets/custom/custom.svg">
        </div>

        <div class="col-lg-11">
            <button class="closeButtonStyle">x</button>
            
            //if element rendered as custom
            <input type="text" placeholder="Nombre del elemento">

            //if element isn't rendered as custom
            <span class="subTxt bold">elementString(props.id) (serviceOfferString(props.service))</span>

            <div class="container">
                <div class="row">
                    <div class="col-lg-4">
                        <span>Cantidad:</span>
                        <br>
                        <input type="number" class="inputNumberReceiptStyle" value="propsQuantity">
                    </div>

                    <div class="col-lg-4">
                        <span>Precio por unidad:</span>
                        <span>$</span>
                        <input type="number" class="inputNumberReceiptStyle" value="propsPrice">
                    </div>

                    <div class="col-lg-4">
                        <span>Total:</span>
                        <span>propsPrice * propsQuantity</span>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div> */

//example of hookHandler

/* <!-- <div>
    <input type="checkbox" value="hookBrought" id="checkBoxHook">
    <span class="middleVerticalAlign" id="spn4CheckBoxHook">Ganchos Completos</span>
</div>

<div>
    <input type="number" id="inputHookQuantity" value="0" class=" inputHookQuantity">
    <label for="">:Ganchos presentes</label>
</div> --></div> */

