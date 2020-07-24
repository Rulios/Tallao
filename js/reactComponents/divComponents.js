// main.js
require.config({
    // module name mapped to CDN url
    paths: {
        // Require.js appends `.js` extension for you
        'react': 'https://unpkg.com/react@16/umd/react.production.min',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.production.min'
        /* jquery: [
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
            "../Tallao/js/lib/jquery"] */
    }
});

// load the modules defined above
require(['react', 'react-dom'], function(React, ReactDOM) {

    function DivCRow (props){
        //div class= "row"
        return(
            React.createElement("div", {
                class:"row" + this.props.class,
                id: this.props.id
            })
        );
        
    }

    function DivCRowSmallSep (props){
        //div class= "row smallSeparation"
        return(
            React.createElement("div", {
                class:"row smallSeparation " + this.props.class,
                id: this.props.id
            })
        );
    }

    function DivCColLg2 (props){
        //div class="col-lg-2"
        return(
            React.createElement("div", {
                class:"col-lg-2 " + this.props.class,
                id: this.props.id
            })
        );
    }

    function DivCColLg3 (props){
        //div class="col-lg-3"
        return(
            React.createElement("div", {
                class:"col-lg-3 " + this.props.class,
                id: this.props.id
            })
        );
    }

    function DivCColLg4 (props){
        //div class="col-lg-4"
        return(
            React.createElement("div", {
                class:"col-lg-4 " + this.props.class,
                id: this.props.id
            })
        );
    }

    function DivCColLg8 (props){
        //div class="col-lg-8"
        return(
            React.createElement("div", {
                class:"col-lg-8 " + this.props.class,
                id: this.props.id
            })
        );
        
    }

    function DivCColLg9 (props){
        //div class="col-lg-9"
        return(
            React.createElement("div", {
                class:"col-lg-9 " + this.props.class,
                id: this.props.id
            })
        );
    }

    function DivCColLg10 (props){
        //div class="col-lg-10"
        return(
            React.createElement("div", {
                class:"col-lg-10 " + this.props.class,
                id: this.props.id
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