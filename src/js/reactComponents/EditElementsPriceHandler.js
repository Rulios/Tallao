"use strict";

const React = require("react");
const cloneDeep = require("lodash.clonedeep");

const EditElementsPriceContainers = require( "./EditElementsPriceContainers");
const {fetchElementsPrice, updateElementsPrice} = require("../ajax-requests/laundry-configs");


async function getElementsPrice(){
    try {
        let {data: elementsPrice} = await fetchElementsPrice();
        return elementsPrice;
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
  
        let prevPrices = cloneDeep(this.state);

        if(prevPrices[this.props.serviceSelected].hasOwnProperty(idElement)){ //search in elements
            prevPrices[this.props.serviceSelected][idElement] = newPrice
            this.setState(prevPrices);
        }else{//search in extras
            if(prevPrices.extras.hasOwnProperty(idElement)){
                prevPrices.extras[idElement] = newPrice
                this.setState(prevPrices);
            }
        }
    }

    updateElementsPrice(){
        updateElementsPrice({
            elementsPrice: this.state,
        }).then(({status}) =>{
            if(status === 200){
                EditElementsPriceContainers.SuccessMessage();
            }else{
                throw new Error("can't update elements price");
            }
            
        }).catch(err =>{
            console.error(err);
        })
    }

    async processElementsPrice(){
        let elementsPrice = await getElementsPrice();
        let parsedElementsPrice = {};
        //parse every value to decimal
        Object.keys(elementsPrice).map(service =>{
            parsedElementsPrice[service] = {};
            Object.keys(elementsPrice[service]).map(element =>{
                parsedElementsPrice[service][element] = Number(parseFloat(elementsPrice[service][element]).toFixed(2));
            });
        });

        this.setState(parsedElementsPrice);
    }

    componentDidMount(){
        //fetch data
        if(this.props.serviceSelected !== ""){
            this.processElementsPrice();
        }
    }

    render(){
        let el2Render = [];
        el2Render.push( //append hook price (design exception)
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