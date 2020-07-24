// main.js
require.config({
    // module name mapped to CDN url
    paths: {
        // Require.js appends `.js` extension for you
        'react': 'https://unpkg.com/react@16/umd/react.production.min',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.production.min',
        jquery: [
            "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
            "../Tallao/js/lib/jquery"]
    }
});

// load the modules defined above
require(['react', 'react-dom', "jquery"], function(React, ReactDOM, $) {
    // now you can render your React elements

    $(document).ready(function(e){

        class Hola extends React.Component{
            construtor(props){
            }
            render(){
                return(
                    React.createElement("h1", 
                        {
                            id: "uep",

                        }
                    , "Hola")
                );
            }
        }
        
        ReactDOM.render(
            React.createElement(Hola, {name:"miNomb"}, this),
            document.getElementById("root")
        );
    });
    
});