
const React = require("react");
const { get } = require("../ajax-requests/ajax-req");
const inputPrevent = require("../frontendModules/inputPrevent");
const {getStaticText} = require("../translation/translator");

//Middle component, this doesn't has lower components

//button that contains info of the order
function selectableElementToOrder({element, elementPrice, service, onClick}){
    //props: id (id of element), elementPrice(price of element), 
    //element
    return(
        React.createElement("button", {
            value: element,
            name: "elementButton",
            className: "buttonElementStyle",
            onClick: () => onClick(element, service)
        },
            React.createElement("div", {className:"container"},
                React.createElement("div", {
                    className:"row bottomBorder elementSelectStyle"
                },
                    React.createElement("div", {className:"col-lg-4"},
                        React.createElement("img", {
                            className:"assetStayStatic",
                            src: `/imgs/assets/${element}/${element}.svg`
                        })
                    ),
                    React.createElement("div", {className:"col-lg-8"},
                        React.createElement("span", {className:"subTxt"},
                            getStaticText(element)
                        ),
                        React.createElement("br", null),
                        React.createElement("span", {},(elementPrice !== undefined) ? `$${elementPrice}`: "")
                    )
                )
            )
        )
    );
}

function elementOnOrder({element, price, quantity, service, 
onClickDelete, onUpdateQuantity, onUpdateUnitPrice, onUpdateElementNameIfCustom}){
    //props: id, price, quantity, service
    //console.log(props);
    let idAsset = "";
    let inputElementChangeOnCustom;
    if(element.includes("custom")){
        //custom makes a exception on the rendering of the component
        idAsset = "custom";
        inputElementChangeOnCustom = React.createElement("input",{
            type: "text",
            placeholder: getStaticText("elementName"),
            onBlur: (e) =>{
                onUpdateElementNameIfCustom({
                    elementID: element, 
                    service: service, 
                    value: e.target.value
                });
            }
        });

    }else{
        idAsset = element;
        inputElementChangeOnCustom = React.createElement("span", {
            className: "bold subTxt"
        }, `${getStaticText(element)} (${getStaticText(service)})`);
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
                        onClick: () => onClickDelete(element, service)
                    }, "x"),
                    React.createElement("div", {
                        className: "container small-mediumSeparation"
                    },
                        React.createElement("div", {className: "row"},
                            React.createElement("div", {className: "col-lg-4"},
                                React.createElement("span", null, `${getStaticText("quantity")}:`),
                                React.createElement("br", null, null),
                                React.createElement("input", {
                                    type: "number",
                                    className :"inputNumberReceiptStyle",
                                    name: "inputQuantity",
                                    value: quantity,
                                    onChange: (e) => {
                                        inputPrevent.notNegative(e);
                                        onUpdateQuantity(element,service, e.target.value);
                                    },
                                    onKeyPress: (e) =>{
                                        inputPrevent.onlyIntegers(e);
                                    }
                                })
                            ),

                            React.createElement("div", {className: "col-lg-4"},
                                React.createElement("span", null, `${getStaticText("pricePerUnit")}`),
                                React.createElement("span", null, "$"),
                                React.createElement("input", {
                                    type: "number",
                                    className: "inputNumberReceiptStyle",
                                    value: price,
                                    onChange: (e) => {
                                        inputPrevent.notNegative(e);
                                        onUpdateUnitPrice(element,service, e.target.value);
                                    },
                                    onKeyPress: (e) =>{
                                        inputPrevent.asteriskAndHyphen(e);
                                        inputPrevent.notExponential(e);
                                        inputPrevent.notNegative(e);
                                    }
                                })
                            ),

                            React.createElement("div", {className: "col-lg-4 bold"},
                                React.createElement("span", null, `${getStaticText("total")}:`),
                                React.createElement("span", null, (price * quantity).toFixed(2))
                            )
                        )
                    )
                )
            )    
        )
    );
}

function fullHookCheckBox({checkStatus, onCheck}){
    return(
        React.createElement("div", {},
            React.createElement("input",{
                type: "checkbox",
                id:"fullHookCheckBox",
                className: "small-rightMargin",
                checked: (checkStatus === undefined || !checkStatus) ? false: true,
                onChange: (e) => onCheck(e.target.checked)
            }),
            React.createElement("label", {
                htmlFor: "fullHookCheckBox",
                className : "middleVerticalAlign"
            }, getStaticText("completeHooks")),
        )
    );
}

function inputHookQuantity({hookQuantity, onChange}){
    //props: onChange, hookQuantity
    return(
        React.createElement("div", null,
            React.createElement("input",{
                id:"inputHookQuantity",
                type: "number",
                value : hookQuantity,
                className: "inputHookQuantity small-rightMargin",
                onChange: (e) =>{
                    inputPrevent.minLimitZero(e);
                    onChange(parseInt(e.target.value));},
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
            }, `:${getStaticText("presentHooks")}`)
        )
    );
}

module.exports = {
    selectableElementToOrder:selectableElementToOrder,
    elementOnOrder:elementOnOrder,
    fullHookCheckBox:fullHookCheckBox,
    inputHookQuantity:inputHookQuantity,
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
            <span class="subTxt bold">elementString(element) (serviceOfferString(service))</span>

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