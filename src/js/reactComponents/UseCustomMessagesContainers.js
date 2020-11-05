"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development'
    }
});
define(["react"], function(React){

    /* This is a middle order component, responsible for translation
    and bundling of low order components */


    const InstantMsgTag = ({id, colorTag, text, onClick}) =>{
        return(
            React.createElement("button", {
                className:"instantMsgTagStyle bottomLineLinkAnimation",
                style: {backgroundColor : colorTag},
                onClick: () => { onClick(id);}
            }, text)
        );
    };

    return{
        InstantMsgTag:InstantMsgTag
    };

});

