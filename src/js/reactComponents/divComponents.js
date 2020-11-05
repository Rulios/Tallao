// main.js
require.config({
    // module name mapped to CDN url
    paths: {
        // Require.js appends `.js` extension for you
        'react': 'https://unpkg.com/react@16/umd/react.development',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.development'
        /* jquery: [
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
            "../Tallao/js/lib/jquery"] */
    }
});

// load the modules defined above
//styles should be a object
define(['react', 'react-dom'], function(React, ReactDOM) {
    function DivCRow (props){
        //div class= "row"
        return(
            React.createElement("div", {
                className:"row" + props.className,
                id: props.id,
                style: props.style
            })
        );
        
    }

    function DivCRowSmallSep (props){
        //div class= "row smallSeparation"
        return(
            React.createElement("div", {
                className:"row smallSeparation " + props.className,
                id: props.id,
                style: props.style
            })
        );
    }

    function DivCColLg2 (props){
        //div class="col-lg-2"
        return(
            React.createElement("div", {
                className:"col-lg-2 " + props.className,
                id: props.id,
                style: props.style
            })
        );
    }

    function DivCColLg3 (props){
        //div class="col-lg-3"
        return(
            React.createElement("div", {
                className:"col-lg-3 " + props.className,
                id: props.id,
                style: props.style
            })
        );
    }

    

    function DivCColLg4 (props){
        //(props.className === undefined) ? "" : props.className
        //div class="col-lg-4"
        return(
            React.createElement("div", {
                className:"col-lg-4 " + props.className,
                id: props.id,
                style: props.style
            })
        );
    }

    function DivCColLg8 (props){
        //div class="col-lg-8"
        return(
            React.createElement("div", {
                className:"col-lg-8 " + props.className,
                id: props.id,
                style: props.style
            })
        );
        
    }

    function DivCColLg9 (props){
        //div class="col-lg-9"
        return(
            React.createElement("div", {
                className:"col-lg-9 " + props.className,
                id: props.id,
                style: props.style
            })
        );
    }

    function DivCColLg10 (props){
        //div class="col-lg-10"
        return(
            React.createElement("div", {
                className:"col-lg-10 " + props.className,
                id: props.id,
                style: props.style
            })
        );
    }
    
    return{
        DivCRow: DivCRow,
        DivCRowSmallSep: DivCRowSmallSep,
        DivCColLg2: DivCColLg2,
        DivCColLg3: DivCColLg3,
        DivCColLg4: DivCColLg4,
        DivCColLg8: DivCColLg8,
        DivCColLg9: DivCColLg9,
        DivCColLg10: DivCColLg10
    }
});