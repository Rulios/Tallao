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
        washiron: "Lavado y planchado",
        wash: "Lavado",
        dryclean: "Lavado en seco"
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
                            className: "closeElementButtonStyle",
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

    //function to getDerivedStateFromProps
    function returnNewElementsPrice(priceString, service, prevObj){ // will return a new obj with the elementsPrice
        //prevObj is optional, if passed, it will be used as a reference obj to store new price
        let elementsPrice;
        if(prevObj === undefined){
            elementsPrice = {};
        }else{
            elementsPrice = Object.assign({}, prevObj);
        }
        
        priceString.trim().split(",").map((value, i) =>{
            let elementKeyValueArr = value.split("=");
            elementsPrice[elementKeyValueArr[0]] = {};
            elementsPrice[elementKeyValueArr[0]][service] = parseFloat(elementKeyValueArr[1]);
        });
        return elementsPrice;
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
                elements: elements,
                activeElementsOnList: initialElementsOnList,
                activeElementsOnOrder: {},
                totalPrice: 0,
                indexCustom: [],
                ajaxLoaded: false
            }

            /* this.state = {
                elementsPrice: this.returnNewElementsPrice(this.props[this.props.serviceOffer], this.props.serviceOffer),
                elements: elements,
                activeElementsOnList: initialElementsOnList,
                activeElementsOnOrder: {},
                totalPrice: 0,
                indexCustom: [],
            }; */
        }   

        returnNewElementsPrice(priceString, service, prevObj){ // will return a new obj with the elementsPrice
            //prevObj is optional, if passed, it will be used as a reference obj to store new price
            let elementsPrice;
            if(prevObj === undefined){
                elementsPrice = {};
            }else{
                elementsPrice = Object.assign({}, prevObj);
            } 
            elementsPrice[service] = {};
            priceString.trim().split(",").map(value =>{
                let elementKeyValueArr = value.split("=");
                elementsPrice[service][elementKeyValueArr[0]] = parseFloat(elementKeyValueArr[1]);
            });
            return elementsPrice;
        }

        async updateElementsPrice(service){
            //this will do the fetching and updating the state
            //the processing of the elementsPrice is made by 
            //returnNewElementsPrice
            try{
                let data = await ajaxReq.fetchElementsPrice({serviceOffer: this.props.serviceOffer});
                let priceObj = JSON.parse(data);
                let newElementsPrice = this.returnNewElementsPrice(priceObj[this.props.serviceOffer], this.props.serviceOffer, this.state.elementsPrice)
                return newElementsPrice;

            }catch(err){
                console.error(err);
            }
        }

        onElementClick(id, service){
            //create new activeElementsOnList , and activeElementsOnOrder
            let newActiveElementsOnList = JSON.parse(JSON.stringify(this.state.activeElementsOnList));
            let newActiveElementsOnOrder = JSON.parse(JSON.stringify(this.state.activeElementsOnOrder));
            let newIndexCustom = this.state.indexCustom.slice();

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
            
            this.setState({
                activeElementsOnList: newActiveElementsOnList,
                activeElementsOnOrder: newActiveElementsOnOrder,
                indexCustom: newIndexCustom,
                totalPrice: this.calcTotalPrice(newActiveElementsOnOrder)
            });
        }

        calcTotalPrice(elementsOnOrder){
            let total = 0;
            //traverse for each element on order
            Object.keys(elementsOnOrder).map(elementName =>{
                //traverse for each service the element on order
                Object.keys(elementsOnOrder[elementName]).map(service =>{
                    total += elementsOnOrder[elementName][service]["price"] * elementsOnOrder[elementName][service]["quantity"];
                });
            });
            return parseFloat(total.toFixed(2));
        }

        deleteElementFromOnOrder(id, service){
            let newActiveElementsOnList = JSON.parse(JSON.stringify(this.state.activeElementsOnList));
            let newActiveElementsOnOrder = JSON.parse(JSON.stringify(this.state.activeElementsOnOrder));
           
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

            this.setState({
                activeElementsOnList: newActiveElementsOnList,
                activeElementsOnOrder: newActiveElementsOnOrder,
                totalPrice: this.calcTotalPrice(newActiveElementsOnOrder)
            });
        }

        updateQuantity(id,service, e){
            let newActiveElementsOnOrder = JSON.parse(JSON.stringify(this.state.activeElementsOnOrder));
            const quantity = e.target.value; //this input just accepts positive integers

            newActiveElementsOnOrder[id][service]["quantity"] = parseFloat(quantity);

            this.setState({
                activeElementsOnOrder: newActiveElementsOnOrder,
                totalPrice: this.calcTotalPrice(newActiveElementsOnOrder)
            });
        }

        updateUnitPrice(id,service, e){
            let newActiveElementsOnOrder = JSON.parse(JSON.stringify(this.state.activeElementsOnOrder));
            const unitPrice = e.target.value;

            newActiveElementsOnOrder[id][service]["price"] = parseFloat(unitPrice);
            this.setState({
                activeElementsOnOrder: newActiveElementsOnOrder,
                totalPrice: this.calcTotalPrice(newActiveElementsOnOrder)
            });
        }

        updateCustomElementName(id,service, e){
            let newActiveElementsOnOrder = JSON.parse(JSON.stringify(this.state.activeElementsOnOrder));
            const elementName = e.target.value;

            newActiveElementsOnOrder[id][service]["name"] = elementName;
            this.setState({
                activeElementsOnOrder: newActiveElementsOnOrder,
                totalPrice: this.calcTotalPrice(newActiveElementsOnOrder)
            });
        }

      
        returnData(){
            return {
                totalPrice: this.state.totalPrice,
                elementsOnOrder : this.state.activeElementsOnOrder
            };
        }
        componentDidMount(){
            if(!this.state.ajaxLoaded){
                try{
                    let newElementsPrice = this.updateElementsPrice(this.props.serviceOffer);
                    newElementsPrice.then(newObj => {
                        this.setState({
                            elementsPrice: newObj,
                            ajaxLoaded: true
                        });
                    });

                }catch(err){
                    console.error(err);
                }
            }
        }

        componentDidUpdate(prevProps, prevState){ //render the list that the user has chosen

            //since the selectable list is independent from other components
            //and only dependable on async operations, it will we be updated 
            //from here
            if(this.state.activeElementsOnList[this.props.serviceOffer] !== undefined){
                ReactDOM.render(
                    this.state.activeElementsOnList[this.props.serviceOffer].map(elementName =>{
                        //console.log(this.state.elementsPrice[this.props.serviceOffer]);
                        return React.createElement(selectableElementToOrder, {
                            key: `${elementName}-${this.props.serviceOffer}`,
                            id: elementName,
                            elementPrice: (this.state.elementsPrice[this.props.serviceOffer] !== undefined) ? this.state.elementsPrice[this.props.serviceOffer][elementName] : undefined,
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
                        elementsPrice: newObj,
                    });
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
            <button class="closeElementButtonStyle">x</button>
            
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

