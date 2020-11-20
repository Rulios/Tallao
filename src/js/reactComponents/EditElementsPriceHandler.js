"use strict";

const React = require("react");
const EditElementsPriceContainers = require( "./EditElementsPriceContainers");
const ajaxReqLaundryConfigs = require("../requestsModules/ajaxReqLaundryConfigs");

async function getElementsPrice(){
    try {
        let query = await ajaxReqLaundryConfigs.fetchElementsPrice();
        return query;
    }catch(err){console.error(err);}
}



class EditElementsPrice extends React.Component{

    //To do the hook edit element price box

    constructor(props){
        super(props);
        this.state = {
            extras: {
                hook: 0
            }
        };
    }

    changePriceHandler(idElement,newPrice){
        console.log(newPrice);
        let prevPrices = JSON.parse(JSON.stringify(this.state));
        if(prevPrices[this.props.serviceSelected].hasOwnProperty(idElement)){ //search in elements
            prevPrices[idElement] = newPrice
            this.setState({[this.props.serviceSelected]: prevPrices});
        }else{//search in extras
            if(prevPrices.extras.hasOwnProperty(idElement)){
                prevPrices.extras[idElement] = newPrice
                this.setState(prevPrices);
            }
        }
    }

    updateElementsPrice(){
        ajaxReqLaundryConfigs.updateElementsPrice({
            elementsPrice: this.state,
        }).then(response =>{
            EditElementsPriceContainers.SuccessMessage();
        }).catch(err =>{
            console.error(err);
        })
    }

    async processElementsPrice(){
        let elementsPrice = await getElementsPrice();
        
        this.setState(elementsPrice);
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
        console.log(this.state);
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
        if(this.state.hasOwnProperty(this.props.serviceSelected)){
            el2Render.push(
                Object.keys(this.state[this.props.serviceSelected]).map(element =>{ 
                     
                    return React.createElement(EditElementsPriceContainers.EditBox,{
                        key: `EditElementsPrice4${element}`,
                        idElement: element,
                        price: this.state[this.props.serviceSelected][element],
                        onChangePrice: (idElement, newPrice) => this.changePriceHandler(idElement, newPrice)
                    });
                })
            );
        }
        

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