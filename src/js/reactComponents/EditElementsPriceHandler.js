"use strict";

const React = require("react");
const EditElementsPriceContainers = require( "./EditElementsPriceContainers");
const ajaxReqLaundryConfigs = require("../requestsModules/ajaxReqLaundryConfigs");

async function getElementsPrice({serviceSelected}){
    try {
        let query = await ajaxReqLaundryConfigs.fetchElementsPrice({serviceSelected: serviceSelected});
        return query;
    }catch(err){console.error(err);}
}


class EditElementsPrice extends React.Component{

    //To do the hook edit element price box

    constructor(props){
        super(props);
        this.state = {
            elements: {
                shirt: 0,
                pants: 0,
                skirt: 0,
                coat: 0,
                sweater: 0,
                pleatedSkirt: 0,
                overall: 0,
                jumper: 0,
                blouse: 0,
                largeSuit: 0,
                quilt: 0,
            },
            extras: {
                hook: 0
            }
        };
    }

    changePriceHandler(idElement,newPrice){
        let prevPrices = JSON.parse(JSON.stringify(this.state));
        if(prevPrices.elements.hasOwnProperty(idElement)){ //search in elements
            prevPrices.elements[idElement] = newPrice
            this.setState(prevPrices);
        }else{//search in extras
            if(prevPrices.extras.hasOwnProperty(idElement)){
                prevPrices.extras[idElement] = newPrice
                this.setState(prevPrices);
            }
        }
    }

    updateElementsPrice(){
        ajaxReqLaundryConfigs.updateElementsPrice({
            serviceSelected: this.props.service,
            elementsPrice: JSON.stringify(this.state.elements),
            hookPrice: this.state.extras.hook
        }).then(response =>{
            EditElementsPriceContainers.SuccessMessage();
        }).catch(err =>{
            console.error(err);
        })
    }

    processElementsPrice(){
        getElementsPrice({serviceSelected:this.props.serviceSelected}).then(dataJSON =>{
            let obj = JSON.parse(dataJSON);
            if(obj[this.props.serviceSelected] !== "null" && obj[this.props.serviceSelected] !== ""){
                let fetchedElementsPrice = JSON.parse(obj[this.props.serviceSelected]);
                let newState = JSON.parse(JSON.stringify(this.state));
                newState.elements = fetchedElementsPrice;
                newState.extras.hook = obj.hook;
                this.setState(newState);    
            }else{ 
                //run through all the elements and set them to 0
                //except for hook price
                let newElements = JSON.parse(JSON.stringify(this.state.elements));
                Object.keys(newElements).map(element =>{
                    newElements[element] = 0;
                });
                this.setState({
                    elements: newElements
                });

            }
        });
    }

    componentDidMount(){
        //fetch data
        if(this.props.serviceSelected !== ""){
            this.processElementsPrice();
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.serviceSelected !== this.props.serviceSelected){
            this.processElementsPrice();
        }
    }

    render(){
        let el2Render = [];
        el2Render.push( //append hook edot price (design exception)
            React.createElement(EditElementsPriceContainers.EditBox, {
                key: "EditElementsPrice4Hook",
                idElement: "hook",
                price: this.state.extras.hook,
                isHook: true,
                onChangePrice: (idElement, newPrice) => this.changePriceHandler(idElement, newPrice)
            })
        );      

        //append the edit elements price
        el2Render.push(
            Object.keys(this.state.elements).map(element =>{  
                return React.createElement(EditElementsPriceContainers.EditBox,{
                    key: `EditElementsPrice4${element}`,
                    idElement: element,
                    price: this.state.elements[element],
                    onChangePrice: (idElement, newPrice) => this.changePriceHandler(idElement, newPrice)
                });
            })
        );

        //append update elements price
        el2Render.push(
            React.createElement(EditElementsPriceContainers.UpdateElementsPriceButton,{
                key: "UpdateElementsPriceBtn",
                onClick: () =>this.updateElementsPrice()
            })
        );

        return el2Render;
    }

};

module.exports =  EditElementsPrice;