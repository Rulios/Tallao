"use strict";
// main.js

const React = require("react");
const {getStaticText} = require("../../../translation/frontend/translator");


class ServiceSelector extends React.Component{
    constructor(props){ 
        //props: getServiceSeleted (will return the value everytime it changes)
        super(props);

        const DEFAULT_SERVICE = this.props.services[0];

        this.state = {
            selected: DEFAULT_SERVICE
        };
    }

    selectorHandler(value){
        this.setState({
            selected: value
        });
    }

    returnServiceSelected(newServiceSelected){
        //activates the function passed as a prop to the component
        //to return the value needed
        this.props.getServiceSelected(newServiceSelected);
    }

    componentDidMount(){
        //return the default one on mount
        this.returnServiceSelected(this.state.selected);
    }

    shouldComponentUpdate(nextProps, nextState){

        if(this.state.selected !== nextState.selected){
            this.returnServiceSelected(nextState.selected);
        }
        return true;
    }

    render(){
        return(
            React.createElement("select", {
                className: "styleSelectServiceType",
                value: this.state.selected,
                onChange: (e) => {
                    this.selectorHandler(e.target.value);
                }
            },
                this.props.services.map(service =>{
                    return React.createElement("option",{
                        key: service,
                        value: service
                    }, getStaticText(service))
                })
            )
        );
    }
}

module.exports =  ServiceSelector;       