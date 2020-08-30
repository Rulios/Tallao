"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development',
        EditElementsPriceContainers: "./reactComponents/EditElementsPriceContainers",
        ajaxReqSuperUserConfigs: "./requestsModules/ajaxReqSuperUserConfigs",
    }
});

define(["react", "react-dom", "EditElementsPriceContainers", "ajaxReqSuperUserConfigs"],
function(React, ReactDOM, EditElementsPriceContainers, ajaxReq){

    async function getElementsPrice({serviceOffer}){
        try {
            let query = await ajaxReq.fetchElementsPrice({serviceOffer: serviceOffer});
            return query;
        }catch(err){console.error(err);}
    }

    function renderUpdateButton({status, onClick}){ 
        ReactDOM.render(
            React.createElement(EditElementsPriceContainers.UpdateElementsPriceButton,{
                onClick: () =>{onClick();}
            }),
            document.getElementById("UpdateElementsPriceButtonContainer")
        );
    }

    class EditElementsPrice extends React.Component{
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
            if(prevPrices.elements.hasOwnProperty(idElement)){
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
            ajaxReq.updateElementsPrice({
                serviceOffer: this.props.service,
                elementsPrice: JSON.stringify(this.state.elements),
                hookPrice: this.state.extras.hook
            }).then(response =>{
                if(response === "OK"){
                    EditElementsPriceContainers.SuccessMessage();
                }
            }).catch(err =>{
                console.error(err);
            })
        }

        componentDidMount(){
            //render update button
            renderUpdateButton({
                status: "", 
                onClick: () => {this.updateElementsPrice();}
            });
            //fetch data
            getElementsPrice({serviceOffer:this.props.service}).then(dataJSON =>{
                let obj = JSON.parse(dataJSON);
                if(obj[this.props.service] !== "null" && obj[this.props.service] !== ""){
                    let fetchedElementsPrice = JSON.parse(obj[this.props.service]);
                    let newState = JSON.parse(JSON.stringify(this.state));
                    newState.elements = fetchedElementsPrice;
                    newState.extras.hook = obj.hook;

                    this.setState(newState);
                }
            });
        }

        render(){
            console.log(this.state);
            return Object.keys(this.state.elements).map(element =>{  
                return React.createElement(EditElementsPriceContainers.EditBox,{
                    key: `EditElementsPrice4${element}`,
                    idElement: element,
                    price: this.state.elements[element],
                    onChangePrice: (idElement, newPrice) =>{this.changePriceHandler(idElement, newPrice);}
                })
            });
        }

    };

    return EditElementsPrice;
});