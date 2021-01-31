const React = require("react");
const {useState, useEffect} = React;

const {getStaticText} = require("../../../translation/frontend/translator");

const SHOW_DELAY = 40;
const ANIMATION_DURATION = 1500;

module.exports = function SuccessAnimation({shouldShow, message, onFinish}){

    useEffect(() => {
        if(shouldShow){
            setTimeout(() => {
                setTimeout(() => {
                    onFinish();
                }, ANIMATION_DURATION);

                shouldShow = false;
            }, SHOW_DELAY);
        }

    }, [shouldShow]);

    return (
        <div className={`${shouldShow ? "successBackground" : ""}`}>
            <div className={`successAnimStyleDiv ${!shouldShow ? "hide" : ""} karla_font`}>
                <div className="checkAnim"></div>
                <br/>
                <div className="successMessageAnim titleTxt bold">
                    {getStaticText(message)}
                </div>
            </div>
        </div>

        
        
    );

};