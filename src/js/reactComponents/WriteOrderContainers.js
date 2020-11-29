
const React = require("react");
const inputPrevent = require("../frontendModules/inputPrevent");

//Middle component, this doesn't has lower components

const elementsString = {
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
                            src: `/imgs/assets/${props.id}/${props.id}.svg`
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
        }, `${elementsString[props.id]} (${serviceOfferString[props.service]})`);
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
                        src: `/imgs/assets/${idAsset}/${idAsset}.svg`
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
                                        props.onUpdateQuantity(props.id,props.service, e.target.value);
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
                                        props.onUpdateUnitPrice(props.id,props.service, e.target.value);
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

module.exports = {
    selectableElementToOrder:selectableElementToOrder,
    elementOnOrder:elementOnOrder,
    fullHookCheckBox:fullHookCheckBox,
    inputHookQuantity:inputHookQuantity,
    elementsString: elementsString
};

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