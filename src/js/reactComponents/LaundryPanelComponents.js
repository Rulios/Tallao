const React = require("react");
const {getStaticText} = require("../../../translation/frontend/translator");

module.exports = {

    DropdownOfAvailableElements : ({
        elements, elementsPrice, serviceSelected, onClick
    }) => {

        if(elementsPrice !== undefined){
            return React.createElement("div", null, 
            elements.map(element =>{

                    let elementPrice = null;

                    if(element in elementsPrice){
                        elementPrice = elementsPrice[element];
                    }
                    return React.createElement(ElementOnDropdown, {
                        key: `${element}-${serviceSelected}`,
                        element: element,
                        elementPrice: elementPrice,
                        service: serviceSelected,
                        onClick: () => onClick(element, serviceSelected, elementPrice)
        
                    });
                })
            );
        }else{
            return null;
        }

        
    }


}

function ElementOnDropdown({element, elementPrice, service, onClick}){
    //props: id (id of element), elementPrice(price of element), 
    //element
    return(
        React.createElement("button", {
            value: element,
            name: "elementButton",
            className: "buttonElementStyle",
            onClick: () => onClick()
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
                        React.createElement("span", {},(elementPrice !== null) ? `$${elementPrice}`: "")
                    )
                )
            )
        )
    );
}


