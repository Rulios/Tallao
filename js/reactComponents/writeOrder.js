// main.js
require.config({
    // module name mapped to CDN url
    paths: {
        // Require.js appends `.js` extension for you
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development'
    }
});

// load the modules defined above
//inputs shouldn't have a children
//styles should be a object
define(['react', 'react-dom'], function(React, ReactDOM){

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
                onClick: () => {props.onClick(props.id)}
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
        let idAsset = "";
        let inputElementChangeOnCustom;
        if(props.id.includes("custom")){
            //custom makes a exception on the rendering of the component
            idAsset = "custom";
            inputElementChangeOnCustom = React.createElement("input",{
                type: "text",
                placeholder: "Nombre del elemento",
                onChange: () =>{}
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
                            className: "closeElementButtonStyle"
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
                                        onChange: () => {}
                                    })
                                ),

                                React.createElement("div", {className: "col-lg-4"},
                                    React.createElement("span", null, "Precio por unidad:"),
                                    React.createElement("span", null, "$"),
                                    React.createElement("input", {
                                        type: "number",
                                        className: "inputNumberReceiptStyle",
                                        value: props.price,
                                        onChange: () => {}
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
        
        return(
            Object.keys(props.activeElementsOnOrder).map((value, i) =>{
                return React.createElement(elementOnOrder, {
                    key: value,
                    id: value,
                    price: props.activeElementsOnOrder[value]["price"],
                    quantity: props.activeElementsOnOrder[value]["quantity"],
                    service: props.service
                })
            })
        );
    }
    
    class writeOrderPanel extends React.Component{
        //props: priceElements (in JSON format), hookPrice, serviceOffer,
        //idActiveOnOrderElement(id of HTML element to append when clicking element)

        //states definitions:
        //activeElementsOnList = all the elements rendered by selectableElementToOrder
        //activeElemetnsOnOrder = all the elements renderd by elementOnOrder
        constructor(props){

            super(props);
            let elementsPrice = {};
            let arrEl = this.props[this.props.serviceOffer].trim().split(",");
            
            arrEl.map((value, i) =>{
                let elementKeyValueArr = value.split("=");
                elementsPrice[elementKeyValueArr[0]] = parseFloat(elementKeyValueArr[1]);
            });
            this.state = {
                elementsPrice: elementsPrice,
                elements: elements,
                activeElementsOnList: elements,
                activeElementsOnOrder: {},
                totalPrice: 0 
            };
        }   

        onElementClick(id){
            //create new activeElementsOnList , and activeElementsOnOrder
            let newActiveElementsOnList = JSON.parse(JSON.stringify(this.state.activeElementsOnList));
            let newActiveElementsOnOrder = JSON.parse(JSON.stringify(this.state.activeElementsOnOrder));
            
            //add new element to order 
            if(Object.keys(newActiveElementsOnOrder).indexOf(id) === -1){ //new
                newActiveElementsOnOrder[id] = {};
            }
            newActiveElementsOnOrder[id]["quantity"] = 1;
            newActiveElementsOnOrder[id]["price"] = this.state.elementsPrice[id];
            

            //delete the property onList
            if(id !== "custom"){
                delete newActiveElementsOnList[id];
            }
            
            this.setState({
                activeElementsOnList: newActiveElementsOnList,
                activeElementsOnOrder: newActiveElementsOnOrder,
                
            }, () =>{//callback
                this.setState({totalPrice: this.calcTotalPrice()})
            });
        }
        
        

        calcTotalPrice(){
            let total = 0;
            Object.keys(this.state.activeElementsOnOrder).map(value =>{
                total += this.state.activeElementsOnOrder[value]["price"];
            });
            return total.toFixed(2);
        }

        componentDidUpdate(){ //render the list that the user has chosen
            ReactDOM.render(
                React.createElement(renderElementOnOrder,{
                    activeElementsOnOrder: this.state.activeElementsOnOrder,
                    service: this.props.serviceOffer
                }),
                document.getElementById(this.props.idOnActiveOrderElement)
            ); 
        }

        render(){
            return(
                Object.keys(this.state.activeElementsOnList).map((value, i) =>{
                    return React.createElement(selectableElementToOrder, {
                        key: value,
                        id: value,
                        elementPrice: this.state.elementsPrice[value],
                        elementString: this.state.activeElementsOnList[value],
                        onClick: (id) => {this.onElementClick(id)}
                    })
                })
            );
        }

    }

    require(["./requestsModules/ajaxReqSuperUserConfigs"], function(ajaxReq){
        ajaxReq.fetchElementsPrice({serviceOffer:"iron"}).then(data =>{
            let obj = JSON.parse(data);
            Object.assign(obj, {
                serviceOffer: "iron",
                idOnActiveOrderElement: "activeElementsOnOrderAppendable"
            });
            ReactDOM.render(
                React.createElement(writeOrderPanel, obj),
                document.getElementById("divSelectableElements")
            )
        });
    });

    

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
{/* <div class="container small-mediumSeparation"> 

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
</div> */}