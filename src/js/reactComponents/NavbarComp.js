"use strict";

const React = require("react");
const {getStaticText} = require("../../../translation/frontend/translator");

const LinksComponent = {
    WriteOrders: WriteOrders,
    AffiliatedOrders: AffiliatedOrders,
    MyMain:MyMain,
    MyOrders: MyOrders,
    MyAccount: MyAccount,
    Logout: Logout,
};

function Logo(){

    return (
        <a href="/"> 
            <img  className="navbar-logo-image"  src="/imgs/tallao-logo-complete-es.svg" alt="Talla'o"></img>
        </a>
    );

}

function ToggleButton(){
    return (
        <a href="#" className="toggle-button">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </a>
    );
}

function NavbarLinks({links, onClick}){
    return (
        <div className="navbar-links">
            <ul>
                {
                    links.map(link =>{
                        const LinkComponent = LinksComponent[link];
                        return <LinkComponent key={`NavbarLink4${link}`} onClick={(componentID)=> onClick(componentID)}></LinkComponent>;
                    })
                }
            </ul>
        </div>
    );
}

function WriteOrders(){
    return (
        React.createElement(NavbarTagFormat,{
            id: "MasterPanelTag",
            href: "/laundry/panel",
            className: "bottomLineLinkAnimation navBarText blackTxt",
            iconClass: "fa fa-pencil-square-o",
            text: getStaticText("writeOrders")
        })
    );
}

function AffiliatedOrders(){
    return (
        React.createElement(NavbarTagFormat,{
            id: "AffiliatedOrders",
            href: "/laundry/myorders",
            className: "bottomLineLinkAnimation navBarText blackTxt",
            iconClass: "fa fa-th-list",
            text: getStaticText("affiliatedOrders")
        })
    );
}

function MyMain(){
    return (
        React.createElement(NavbarTagFormat,{
            id: "MyOrders",
            href: "/user/panel",
            className: "bottomLineLinkAnimation navBarText blackTxt",
            iconClass: "fa fa-home",
            text: getStaticText("main")
        })
    );
}

function MyOrders(){
    return (
        React.createElement(NavbarTagFormat,{
            id: "MyOrders",
            href: "/user/myorders",
            className: "bottomLineLinkAnimation navBarText blackTxt",
            iconClass: "fa fa-th-list",
            text: getStaticText("myOrders")
        })
    );
}

function MyAccount(){
    return (
        React.createElement(NavbarTagFormat,{
            id: "MyAccount",
            href: "myaccount",
            className: "bottomLineLinkAnimation navBarText blackTxt",
            iconClass: "fa fa-user-circle",
            text: getStaticText("myAccount")
        })
    );
}

function Logout({onClick}){
    return (
        React.createElement(NavbarTagFormat,{
            id: "CloseSession",
            href: "#",
            className: "bottomLineLinkAnimation navBarText redTxt",
            iconClass: "fa fa-sign-out",
            text: getStaticText("closeSession"),
            onClick: (e) => onClick("CloseSession")
            
        })
    );
}

function LanguageSelect({selectedLanguage, onSelect, languages}){
    return (
        <div className="centerOnXs">
            <label htmlFor="language-selector" className="bold">{`${getStaticText("language")} :`}</label>
            <select id="language-selector" value={selectedLanguage} onChange={({target:{value}}) => onSelect("LanguageSelect", value)}>
                {
                    languages.map(language =>{
                        return (
                            <option key={`LanguageSelect4${language}`} value={language}>
                                {getStaticText(language)}
                            </option>
                        );
                    })
                }
            </select>
        </div>
    );
}


function NavbarTagFormat({id, href, className, iconClass, text, onClick}){
    return (
        React.createElement("a", {
            href: href,
            className: className,
            onClick: () => onClick()
        },
            [
                React.createElement("i", {
                    key: `Icon4${id}`,
                    className: `${iconClass} small-rightMargin`,
                    "aria-hidden": "true"
                }),
                React.createElement("span", {
                    key: `TagText4${id}`,
                    className:"bold"
                }, text)
            ]
        )
    );
}

module.exports =  {
    Logo: Logo,
    ToggleButton: ToggleButton,
    NavbarLinks: NavbarLinks,
    LanguageSelect: LanguageSelect
};
