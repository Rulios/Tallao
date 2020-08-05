// main.js
require.config({
    // module name mapped to CDN url
    paths: {
        // Require.js appends `.js` extension for you
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development',
        inputPrevent: "./frontendModules/inputPrevent"
    }
});

// load the modules defined above
//inputs shouldn't have a children
//styles should be a object
define(['react', 'react-dom', "inputPrevent"], function(React, ReactDOM, inputPrevent){

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
        console.log(props);
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
                        key: `${elementName}-${props.service}`,
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
        //props: priceElements (in JSON format), hookPrice, serviceOffer,
        //idActiveOnOrderElement(id of HTML element to append when clicking element)
        //idToTotalPrice (id of HTML element to update the total price)

        //states definitions:
        //activeElementsOnList = all the elements rendered by selectableElementToOrder
        //activeElemetnsOnOrder = all the elements renderd by elementOnOrder
        constructor(props){

            super(props);
            let elementsPrice = {};
            let arrEl = this.props[this.props.serviceOffer].trim().split(",");
            
            arrEl.map((value, i) =>{
                let elementKeyValueArr = value.split("=");
                elementsPrice[elementKeyValueArr[0]] = {};
                elementsPrice[elementKeyValueArr[0]][this.props.serviceOffer] = parseFloat(elementKeyValueArr[1]);
            });
            this.state = {
                elementsPrice: elementsPrice,
                elements: elements,
                activeElementsOnList: elements,
                activeElementsOnOrder: {},
                totalPrice: 0,
                indexCustom: [],
            };
        }   

        returnNewElementsPrice(){ // will return a new obj with the elementsPrice

        }

        onElementClick(id, service){
            //create new activeElementsOnList , and activeElementsOnOrder
            let newActiveElementsOnList = JSON.parse(JSON.stringify(this.state.activeElementsOnList));
            let newActiveElementsOnOrder = JSON.parse(JSON.stringify(this.state.activeElementsOnOrder));
            let newIndexCustom = this.state.indexCustom.slice();

            //the format is about custom1, custom2, custom3... and so on
            //So this.state.indexCustom will store all the indices, and it will be resorted
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
            newActiveElementsOnOrder[id][service]["price"] = (id.indexOf("custom") !== -1) ? 1 : this.state.elementsPrice[id][service];
            

            //delete the property onList
            if(id !== "custom"){
                delete newActiveElementsOnList[id];
            }
            
            this.setState({
                activeElementsOnList: newActiveElementsOnList,
                activeElementsOnOrder: newActiveElementsOnOrder,
                indexCustom: newIndexCustom
                
            }, () =>{//callback
                this.setState({totalPrice: this.calcTotalPrice()})
            });
        }

         calcTotalPrice(){
            let total = 0;
            //traverse for each element on order
            Object.keys(this.state.activeElementsOnOrder).map(elementName =>{
                //traverse for each service the element on order
                Object.keys(this.state.activeElementsOnOrder[elementName]).map(service =>{
                    total += this.state.activeElementsOnOrder[elementName][service]["price"] * this.state.activeElementsOnOrder[elementName][service]["quantity"];
                });
            });
            return parseFloat(total.toFixed(2));
        }

         deleteElementFromOnOrder(id, service){
            const newActiveElementsOnList = {};
            const newActiveElementsOnOrder = JSON.parse(JSON.stringify(this.state.activeElementsOnOrder));
            //add in the same order to activeElementsOnList
            Object.keys(this.state.elements).map(value =>{
                if(Object.keys(this.state.activeElementsOnList).indexOf(value) !== -1 || value === id){
                    newActiveElementsOnList[value] = this.state.elements[value];
                }
            });

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
                
            }, () =>{//callback
                this.setState({totalPrice: this.calcTotalPrice()})
            });
        }

         updateQuantity(id,service, e){
            let activeElementsOnOrder = JSON.parse(JSON.stringify(this.state.activeElementsOnOrder));
            const quantity = e.target.value; //this input just accepts positive integers

            activeElementsOnOrder[id][service]["quantity"] = parseFloat(quantity);

            this.setState({
                activeElementsOnOrder: activeElementsOnOrder
            }, () =>{
                this.setState({totalPrice: this.calcTotalPrice()});
            });
        }

         updateUnitPrice(id,service, e){
            let activeElementsOnOrder = JSON.parse(JSON.stringify(this.state.activeElementsOnOrder));
            const unitPrice = e.target.value;

            activeElementsOnOrder[id][service]["price"] = parseFloat(unitPrice);
            this.setState({
                activeElementsOnOrder: activeElementsOnOrder
            }, () =>{
                this.setState({totalPrice: this.calcTotalPrice()});
            });
        }

        updateCustomElementName(id,service, e){
            let activeElementsOnOrder = JSON.parse(JSON.stringify(this.state.activeElementsOnOrder));
            const elementName = e.target.value;

            activeElementsOnOrder[id][service]["name"] = elementName;
            this.setState({
                activeElementsOnOrder: activeElementsOnOrder
            });
        }
        
        returnData(){
            return {
                totalPrice: this.state.totalPrice,
                elementsOnOrder : this.state.activeElementsOnOrder
            };
        }

        componentDidUpdate(prevProps, prevState){ //render the list that the user has chosen
            //update the total price text
            console.log(prevProps);
            console.log(prevState);
            document.getElementById(this.props.idToTotalPrice).textContent = this.state.totalPrice;
            ReactDOM.render(
                React.createElement(renderElementOnOrder,{
                    activeElementsOnOrder: this.state.activeElementsOnOrder,
                    service: this.props.serviceOffer,
                    onClickDelete: (id, service) =>{this.deleteElementFromOnOrder(id,service,);},
                    onUpdateQuantity: (id, service, e) => {this.updateQuantity(id,service, e);},
                    onUpdateUnitPrice: (id, service,e) =>{this.updateUnitPrice(id,service,e);},
                    onUpdateElementNameIfCustom: (id,service, e) =>{this.updateCustomElementName(id,service, e);}

                }),
                document.getElementById(this.props.idOnActiveOrderElement)
            );
        }
  
        render(){
            //console.log(this.state.activeElementsOnOrder);
            
            return(
                Object.keys(this.state.activeElementsOnList).map((value, i) =>{
                    return React.createElement(selectableElementToOrder, {
                        key: `${value}-${this.props.serviceOffer}`,
                        id: value,
                        elementPrice: (this.state.elementsPrice[value] !== undefined) ? this.state.elementsPrice[value][this.props.serviceOffer] : undefined,
                        elementString: this.state.activeElementsOnList[value],
                        service: this.props.serviceOffer,
                        onClick: (id, service) => {this.onElementClick(id, service);},
                    })
                })
            );
        }
    }

    return{
        WriteOrderPanel: WriteOrderPanel
    }

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

