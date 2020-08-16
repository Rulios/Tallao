/* // main.js
require.config({
    // module name mapped to CDN url
    paths: {
        // Require.js appends `.js` extension for you
        'react': 'https://unpkg.com/react@16/umd/react.production.min',
        'react-dom': 'https://unpkg.com/react-dom@16/umd/react-dom.production.min'

    }
});

// load the modules defined above
require(['react', 'react-dom'], function(React, ReactDOM ) {
    // now you can render your React elements
    class Box extends React.Component{
        constructor(props){
            super(props);
            console.log(this.props);
        }
        render(){
            return(
                React.createElement("input",{
                    type:"text",
                    onInput: () =>{this.props.onInput()}
                })
            );
        }
    }

    ////////////Start to implement functions events

    class Main extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                boxText : ""
            };
            
        }

        onChangeText (event){
            console.log(this.state.boxText);
            //this.setState({ boxText: event.target.value});
        }

        render(){
            return(
                React.createElement(Box, {
                    onInput: () => { this.onChangeText(event)}
                })
            );
        }
    }

    ReactDOM.render(
        React.createElement(Main),
        document.getElementById("root")
    )
    
}); */

